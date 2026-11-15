import Image from 'next/image';
import { ArrowRight, Minus, Plus, Trash2 } from 'lucide-react';
import { Shell, Eyebrow } from '@/components/ui/Section';
import { CART_ITEMS } from '@/lib/data';

export default function Cart() {
  return (
    <section className="bg-paper pb-12 md:pb-[110px]">
      <Shell>
        <div className="md:pt-[56px]">
          <div data-reveal="fade">
            <Eyebrow>Your Selection</Eyebrow>
          </div>
          <h2
            data-split
            className="mt-3 text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-ink sm:text-[38px] md:mt-4 md:text-[44px]"
          >
            Your Cart
          </h2>
          <p data-reveal data-reveal-delay="0.1" className="mt-2 text-[14px] text-muted md:mt-3 md:text-[15px]">
            Review your selected produce before checkout.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:mt-12 lg:grid-cols-[1fr_400px] lg:gap-6">
          <div data-reveal="fade" className="rounded-2xl border border-line bg-paper p-4 md:p-6">
            {CART_ITEMS.map((item, i) => (
              <div
                key={item.name}
                className={`group flex flex-col gap-4 py-6 md:flex-row md:items-center md:gap-6 md:py-7 ${i > 0 ? 'border-t border-line' : 'pt-0'}`}
              >
                <div className="flex flex-1 items-center gap-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-xl object-cover"
                  />
                  <div>
                    <h3 className="text-[15px] font-semibold text-ink">{item.name}</h3>
                    <p className="mt-0.5 text-[12px] text-muted">{item.farm}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-[12px] font-medium text-brand-light">
                      <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="m3 8.5 3.2 3L13 5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Verified Farm
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-6 md:justify-end md:gap-10">
                  <div className="hidden md:block">
                    <p className="text-[11px] text-muted">Unit price</p>
                    <p className="mt-1 text-[14px] font-bold text-ink">{item.unitPrice}</p>
                    <p className="text-[11px] text-muted">{item.unit}</p>
                  </div>
                  <div className="flex h-10 w-[110px] items-center justify-between rounded-full bg-tint px-3 md:h-11">
                    <button
                      type="button"
                      aria-label={`Reduce ${item.name} quantity`}
                      className="rounded-full p-1.5 text-brand transition-[scale,background-color] duration-300 ease-out hover:bg-white/70 active:scale-75"
                    >
                      <Minus className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <span className="text-[14px] font-semibold text-ink">{item.qty}</span>
                    <button
                      type="button"
                      aria-label={`Increase ${item.name} quantity`}
                      className="rounded-full p-1.5 text-brand transition-[scale,background-color] duration-300 ease-out hover:bg-white/70 active:scale-75"
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="hidden text-right md:block">
                    <p className="text-[11px] text-muted">Subtotal</p>
                    <p className="mt-1 text-[14px] font-semibold text-ink">Price pending</p>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${item.name} from cart`}
                    className="rounded-full p-2 text-muted transition-[color,rotate,scale] duration-300 ease-out hover:rotate-12 hover:scale-110 hover:text-danger active:scale-90"
                  >
                    <Trash2 className="h-[18px] w-[18px]" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside data-reveal="scale" data-reveal-delay="0.15" className="rounded-2xl bg-gradient-to-b from-[#12a077] to-[#0a9265] p-6 text-white">
            <h3 className="text-[19px] font-semibold">Order summary</h3>
            <dl className="mt-6 space-y-4 text-[14px]">
              <div className="flex items-center justify-between">
                <dt className="text-white/75">Subtotal</dt>
                <dd className="font-semibold">Price pending</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-white/75">Delivery</dt>
                <dd className="font-semibold">Calculated at checkout</dd>
              </div>
            </dl>
            <div className="mt-6 flex items-center justify-between border-t border-white/20 pt-5 text-[14px]">
              <dt className="text-white/85">Total</dt>
              <dd className="font-semibold">Quote required</dd>
            </div>
            <a
              href="#download"
              className="group mt-7 flex h-12 items-center justify-center gap-2 rounded-full bg-paper text-[15px] font-semibold text-ink transition-[scale,box-shadow] duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_14px_28px_-12px_rgba(0,0,0,0.35)] active:scale-[0.97]"
            >
              Proceed to Download App
              <ArrowRight className="h-4 w-4 transition-[translate] duration-300 ease-out group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a
              href="#produce"
              className="mt-3 flex h-12 items-center justify-center rounded-full border border-white/40 text-[15px] font-semibold text-white transition-[background-color,scale] duration-300 ease-out hover:bg-white/10 hover:scale-[1.02] active:scale-[0.97]"
            >
              Continue Shopping
            </a>
            <p className="mt-5 text-center text-[11px] text-white/70">
              Final pricing is confirmed by the supplying farm before payment.
            </p>
          </aside>
        </div>
      </Shell>
    </section>
  );
}
