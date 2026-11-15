import { FOOTER_COLS } from '@/lib/data';
import { Shell } from '@/components/ui/Section';

// Footer logo rebuilt in DOM: crisp at any DPI, transparent on the green footer.
function FooterLogo() {
  return (
    <a href="#top" aria-label="LAICOS Farm home" className="inline-flex flex-col leading-none">
      <span className="relative self-start text-[24px] font-extrabold tracking-[0.08em] text-white">
        LAIC
        <span className="relative">
          O
          <svg viewBox="0 0 24 24" className="absolute -top-3 left-1/2 h-4 w-4 -translate-x-1/2" fill="#9fe8c8" aria-hidden="true">
            <path d="M12 3c-3 2.5-4.5 5.5-3.5 8.5 1-2.5 3-4 5.5-4.5-2 1.5-3.5 3.5-3.5 6.5 2.5-1 5-3.5 5-7 0-1.5-1.5-2.5-3.5-3.5Z" />
          </svg>
        </span>
        S
      </span>
      <span className="mt-1 self-end pr-1 text-[9px] font-bold tracking-[0.42em] text-emerald-100">FARM</span>
    </a>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-[18px] w-[18px]" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden="true">
      <path d="M13.5 21v-7h2.4l.5-3h-2.9V9.1c0-.9.3-1.6 1.7-1.6h1.3V4.8c-.6-.1-1.5-.2-2.4-.2-2.4 0-4 1.4-4 4V11H7.6v3H10v7h3.5Z" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M17.8 3h3l-6.7 7.7L22 21h-6.2l-4.8-6.3L5.4 21h-3l7.2-8.2L2 3h6.3l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.5 4.7H5.7l11 14.5Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[linear-gradient(180deg,#2ca680_0%,#199e74_50%,#059668_100%)] text-white">
      <Shell className="pb-7 pt-20">
        {/* Mobile: full-width brand block, then Marketplace | Company side by side, Support on its own row.
            Desktop (lg): brand block + three link columns, as in the design. */}
        <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-8">
          <div className="col-span-2 lg:col-span-1">
            <FooterLogo />
            <p className="mt-3 max-w-[280px] text-[15px] leading-relaxed text-white/85">
              Connecting farmers, buyers and better opportunities.
            </p>
            <div className="mt-7 flex gap-2.5 md:gap-3">
              {[
                { label: 'Instagram', icon: <InstagramIcon /> },
                { label: 'Facebook', icon: <FacebookIcon /> },
                { label: 'X', icon: <XIcon /> },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#top"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/30 text-white/90 transition-[background-color,translate,scale] duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:bg-white/10 md:h-10 md:w-10"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          {FOOTER_COLS.map((col, i) => (
            <nav
              key={col.heading}
              aria-label={col.heading}
              className={i === FOOTER_COLS.length - 1 ? 'col-span-2 mt-3 lg:col-span-1 lg:mt-0' : undefined}
            >
              <h3 className="text-[15px] font-semibold">{col.heading}</h3>
              <ul className="mt-6 space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#top"
                      className="inline-block text-[15px] text-white/75 transition-[color,translate] duration-300 ease-out hover:translate-x-1.5 hover:text-white"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-white/15 pt-4 text-[13px] text-white/60 md:flex-row md:items-center md:justify-between">
          <p>© 2026 LAICOS. All rights reserved.</p>
          <p>Made for better agricultural trade.</p>
        </div>
      </Shell>
    </footer>
  );
}
