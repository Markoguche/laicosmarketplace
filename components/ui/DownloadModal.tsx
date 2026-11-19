'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDownToLine } from 'lucide-react';
import { lenisStore } from '@/components/providers/SmoothScroll';

// Fired by AddToCartButton; the modal host listens so the button stays a tiny island.
const ADD_TO_CART_EVENT = 'laicos:add-to-cart';

export function openDownloadModal() {
  window.dispatchEvent(new CustomEvent(ADD_TO_CART_EVENT));
}

export default function DownloadModal() {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onAdd = () => {
      restoreFocusRef.current = document.activeElement as HTMLElement | null;
      setOpen(true);
    };
    window.addEventListener(ADD_TO_CART_EVENT, onAdd);
    return () => window.removeEventListener(ADD_TO_CART_EVENT, onAdd);
  }, []);

  useEffect(() => {
    if (!open) return;
    // Freeze the page while the modal is up (Lenis + native fallback), like the mobile menu.
    lenisStore.current?.stop();
    document.documentElement.classList.add('modal-open');
    cardRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.classList.remove('modal-open');
      lenisStore.current?.start();
      restoreFocusRef.current?.focus();
      restoreFocusRef.current = null;
    };
  }, [open, close]);

  // Download App → release the scroll lock, then glide to the download banner.
  const onDownloadClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    close();
    document.documentElement.classList.remove('modal-open');
    lenisStore.current?.start();
    if (lenisStore.current) lenisStore.current.scrollTo('#download', { duration: 1.6 });
    else document.getElementById('download')?.scrollIntoView();
  };

  return (
    <div
      aria-hidden={!open}
      onClick={close}
      className={`fixed inset-0 z-[90] flex items-center justify-center bg-ink/50 p-4 transition-[opacity] duration-300 ease-out motion-reduce:transition-none ${
        open ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="download-modal-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          // Single interactive element — keep focus from escaping the dialog.
          if (e.key === 'Tab') e.preventDefault();
        }}
        className={`w-[417px] max-w-full rounded-3xl bg-paper px-6 py-7 text-center shadow-[0_32px_80px_-24px_rgba(20,28,23,0.45)] outline-none transition-[scale,translate,opacity] duration-400 ease-out motion-reduce:transition-none md:px-7 ${
          open ? '' : 'translate-y-4 scale-[0.94] opacity-0'
        }`}
      >
        <div className="mx-auto grid h-[88px] w-[88px] place-items-center rounded-full bg-brand/20">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-b from-[#2aa67d] to-[#14996d]">
            <ArrowDownToLine className="h-7 w-7 text-white" aria-hidden="true" />
          </div>
        </div>
        <h2
          id="download-modal-title"
          className="mt-6 text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-ink md:text-[32px]"
        >
          Download
        </h2>
        <p className="mx-auto mt-3 max-w-[330px] text-[15px] leading-relaxed text-muted md:text-[16px]">
          Download the app on Play-store or App-store to complete or make your order
        </p>
        <a
          href="#download"
          onClick={onDownloadClick}
          tabIndex={open ? 0 : -1}
          className="mx-auto mt-8 flex h-12 w-[266px] max-w-full items-center justify-center rounded-full bg-gradient-to-b from-[#2aa67d] to-[#14996d] text-[15px] font-semibold text-white transition-[scale,box-shadow] duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_10px_22px_-10px_rgba(10,151,107,0.6)] active:scale-[0.96]"
        >
          Download App
        </a>
      </div>
    </div>
  );
}
