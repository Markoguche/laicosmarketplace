import { Leaf } from 'lucide-react';
import { Shell } from '@/components/ui/Section';

const FARMS = [
  { name: 'Farm LF-0231', tonnes: '4 tonnes' },
  { name: 'Farm LF-0618', tonnes: '7 tonnes' },
  { name: 'Farm LF-1042', tonnes: '5 tonnes' },
];

// Farm chip: white card with mint leaf square; text sizes follow the Figma frame.
// Extra props (data-reveal etc.) are spread onto the root — wrapping these absolutely
// positioned cards in a transformed element would break their placement.
function FarmCard({ name, tonnes, className = '', ...rest }: { name: string; tonnes: string; className?: string } & React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...rest}
      className={`absolute flex w-[160px] items-center gap-2.5 rounded-[14px] bg-white p-[13px] shadow-[0_16px_28px_-16px_rgba(23,60,44,0.35)] lg:w-[162px] lg:p-3 ${className}`}
    >
      <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] bg-[#edf7f2] text-[#059669]">
        <Leaf className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block whitespace-nowrap text-[11px] font-semibold leading-tight text-[#17201b]">{name}</span>
        <span className="mt-[3px] block whitespace-nowrap text-[11px] leading-tight text-[#7d8783] lg:text-[10.5px]">
          {tonnes}
        </span>
      </span>
    </div>
  );
}

function CombinedCard({ className = '', ...rest }: { className?: string } & React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...rest}
      className={`absolute flex items-center gap-3 rounded-[15px] border-2 border-[#059669] bg-white p-[19px] shadow-[0_20px_36px_-18px_rgba(23,60,44,0.4)] lg:p-4 ${className}`}
    >
      <span className="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-[13px] bg-[#064e3b] text-white lg:hidden">
        <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden="true">
          <rect x="5.5" y="8.5" width="13" height="11" rx="3.2" />
          <path d="M9 12.5V7.5a3 3 0 0 1 6 0v5" />
        </svg>
      </span>
      <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#059669] text-white lg:flex">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden="true">
          <rect x="5.5" y="8.5" width="13" height="11" rx="3.2" />
          <path d="M9 12.5V7.5a3 3 0 0 1 6 0v5" />
        </svg>
      </span>
      <span>
        <span className="block whitespace-nowrap text-[10px] font-semibold uppercase leading-none tracking-[0.18em] text-[#7d8783] lg:text-[9px]">
          Combined Order
        </span>
        <span className="mt-[5px] block whitespace-nowrap text-[15px] font-bold leading-none text-[#17201b]">16 tonnes secured</span>
      </span>
    </div>
  );
}

// Dotted connectors, matching the Figma link lines (fine round dots, sage green).
const DOT_D = { stroke: '#8fb3a0', strokeWidth: 1.7, strokeLinecap: 'round', strokeDasharray: '0.1 3.9' } as const;
const DOT_M = { stroke: '#8fb3a0', strokeWidth: 1.5, strokeLinecap: 'round', strokeDasharray: '0.1 4.1' } as const;

export default function Sourcing() {
  return (
    <section className="bg-alt py-8 md:py-[64px]">
      <Shell>
        <div
          className="gap-y-[37px] rounded-[24px] bg-[#eef3ed] px-5 pb-[45px] pt-10 md:rounded-[22px] md:px-[66px] md:py-[66px] lg:grid lg:grid-cols-[51%_49%] lg:items-start lg:gap-y-0"
        >
          <div>
            <p data-reveal="fade" className="flex items-center gap-2.5">
              <span aria-hidden="true" className="h-[3px] w-[22px] rounded-full bg-[#d19a3a]" />
              <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#059669] md:text-[11px]">Need More?</span>
            </p>
            <h2
              data-split
              className="mt-5 text-[40px] font-medium leading-[1.075] tracking-[-0.045em] text-[#17201b] md:text-[50px] md:leading-[1.02]"
            >
              Looking for larger quantities?
            </h2>
            <p data-reveal data-reveal-delay="0.1" className="mt-6 text-[16px] leading-[1.75] text-[#52605a] md:text-[14.5px]">
              Can&rsquo;t find enough of what you need from one farm? Submit a sourcing request and LAICOS can help coordinate
              supply across multiple verified farms.
            </p>
            <div data-reveal data-reveal-delay="0.2" className="mt-8 flex flex-col gap-[15px] sm:flex-row md:mt-[30px]">
              <a
                href="#download"
                className="inline-flex h-[56px] w-full items-center justify-center rounded-full bg-gradient-to-b from-[#2ba680] to-[#06966a] px-[25px] text-[15px] font-semibold text-white transition-[scale,box-shadow] duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_14px_28px_-12px_rgba(10,151,107,0.65)] active:scale-[0.97] md:h-[52px] md:w-auto md:text-[14.5px]"
              >
                Create a Sourcing Request
              </a>
              <a
                href="#how-it-works"
                className="inline-flex h-[56px] w-full items-center justify-center rounded-full bg-white px-[25px] text-[15px] font-semibold text-[#17201b] shadow-[0_2px_0_rgba(23,60,44,0.06)] transition-[scale,background-color] duration-300 ease-out hover:scale-[1.02] hover:bg-[#f2f7f3] active:scale-[0.97] md:h-[52px] md:w-auto md:text-[14.5px]"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* sourcing diagram: farm chips feeding one combined order; dots drift toward the order */}
          <div data-reveal="fade" className="relative mt-[37px] h-[355px] lg:mt-0 lg:h-[314px]" aria-hidden="true">
            {/* mobile connectors */}
            <svg className="laicos-dots absolute inset-0 h-full w-full lg:hidden" viewBox="0 0 338 355" fill="none" preserveAspectRatio="none">
              <path d="M81 68 L104 139" vectorEffect="non-scaling-stroke" {...DOT_M} />
              <path d="M114 205 L157 271" vectorEffect="non-scaling-stroke" {...DOT_M} />
              <path d="M259 126 L216 230" vectorEffect="non-scaling-stroke" {...DOT_M} />
            </svg>
            {/* desktop connectors */}
            <svg className="laicos-dots absolute inset-0 hidden h-full w-full lg:block" viewBox="0 0 614 343" fill="none" preserveAspectRatio="none">
              <path d="M194.5 67 L222.5 134" vectorEffect="non-scaling-stroke" {...DOT_D} />
              <path d="M237.5 204 L278.5 256" vectorEffect="non-scaling-stroke" {...DOT_D} />
              <path d="M469.5 126 L424.5 227" vectorEffect="non-scaling-stroke" {...DOT_D} />
            </svg>
            <FarmCard
              data-reveal="scale"
              name={FARMS[0].name}
              tonnes={FARMS[0].tonnes}
              className="left-0 top-0 lg:left-[6.9%]"
            />
            <FarmCard
              data-reveal="scale"
              data-reveal-delay="0.15"
              name={FARMS[1].name}
              tonnes={FARMS[1].tonnes}
              className="right-0 top-[16.9%] lg:top-[17.5%]"
            />
            <FarmCard
              data-reveal="scale"
              data-reveal-delay="0.3"
              name={FARMS[2].name}
              tonnes={FARMS[2].tonnes}
              className="left-[5%] top-[38.9%] lg:left-[9.9%] lg:top-[40%]"
            />
            <CombinedCard
              data-reveal="scale"
              data-reveal-delay="0.45"
              className="bottom-0 left-[15.4%] md:left-1/2 md:-translate-x-1/2 lg:left-[34.5%] lg:translate-x-0"
            />
          </div>
        </div>
      </Shell>
    </section>
  );
}
