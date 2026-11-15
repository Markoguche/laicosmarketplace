// Debug: verify frame edges + dump sample regions as images for visual check
import sharp from 'sharp';
import path from 'node:path';

const DESIGN = path.join(process.cwd(), 'design');
const OUT = path.join(process.cwd(), 'public', 'images');
const file = 'desktop-01-hero-categories.png';
const { data, info } = await sharp(path.join(DESIGN, file)).raw().toBuffer({ resolveWithObject: true });
const img = { data, w: info.width, h: info.height, ch: info.channels };
const px = (x, y) => {
  const i = (y * img.w + x) * img.ch;
  return [img.data[i], img.data[i + 1], img.data[i + 2]];
};
const isWhite = (p) => Math.max(Math.abs(p[0]-255), Math.abs(p[1]-255), Math.abs(p[2]-255)) < 24;

// frame edges via multiple rows
for (const rowY of [300, 700, 1000, 1400, 1700, 2000]) {
  let left = -1, right = -1;
  for (let x = 0; x < img.w - 80; x++) {
    if (isWhite(px(x, rowY)) && isWhite(px(x + 40, rowY)) && isWhite(px(x + 80, rowY))) { left = x; break; }
  }
  for (let x = img.w - 1; x > 80; x--) {
    if (isWhite(px(x, rowY)) && isWhite(px(x - 40, rowY)) && isWhite(px(x - 80, rowY))) { right = x; break; }
  }
  console.log(`row ${rowY}: left=${left} right=${right}`);
}
// column scan for top
for (const colX of [500, 900, 1300, 1700]) {
  let top = -1;
  for (let y = 0; y < 400; y++) {
    if (isWhite(px(colX, y)) && isWhite(px(colX, y + 10)) && isWhite(px(colX, y + 20))) { top = y; break; }
  }
  console.log(`col ${colX}: top=${top}`);
}
// dump regions for visual check (design coords assumed left=443, top=73)
const dump = async (name, x0, y0, x1, y1) => {
  await sharp(path.join(DESIGN, file))
    .extract({ left: x0 + 443, top: y0 + 73, width: x1 - x0, height: y1 - y0 })
    .png().toFile(path.join(OUT, `debug-${name}.png`));
  console.log(`dumped debug-${name}.png`);
};
await dump('h1-region', 80, 150, 760, 330);
await dump('cta-region', 70, 420, 400, 520);
await dump('eyebrow-region', 70, 110, 500, 150);
await dump('body-region', 70, 330, 760, 400);
