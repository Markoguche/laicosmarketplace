import Image from 'next/image';
import { Check, ChevronDown, Minus, Plus, Search } from 'lucide-react';
import { Shell, Eyebrow, H2 } from '@/components/ui/Section';
import AddToCartButton from '@/components/ui/AddToCartButton';
import DownloadModal from '@/components/ui/DownloadModal';
import { PRODUCTS, type Product } from '@/lib/data';

const FILTERS = ['Category', 'Location', 'Availability', 'Price', 'Recommended'];

function StatusTag({ status }: { status: Product['status'] }) {
  if (status === 'available') return <span className="text-[13px] font-semibold text-brand-light">Available</span>;
  if (status === 'limited') return <span className="text-[13px] font-semibold text-amber">Limited</span>;
  return <span className="text-[13px] font-semibold text-danger">Out of stock</span>;
}

function Action({ p }: { p: Product }) {
  if (p.status === 'out') {
    return (
      <button
        type="button"
        disabled
        className="flex h-11 w-full items-center justify-center rounded-full bg-[#eef1ef] text-[14px] font-semibold text-muted/70"
      >
        Out of Stock
      </button>
    );
  }
  if (p.qty !== undefined) {
    return (
      <div className="flex h-10 w-full items-center justify-between rounded-full bg-tint px-4 md:h-11">
        <button
          type="button"
          aria-label={`Reduce ${p.name} quantity`}
          className="rounded-full p-1.5 text-brand transition-[scale,background-color] duration-300 ease-out hover:bg-white/70 active:scale-75"
        >
          <Minus className="h-4 w-4" aria-hidden="true" />
        </button>
        <span className="text-[14px] font-semibold text-ink md:text-[15px]">{p.qty}</span>
        <button
          type="button"
          aria-label={`Increase ${p.name} quantity`}
          className="rounded-full p-1.5 text-brand transition-[scale,background-color] duration-300 ease-out hover:bg-white/70 active:scale-75"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    );
  }
  return <AddToCartButton />;
}

export default function Products() {
  return (
    <section id="produce" className="bg-paper py-10 md:py-[96px]">
      <Shell>
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div data-reveal="fade">
              <Eyebrow>Available Produce</Eyebrow>
            </div>
            <H2 data-split className="mt-3 text-[28px] sm:text-[40px] md:mt-4 md:text-[48px]">
              Explore fresh produce
            </H2>
            <p data-reveal data-reveal-delay="0.1" className="mt-2 max-w-[520px] text-[14px] leading-relaxed text-muted md:mt-3 md:text-[15px]">
              Browse produce from registered and verified farms across the LAICOS marketplace.
            </p>
          </div>
          <span
            data-reveal="fade"
            data-reveal-delay="0.2"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-tint px-4 py-2 text-[13px] font-semibold text-brand"
          >
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand" />
            8 live listings
          </span>
        </div>

        <div data-reveal data-reveal-delay="0.1" className="mt-6 md:mt-10">
          <label className="relative block">
            <span className="sr-only">Search for produce</span>
            <Search className="pointer-events-none absolute left-5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search for produce..."
              className="h-11 w-full rounded-xl border border-line bg-paper pl-12 pr-4 text-[15px] text-ink outline-none transition-[border-color,box-shadow] duration-500 placeholder:text-muted focus:border-brand focus:shadow-[0_0_0_4px_rgba(10,151,107,0.12)] md:h-12"
            />
          </label>
          <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                className="group flex h-10 items-center justify-between rounded-xl border border-line bg-paper px-4 text-[13px] text-muted transition-[border-color,color,translate] duration-400 ease-out hover:-translate-y-0.5 hover:border-brand/40 hover:text-brand md:h-11 md:text-[14px]"
              >
                {f}
                <ChevronDown className="h-4 w-4 text-muted transition-[rotate] duration-300 ease-out group-hover:rotate-180" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-6 grid grid-cols-2 gap-3 md:mt-12 md:gap-4 lg:grid-cols-4">
          {PRODUCTS.map((p, i) => (
            <li key={p.name} data-reveal data-reveal-delay={String((i % 4) * 0.1)}>
              <article className="group overflow-hidden rounded-2xl border border-line bg-paper transition-[translate,border-color,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-[0_24px_48px_-28px_rgba(20,28,23,0.35)]">
                <div className="relative overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={308}
                    height={270}
                    className="h-[150px] w-full object-cover transition-[scale] duration-700 ease-out group-hover:scale-[1.06] sm:h-[210px] md:h-[270px]"
                  />
                  {/* badge on the image, exactly as in the design */}
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white py-1.5 pl-2.5 pr-3 text-[11px] font-semibold text-brand-light shadow-[0_2px_8px_rgba(20,60,45,0.14)] md:left-4 md:top-4 md:text-[12px]">
                    <Check className="h-3 w-3 md:h-3.5 md:w-3.5" strokeWidth={2.6} aria-hidden="true" />
                    Verified
                  </span>
                </div>
                <div className="p-3 md:p-4">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h3 className="text-[14px] font-semibold text-ink md:text-[16px]">{p.name}</h3>
                      <p className="mt-0.5 text-[11px] text-muted md:text-[12px]">{p.farm}</p>
                    </div>
                    <span aria-hidden="true" className={`h-2 w-2 rounded-full ${p.status === 'out' ? 'bg-danger' : p.status === 'limited' ? 'bg-amber' : 'bg-brand-light'}`} />
                  </div>
                  <div className="mt-2 flex flex-col items-start gap-1 md:mt-3 md:flex-row md:items-end md:justify-between md:gap-2">
                    <div>
                      <p className="text-[15px] font-bold tracking-tight text-ink md:text-[17px]">{p.price}</p>
                      <p className="mt-0.5 text-[11px] text-muted md:text-[12px]">{p.unit}</p>
                    </div>
                    <StatusTag status={p.status} />
                  </div>
                  <div className="mt-3 md:mt-4">
                    <Action p={p} />
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Shell>
      <DownloadModal />
    </section>
  );
}
