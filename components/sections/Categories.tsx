import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Shell, Eyebrow, H2 } from '@/components/ui/Section';
import { CATEGORIES, type Category } from '@/lib/data';

// Photo tile with the words on the image (name + listing count over the dark scrim).
function CategoryTile({ c, className = '' }: { c: Category; className?: string }) {
  return (
    <a
      href="#produce"
      className={`group relative block overflow-hidden rounded-2xl transition-[translate,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_22px_44px_-26px_rgba(20,28,23,0.4)] ${className}`}
    >
      <Image
        src={c.image}
        alt={`${c.name} category`}
        width={310}
        height={207}
        className="h-full w-full object-cover transition-[scale] duration-700 ease-out group-hover:scale-[1.06]"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,30,23,0.62)_0%,rgba(10,30,23,0.28)_28%,rgba(10,30,23,0)_58%)] transition-opacity duration-500 group-hover:opacity-95"
      />
      <span className="absolute bottom-2 left-3 transition-[translate] duration-500 ease-out group-hover:translate-y-[-2px] md:bottom-4 md:left-5">
        <span className="block text-[13px] font-semibold leading-tight text-white md:text-[17px]">{c.name}</span>
        <span className="mt-0.5 block text-[10px] leading-none text-white/70 md:mt-1.5 md:text-[13px]">
          {c.listings} listings
        </span>
      </span>
    </a>
  );
}

export default function Categories() {
  return (
    <section id="categories" className="bg-alt py-10 md:py-[104px]">
      <Shell>
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div data-reveal="fade">
              <Eyebrow>Shop by Category</Eyebrow>
            </div>
            <H2 data-split className="mt-3 text-[28px] sm:text-[40px] md:mt-4 md:text-[48px]">
              Find what you need
            </H2>
          </div>
          <a
            href="#produce"
            data-reveal="fade"
            data-reveal-delay="0.15"
            className="group inline-flex w-fit items-center gap-2 text-[14px] font-semibold text-brand transition-colors duration-300 hover:text-brand-deep md:text-[15px]"
          >
            View all produce
            <ArrowRight
              className="h-4 w-4 transition-[translate] duration-300 ease-out group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </div>

        {/* Mobile: single-row carousel that auto-scrolls continuously from start to finish */}
        <div data-reveal="fade" className="cat-marquee mt-6 overflow-hidden md:hidden">
          <ul className="cat-marquee-track flex w-max">
            {[...CATEGORIES, ...CATEGORIES].map((c, i) => (
              <li
                key={`${c.name}-${i}`}
                aria-hidden={i >= CATEGORIES.length || undefined}
                inert={i >= CATEGORIES.length || undefined}
                className="w-60 shrink-0 pr-3"
              >
                <CategoryTile c={c} className="h-[160px]" />
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop: 4 × 2 grid, as in the design */}
        <ul className="mt-6 hidden grid-cols-4 gap-[14px] md:mt-[52px] md:grid">
          {CATEGORIES.map((c, i) => (
            <li key={c.name} data-reveal data-reveal-delay={String((i % 4) * 0.1)}>
              <CategoryTile c={c} className="h-[207px]" />
            </li>
          ))}
        </ul>
      </Shell>
    </section>
  );
}
