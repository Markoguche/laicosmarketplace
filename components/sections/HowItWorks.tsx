import { Leaf, Search, ShoppingBag, Truck } from 'lucide-react';
import { Shell, Eyebrow } from '@/components/ui/Section';
import { STEPS } from '@/lib/data';

const ICONS = { search: Search, bag: ShoppingBag, truck: Truck };

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-alt py-12 md:py-[100px]">
      <Shell>
        <div className="text-center">
          <div className="flex justify-center" data-reveal="fade">
            <Eyebrow>How It Works</Eyebrow>
          </div>
          <h2
            data-split
            className="mt-6 text-[30px] font-bold leading-[1.1] tracking-[-0.02em] text-ink sm:text-[38px] md:text-[44px]"
          >
            From farm to you.
          </h2>
        </div>
        <ol className="mt-12 grid gap-x-8 gap-y-10 md:mt-14 md:grid-cols-3 md:gap-x-12 lg:mx-6 lg:gap-x-[115px]">
          {STEPS.map((s, i) => {
            const Icon = ICONS[s.icon as keyof typeof ICONS];
            return (
              <li
                key={s.n}
                data-reveal
                data-reveal-delay={String(i * 0.15)}
                className="group relative"
              >
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    data-line
                    className="absolute top-6 hidden w-[60px] border-t border-dotted border-muted md:-left-[43px] md:w-[38px] md:block lg:-left-[102px]"
                  />
                )}
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-bold tracking-[0.1em] text-brand">{s.n}</span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-tint text-brand transition-[scale,rotate,background-color] duration-500 ease-out group-hover:scale-110 group-hover:rotate-6 group-hover:bg-[#dcefe4]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
                <h3 className="mt-8 text-[20px] font-bold tracking-tight text-ink md:text-[22px]">{s.title}</h3>
                <p className="mt-3 max-w-[300px] text-[14px] leading-relaxed text-muted">{s.text}</p>
              </li>
            );
          })}
        </ol>
        <p data-reveal="fade" className="mt-10 flex items-center justify-center gap-2 text-[13px] text-muted md:hidden">
          <Leaf className="h-4 w-4 text-brand" aria-hidden="true" />
          Sourced directly from verified farms.
        </p>
      </Shell>
    </section>
  );
}
