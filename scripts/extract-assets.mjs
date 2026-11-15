// One-off dev tool: crops design photos out of the Figma screen captures in design/
// and samples exact UI colors. Not part of the app bundle.
import sharp from 'sharp';
import path from 'node:path';

const DESIGN = path.join(process.cwd(), 'design');
const OUT = path.join(process.cwd(), 'public', 'images');

const CAPTURES = {
  d01: 'desktop-01-hero-categories.png',
  d02: 'desktop-02-products-featured.png',
  d03: 'desktop-03-farm-howitworks-cart.png',
  d04: 'desktop-04-why-sourcing-cta.png',
  d05: 'desktop-05-footer.png',
};

const imgs = {};
for (const [k, f] of Object.entries(CAPTURES)) {
  const { data, info } = await sharp(path.join(DESIGN, f)).raw().toBuffer({ resolveWithObject: true });
  imgs[k] = { data, w: info.width, h: info.height, ch: info.channels };
}
const px = (img, x, y) => {
  const i = (y * img.w + x) * img.ch;
  return [img.data[i], img.data[i + 1], img.data[i + 2]];
};
const dist = (a, b) => Math.max(Math.abs(a[0] - b[0]), Math.abs(a[1] - b[1]), Math.abs(a[2] - b[2]));
const isBg = (p) => dist(p, [255, 255, 255]) < 40 || dist(p, [246, 248, 246]) < 30;

// Verified frame constants for all desktop captures (view only moved vertically)
const LEFT = 441, RIGHT = 1878, TOP_D01 = 75;

// tops[k] = png y of design y=0 (d01 measured; others via strip matching).
// B row BOFF shows the same content as A row bestQ  =>  tops[b] = BOFF - bestQ + tops[a]
const BOFF = 40, BROWS = 180;
const tops = { d01: TOP_D01 };
for (const [a, b] of [['d01', 'd02'], ['d02', 'd03'], ['d03', 'd04'], ['d04', 'd05']]) {
  const A = imgs[a], B = imgs[b];
  let bestQ = -1, bestD = 1e9;
  for (let q = 150; q < A.h - BROWS - 10; q++) {
    let sum = 0, n = 0;
    for (let dy = 0; dy < BROWS; dy += 3) {
      for (let x = LEFT + 30; x <= RIGHT - 30; x += 5) {
        const pa = px(A, x, q + dy), pb = px(B, x, BOFF + dy);
        sum += Math.abs(pa[0] - pb[0]) + Math.abs(pa[1] - pb[1]) + Math.abs(pa[2] - pb[2]);
        n++;
      }
    }
    const d = sum / n;
    if (d < bestD) { bestD = d; bestQ = q; }
  }
  tops[b] = BOFF - bestQ + tops[a];
  console.log(`${b}: matched A-row ${bestQ} (diff ${bestD.toFixed(1)}) -> top ${tops[b]}`);
}

// Find the dense (image) band inside a design-coord window and return its tight bbox.
function imageBand(img, cap, win, rowThresh = 0.35) {
  const top = tops[cap];
  const x0 = Math.max(0, Math.round(win[0] + LEFT)), x1 = Math.min(img.w - 1, Math.round(win[2] + LEFT));
  const y0 = Math.max(0, Math.round(win[1] + top)), y1 = Math.min(img.h - 1, Math.round(win[3] + top));
  const rowDens = [];
  for (let y = y0; y <= y1; y++) {
    let n = 0;
    for (let x = x0; x <= x1; x += 2) if (!isBg(px(img, x, y))) n++;
    rowDens.push(n / Math.ceil((x1 - x0) / 2));
  }
  // longest contiguous run of dense rows
  let bestS = -1, bestL = 0, s = -1;
  for (let i = 0; i < rowDens.length; i++) {
    if (rowDens[i] >= rowThresh) { if (s < 0) s = i; }
    else { if (s >= 0 && i - s > bestL) { bestL = i - s; bestS = s; } s = -1; }
  }
  if (s >= 0 && rowDens.length - s > bestL) { bestL = rowDens.length - s; bestS = s; }
  if (bestS < 0) return null;
  const ry0 = y0 + bestS, ry1 = y0 + bestS + bestL - 1;
  // column extent within the row band
  let minX = 1e9, maxX = -1;
  for (let x = x0; x <= x1; x++) {
    let n = 0;
    for (let y = ry0; y <= ry1; y += 2) if (!isBg(px(img, x, y))) n++;
    if (n / Math.ceil((ry1 - ry0) / 2) > 0.5) { minX = Math.min(minX, x); maxX = Math.max(maxX, x); }
  }
  if (maxX < 0) return null;
  return { left: minX, top: ry0, width: maxX - minX + 1, height: ry1 - ry0 + 1 };
}

async function crop(cap, win, out, rowThresh) {
  const box = imageBand(imgs[cap], cap, win, rowThresh);
  if (!box) { console.log(`MISS ${out} (${cap}) win=${win}`); return; }
  await sharp(path.join(DESIGN, CAPTURES[cap])).extract(box).jpeg({ quality: 92 }).toFile(path.join(OUT, out));
  console.log(`${out}: png(${box.left},${box.top}) ${box.width}x${box.height} -> design(${box.left - LEFT},${box.top - tops[cap]})`);
}

async function cropFixed(cap, box, out) {
  const b = { left: Math.round(box[0] + LEFT), top: Math.round(box[1] + tops[cap]), width: box[2] - box[0], height: box[3] - box[1] };
  await sharp(path.join(DESIGN, CAPTURES[cap])).extract(b).png().toFile(path.join(OUT, out));
  console.log(`${out}: design(${box[0]},${box[1]}) ${b.width}x${b.height}`);
}

console.log('\n--- crops ---');
// measured tile grid: cols x=[78,403,727,1051] w=310; rows y=[1238,1455] h=207
const COLS = [[74, 396], [399, 720], [723, 1044], [1047, 1362]];
const ROWS = [[1230, 1450], [1448, 1668]];
const catNames = ['grains', 'tubers', 'vegetables', 'fruits', 'legumes', 'livestock', 'aquaculture', 'other'];
for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) {
  await crop('d01', [COLS[c][0], ROWS[r][0], COLS[c][1], ROWS[r][1]], `cat-${catNames[r * 4 + c]}.jpg`);
}
await crop('d01', [660, 125, 1441, 790], 'hero-farm.jpg');
await cropFixed('d01', [76, 18, 178, 64], 'logo-nav.png');
// products: rows ~[1930,2195] & [2410,2680]; generous windows, density finds image
for (let c = 0; c < 4; c++) await crop('d02', [COLS[c][0], 1880, COLS[c][1], 2428], `prod-${['yellow-maize', 'fresh-cassava', 'white-yam', 'paddy-rice'][c]}.jpg`);
for (let c = 0; c < 4; c++) await crop('d02', [COLS[c][0], 2396, COLS[c][1], 2930], `prod-${['brown-beans', 'fresh-tomatoes', 'red-bell-pepper', 'green-plantain'][c]}.jpg`);
// featured: 3 cards, image = left portion
await crop('d02', [70, 3150, 300, 3750], 'feat-yellow-maize.jpg');
await crop('d02', [505, 3150, 740, 3750], 'feat-fresh-cassava.jpg');
await crop('d02', [940, 3150, 1180, 3750], 'feat-white-yam.jpg');
await cropFixed('d05', [76, 7283, 182, 7334], 'logo-footer.png');

// ---- color sampling ----
const R = (cap, x0, y0, x1, y1) => ({
  x0: Math.round(x0 + LEFT), y0: Math.max(0, Math.round(y0 + tops[cap])),
  x1: Math.round(x1 + LEFT), y1: Math.min(imgs[cap].h - 1, Math.round(y1 + tops[cap])),
});
const modeColor = (img, r) => {
  const counts = new Map();
  for (let y = r.y0; y <= r.y1; y++) for (let x = r.x0; x <= r.x1; x++) {
    const p = px(img, x, y);
    const k = `${p[0] >> 3},${p[1] >> 3},${p[2] >> 3}`;
    counts.set(k, (counts.get(k) ?? 0) + 1);
  }
  let best, n = 0;
  for (const [k, c] of counts) if (c > n) { n = c; best = k; }
  const [r2, g2, b2] = best.split(',').map(v => (parseInt(v) << 3) + 4);
  return `#${[r2, g2, b2].map(v => v.toString(16).padStart(2, '0')).join('')}`;
};
const darkest = (img, r, filter) => {
  let best, l = 1e9;
  for (let y = r.y0; y <= r.y1; y++) for (let x = r.x0; x <= r.x1; x++) {
    const p = px(img, x, y);
    if (filter && !filter(p)) continue;
    const lum = 0.299 * p[0] + 0.587 * p[1] + 0.114 * p[2];
    if (lum < l) { l = lum; best = p; }
  }
  return best ? `#${best.map(v => v.toString(16).padStart(2, '0')).join('')}` : 'none';
};
const greenAvg = (img, r) => {
  let r2 = 0, g = 0, b = 0, n = 0;
  for (let y = r.y0; y <= r.y1; y++) for (let x = r.x0; x <= r.x1; x++) {
    const p = px(img, x, y);
    if (p[1] > p[0] + 25 && p[1] > p[2] + 25) { r2 += p[0]; g += p[1]; b += p[2]; n++; }
  }
  if (!n) return 'none';
  return `#${[r2, g, b].map(v => Math.round(v / n).toString(16).padStart(2, '0')).join('')} (n=${n})`;
};

console.log('\n--- colors ---');
console.log('eyebrow dash amber:', darkest(imgs.d01, R('d01', 74, 1110, 102, 1124)));
console.log('eyebrow text green:', darkest(imgs.d01, R('d01', 110, 1105, 260, 1132)));
console.log('h1 black:', darkest(imgs.d01, R('d01', 75, 315, 710, 392)));
console.log('h1 green:', darkest(imgs.d01, R('d01', 75, 392, 710, 460)));
console.log('body gray:', darkest(imgs.d01, R('d01', 75, 485, 745, 552)));
console.log('hero cta green:', modeColor(imgs.d01, R('d01', 110, 580, 270, 618)));
console.log('check green:', darkest(imgs.d01, R('d01', 76, 650, 96, 680), p => p[1] > p[0] + 15));
console.log('strip bg:', modeColor(imgs.d01, R('d01', 600, 920, 700, 1020)));
console.log('nav green:', modeColor(imgs.d01, R('d01', 1235, 12, 1345, 40)));
console.log('atc green (d02):', greenAvg(imgs.d02, R('d02', 400, 2250, 680, 2420)));
console.log('oos red (d02):', darkest(imgs.d02, R('d02', 880, 2740, 1060, 2860), p => p[0] > p[1] + 30 && p[0] > p[2] + 30));
console.log('limited amber (d02):', darkest(imgs.d02, R('d02', 900, 2470, 1070, 2620), p => p[0] > 150 && p[0] > p[2] + 40));
console.log('order summary green:', greenAvg(imgs.d04, R('d04', 950, 5150, 1400, 5800)));
console.log('cta banner green:', greenAvg(imgs.d04, R('d04', 500, 6900, 1000, 7150)));
console.log('footer green:', greenAvg(imgs.d05, R('d05', 200, 7450, 1200, 7800)));

// debug dumps for d02 UI details
await sharp(path.join(DESIGN, CAPTURES.d02)).extract({ left: LEFT + 1100, top: tops.d02 + 1690, width: 320, height: 200 }).png().toFile(path.join(OUT, 'debug-d02-badge.png'));
console.log('\ndebug dumps written');
