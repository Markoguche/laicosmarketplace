import { Leaf, ShieldCheck, ShoppingBag, Truck } from 'lucide-react';
import { Shell, Eyebrow, H2 } from '@/components/ui/Section';
import { WHY_CARDS } from '@/lib/data';

const ICONS = { shield: ShieldCheck, leaf: Leaf, bag: ShoppingBag, truck: Truck };

export default function WhyLaicos() {
  return (
    <section id="why-laicos" className="bg-alt pt-10 md:pt-[104px]">
      <Shell>
        <div>
          <div data-reveal="fade">
            <Eyebrow>Why LAICOS</Eyebrow>
          </div>
          <H2 data-split className="mt-3 text-[28px] sm:text-[38px] md:mt-4 md:text-[44px]">
            Built around better sourcing.
          </H2>
        </div>
        <ul className="mt-6 grid gap-3 md:mt-12 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
          {WHY_CARDS.map((c, i) => {
            const Icon = ICONS[c.icon as keyof typeof ICONS];
            return (
              <li key={c.title} data-reveal data-reveal-delay={String(i * 0.12)}>
                <div className="group h-full rounded-2xl border border-line bg-paper p-5 transition-[translate,border-color,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-[0_24px_48px_-28px_rgba(20,28,23,0.35)] md:p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-tint text-brand transition-[scale,rotate] duration-500 ease-out group-hover:scale-110 group-hover:rotate-6 md:h-11 md:w-11">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-[13px] font-bold uppercase tracking-[0.08em] text-ink md:mt-10 md:text-[14px]">{c.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted md:mt-3 md:text-[14px]">{c.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Shell>
    </section>
  );
}
