import { Shell, Eyebrow } from '@/components/ui/Section';

export default function CtaBanner() {
  return (
    <section id="download" className="bg-alt pb-10 md:pb-[52px]">
      <Shell>
        <div
          data-reveal="scale"
          className="laicos-pan flex flex-col gap-7 rounded-3xl bg-[linear-gradient(120deg,#1ba47a_0%,#0d9a6d_60%,#0b8f64_100%)] px-6 py-10 md:flex-row md:items-center md:justify-between md:px-14 md:py-16"
        >
          <div>
            <Eyebrow light data-reveal="fade">
              LAICOS Marketplace
            </Eyebrow>
            <h2
              data-reveal="fade"
              data-reveal-delay="0.1"
              className="mt-4 text-[34px] font-bold leading-[1.08] tracking-[-0.02em] text-white sm:text-[42px] md:text-[48px]"
            >
              Ready to source better?
            </h2>
            <p data-reveal="fade" data-reveal-delay="0.2" className="mt-4 max-w-[440px] text-[15px] text-white/85 md:text-[16px]">
              Discover verified agricultural produce through the LAICOS marketplace.
            </p>
          </div>
          <div data-reveal="fade" data-reveal-delay="0.3" className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
            <a
              href="#top"
              className="group hidden h-[52px] items-center justify-center gap-2 rounded-full bg-paper px-8 text-[15px] font-semibold text-ink transition-[scale,box-shadow] duration-300 ease-out hover:scale-[1.03] hover:shadow-[0_14px_30px_-12px_rgba(0,0,0,0.4)] active:scale-[0.96] md:inline-flex"
            >
              Download for Free
              <svg viewBox="0 0 16 16" className="h-4 w-4 transition-[translate] duration-300 ease-out group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M2 8h11M9 3.5 13.5 8 9 12.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#produce"
              className="group inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-paper px-8 text-[15px] font-semibold text-ink transition-[scale,box-shadow] duration-300 ease-out hover:scale-[1.03] hover:shadow-[0_14px_30px_-12px_rgba(0,0,0,0.4)] active:scale-[0.96] md:hidden"
            >
              Shop Produce
              <svg viewBox="0 0 16 16" className="h-4 w-4 transition-[translate] duration-300 ease-out group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M2 8h11M9 3.5 13.5 8 9 12.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#top"
              className="inline-flex h-[52px] items-center justify-center rounded-full border border-white/45 px-8 text-[15px] font-semibold text-white transition-[background-color,scale] duration-300 ease-out hover:bg-white/10 hover:scale-[1.03] active:scale-[0.96] md:hidden"
            >
              Create Account
            </a>
          </div>
        </div>
      </Shell>
    </section>
  );
}
