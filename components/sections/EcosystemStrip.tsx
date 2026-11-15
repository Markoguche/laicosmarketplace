import { Shell, Eyebrow } from '@/components/ui/Section';
import { PARTNERS } from '@/lib/data';

export default function EcosystemStrip() {
  return (
    <section className="bg-paper py-5 md:py-9">
      <Shell data-reveal="" className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <Eyebrow>Trusted Ecosystem</Eyebrow>
          <p className="mt-2 text-[16px] font-semibold text-ink md:text-[19px]">
            Connected across the agricultural value chain.
          </p>
        </div>
        <ul data-reveal-group data-reveal-delay="0.1" className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end md:gap-x-12">
          {PARTNERS.map((p) => (
            <li
              key={p}
              data-reveal-item
              className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted/80 transition-colors duration-300 hover:text-brand md:text-[13px]"
            >
              {p}
            </li>
          ))}
        </ul>
      </Shell>
    </section>
  );
}
