import Image from 'next/image';
import { Check, ShieldCheck } from 'lucide-react';
import { Shell, Eyebrow } from '@/components/ui/Section';
import { HERO_CHECKS } from '@/lib/data';

// Glass "Verified supply" card overlaid on the hero photo (matches the design).
// The float animation lives on the badge itself — a transformed wrapper would
// become the containing block and break its absolute placement.
function VerifiedBadge({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`laicos-float absolute flex items-center gap-3 rounded-2xl border border-white/15 bg-[linear-gradient(120deg,rgba(29,61,49,0.82),rgba(18,46,37,0.82))] shadow-[0_18px_40px_-18px_rgba(0,0,0,0.5)] backdrop-blur-md ${
        compact ? 'left-4 bottom-4 py-2.5 pl-2.5 pr-4' : 'left-7 bottom-10 py-3 pl-3 pr-5'
      }`}
    >
      <span
        className={`flex shrink-0 items-center justify-center rounded-lg bg-white text-brand ${compact ? 'h-9 w-9' : 'h-10 w-10'}`}
      >
        <ShieldCheck className={compact ? 'h-4.5 w-4.5' : 'h-5 w-5'} aria-hidden="true" />
      </span>
      <span>
        <span className={`block font-semibold text-white ${compact ? 'text-[13px]' : 'text-[15px]'}`}>Verified supply</span>
        <span className={`block text-white/70 ${compact ? 'text-[11px]' : 'text-[12px] mt-0.5'}`}>
          Know the farm behind every order
        </span>
      </span>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#f4fcf4]">
      {/* farm photo, right-anchored, bleeding to the viewport edge (design slot 773x659 at x669,y132) */}
      <div className="absolute right-0 top-[42px] hidden w-[53.6%] max-w-[773px] lg:block">
        <div className="relative aspect-[773/659] w-full">
          {/* gentle scrubbed parallax; the slight scale keeps the image edge-bleed clean */}
          <Image
            src="/images/hero-farm.jpg"
            alt="Terraced farm fields"
            fill
            priority
            sizes="(max-width: 1440px) 54vw, 773px"
            data-parallax="5"
            className="scale-[1.08] rounded-l-3xl object-cover object-[50%_35%]"
          />
          <VerifiedBadge />
        </div>
      </div>
      <Shell className="relative">
        <div className="flex max-w-[620px] flex-col pb-10 pt-6 md:pt-16 lg:pb-[150px] lg:pt-[188px]">
          <div data-reveal="fade">
            <Eyebrow compact>LAICOS Agricultural Marketplace</Eyebrow>
          </div>
          <h1
            className="mt-6 text-[40px] font-bold leading-[1.06] tracking-[-0.03em] text-ink sm:text-[54px] md:text-[68px]"
          >
            <span className="block" data-split>
              Fresh Produce.
            </span>
            <span className="block text-[#009163]" data-split>
              Trusted Farms.
            </span>
          </h1>
          <p
            data-reveal
            data-reveal-delay="0.15"
            className="mt-5 max-w-[600px] text-[16px] leading-[1.6] text-body md:mt-7 md:text-[18px] md:leading-[1.65]"
          >
            Discover quality agricultural produce from verified farms and source what you need through one trusted
            marketplace.
          </p>
          <div data-reveal data-reveal-delay="0.3" className="mt-6 md:mt-9">
            <a
              href="#download"
              className="group inline-flex h-[50px] w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#2aa67d] to-[#14996d] px-8 text-[15px] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(10,151,107,0.55)] transition-[scale,box-shadow] duration-300 ease-out hover:scale-[1.03] hover:shadow-[0_14px_30px_-10px_rgba(10,151,107,0.65)] active:scale-[0.97] sm:w-auto"
            >
              Download for Free
              <svg viewBox="0 0 16 16" className="h-4 w-4 transition-[translate] duration-300 ease-out group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M2 8h11M9 3.5 13.5 8 9 12.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
          <ul
            data-reveal-group
            data-reveal-delay="0.45"
            className="mt-6 flex flex-nowrap items-center gap-x-3 md:mt-9 md:gap-x-6"
          >
            {HERO_CHECKS.map((c) => (
              <li
                key={c}
                data-reveal-item
                className="flex items-center gap-1 whitespace-nowrap text-[11px] leading-none text-muted md:gap-1.5 md:text-[14px]"
              >
                <Check className="h-3.5 w-3.5 shrink-0 text-brand-light md:h-4 md:w-4" strokeWidth={2.4} aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
        </div>
        {/* photo stacks under the checks below the desktop breakpoint (design mobile slot 358x516, 390 frame) */}
        <div className="pb-10 lg:hidden">
          <div className="relative aspect-[358/516] w-full" data-reveal="scale" data-reveal-delay="0.2">
            <Image
              src="/images/hero-farm.jpg"
              alt="Terraced farm fields"
              fill
              priority
              sizes="100vw"
              className="rounded-2xl object-cover object-[50%_35%]"
            />
            <VerifiedBadge compact />
          </div>
        </div>
      </Shell>
    </section>
  );
}
