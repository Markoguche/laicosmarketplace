'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { NAV_LINKS } from '@/lib/data';
import { Shell } from '@/components/ui/Section';

// Sticky header: glides out of view scrolling down, returns scrolling up, gains a
// soft shadow once the page moves. Mobile gets an animated dropdown menu.
export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 8);
    setHidden(menuOpen ? false : y > prev && y > 160);
  });

  // Lock page scrolling behind the open menu (works with or without Lenis).
  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', menuOpen);
    return () => document.documentElement.classList.remove('menu-open');
  }, [menuOpen]);

  // Close on Escape for keyboard users.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-[translate,background-color,box-shadow] duration-500 ease-out ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      } ${scrolled ? 'bg-paper/95 shadow-[0_14px_36px_-24px_rgba(20,28,23,0.35)] backdrop-blur-md' : 'bg-paper'}`}
    >
      <Shell className="flex h-[60px] items-center justify-between md:h-[90px]">
        <a href="#top" aria-label="LAICOS Farm home" className="shrink-0">
          <Image src="/images/logo-nav.png" alt="LAICOS Farm" width={102} height={46} priority className="h-10 w-auto md:h-[46px]" />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="group relative py-2 text-[15px] font-medium text-body transition-colors duration-300 hover:text-brand"
            >
              {l.label}
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-brand transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#download"
            className="inline-flex h-10 items-center rounded-full bg-gradient-to-b from-[#2aa67d] to-[#14996d] px-5 text-[14px] font-semibold text-white transition-[scale,box-shadow] duration-300 hover:scale-[1.03] hover:shadow-[0_10px_22px_-10px_rgba(10,151,107,0.6)] active:scale-[0.96] md:h-11 md:px-6 md:text-[15px]"
          >
            Download
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors duration-300 hover:border-brand/50 lg:hidden"
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.span
                key={menuOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="flex"
              >
                {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </Shell>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="absolute top-full right-0 left-0 overflow-hidden border-b border-line bg-paper shadow-[0_30px_40px_-24px_rgba(20,28,23,0.25)] lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col px-5 pb-6 pt-2 sm:px-8">
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between border-b border-line/70 py-4 text-[16px] font-medium text-body transition-colors duration-300 last:border-none hover:text-brand"
                >
                  {l.label}
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-amber" />
                </motion.a>
              ))}
              <motion.a
                href="#download"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ delay: 0.1 + NAV_LINKS.length * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setMenuOpen(false)}
                className="mt-5 flex h-12 items-center justify-center rounded-full bg-gradient-to-b from-[#2aa67d] to-[#14996d] text-[15px] font-semibold text-white active:scale-[0.98]"
              >
                Download for Free
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
