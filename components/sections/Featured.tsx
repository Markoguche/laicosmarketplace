import Image from 'next/image';
import { Plus } from 'lucide-react';
import { Shell, Eyebrow, H2 } from '@/components/ui/Section';
import { FEATURED } from '@/lib/data';

type FeaturedItem = (typeof FEATURED)[number];

function FeaturedCard({ f }: { f: FeaturedItem }) {
  return (
    <article className="group flex h-full overflow-hidden rounded-2xl border border-line bg-paper transition-[translate,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_22px_44px_-26px_rgba(20,28,23,0.4)]">
      <Image
        src={f.image}
        alt={f.name}
        width={179}
        height={386}
        className="h-[250px] w-[40%] object-cover transition-[scale] duration-700 ease-out group-hover:scale-[1.05] md:h-[386px] md:w-[180px]"
      />
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p className="flex items-center gap-1.5 text-[12px] font-semibold text-brand-light">
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="m3 8.5 3.2 3L13 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Verified Farm
        </p>
        <h3 className="mt-2 text-[20px] font-bold tracking-tight text-ink md:text-[22px]">{f.name}</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-muted md:text-[14px]">{f.description}</p>
        <div className="mt-auto flex items-end justify-between pt-5">
          <div>
            <p className="text-[16px] font-bold tracking-tight text-ink">{f.price}</p>
            <p className="mt-0.5 text-[12px] text-muted">{f.unit}</p>
          </div>
          <button
            type="button"
            aria-label={`Add ${f.name} to cart`}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-b from-[#2aa67d] to-[#14996d] text-white shadow-[0_8px_18px_-8px_rgba(10,151,107,0.55)] transition-[scale,rotate,box-shadow] duration-300 ease-out hover:rotate-90 hover:scale-110 hover:shadow-[0_12px_24px_-8px_rgba(10,151,107,0.7)] active:scale-90"
          >
            <Plus className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Featured() {
  return (
    <section className="bg-alt py-10 md:py-[96px]">
      <Shell>
        <div>
          <div data-reveal="fade">
            <Eyebrow>Featured This Season</Eyebrow>
          </div>
          <H2 data-split className="mt-3 text-[28px] sm:text-[40px] md:mt-4 md:text-[48px]">
            Popular right now
          </H2>
        </div>

        {/* Phone + tablet: slow, continuous auto-scroll — no manual scrollbar.
            Duplicated list makes the -50% translate loop seamless. */}
        <div data-reveal="fade" className="feat-marquee mt-6 overflow-hidden py-2 md:mt-12 lg:hidden">
          <ul className="feat-marquee-track flex w-max">
            {[...FEATURED, ...FEATURED].map((f, i) => (
              <li
                key={`${f.name}-${i}`}
                aria-hidden={i >= FEATURED.length || undefined}
                inert={i >= FEATURED.length || undefined}
                className="w-[82vw] max-w-[430px] shrink-0 pr-4 sm:w-[430px]"
              >
                <FeaturedCard f={f} />
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop: 3-column grid as in the design */}
        <ul className="mt-6 hidden gap-4 md:mt-12 lg:grid lg:grid-cols-3">
          {FEATURED.map((f, i) => (
            <li key={f.name} data-reveal data-reveal-delay={String(i * 0.12)}>
              <FeaturedCard f={f} />
            </li>
          ))}
        </ul>
      </Shell>
    </section>
  );
}
