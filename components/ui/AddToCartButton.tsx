'use client';

import { ShoppingBag } from 'lucide-react';
import { openDownloadModal } from '@/components/ui/DownloadModal';

// The landing page has no checkout of its own — "Add to Cart" funnels into the app download.
export default function AddToCartButton() {
  return (
    <button
      type="button"
      onClick={openDownloadModal}
      className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#2aa67d] to-[#14996d] text-[13px] font-semibold text-white transition-[scale,box-shadow] duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_10px_22px_-10px_rgba(10,151,107,0.6)] active:scale-[0.96] md:h-11 md:text-[14px]"
    >
      <ShoppingBag className="h-4 w-4" aria-hidden="true" />
      Add to Cart
    </button>
  );
}
