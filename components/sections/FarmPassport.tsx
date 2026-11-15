import { Check, Leaf, ShieldCheck } from 'lucide-react';
import { Shell, Eyebrow } from '@/components/ui/Section';

const BULLETS = ['Independent farm verification', 'Clear produce provenance'];

export default function FarmPassport() {
  return (
    <section className="bg-[linear-gradient(180deg,#eff7f1_0%,#f7fbf8_55%,#ffffff_100%)] py-12 md:py-[150px]">
      <Shell className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <div data-reveal="fade">
            <Eyebrow>Trusted Sourcing</Eyebrow>
          </div>
          <h2
            data-split
            className="mt-4 text-[36px] font-bold leading-[1.1] tracking-[-0.02em] text-ink sm:text-[38px] md:text-[56px]"
          >
            Know the farm behind
            <br />
            your produce.
          </h2>
          <p data-reveal data-reveal-delay="0.1" className="mt-5 max-w-[510px] text-[16px] leading-relaxed text-muted">
            Every participating farm is connected to a unique Farm Code and verification process, helping buyers source
            with confidence.
          </p>
          <ul data-reveal-group data-reveal-delay="0.2" className="mt-7 space-y-3">
            {BULLETS.map((b) => (
              <li
                key={b}
                data-reveal-item
                className="flex items-center gap-2.5 text-[13px] font-medium text-body md:text-[14px]"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-tint text-brand">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal="scale" data-reveal-delay="0.15">
          <article className="laicos-float-slow mx-auto w-full max-w-[570px] rounded-2xl border border-line bg-paper p-6 shadow-[0_30px_60px_-30px_rgba(10,151,107,0.25)] md:p-8 md:rotate-[1.5deg]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">LAICOS Farm Passport</p>
                <h3 className="mt-2 md:mt-4 text-[20px] font-bold tracking-tight text-ink md:text-[26px]">Verified Farm</h3>
              </div>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white md:h-12 md:w-12">
                <Check className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
              </span>
            </div>
            <div className="mt-5 md:mt-8 rounded-xl bg-gradient-to-b from-[#1aa47a] to-[#0d9268] p-4 text-white">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/75">Farm Code</p>
              <p className="mt-1 text-[26px] font-bold tracking-[0.06em] md:text-[28px]">LF-00123</p>
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-4">
              <div>
                <dt className="text-[11px] uppercase tracking-[0.08em] text-muted">Location</dt>
                <dd className="mt-1 text-[14px] font-semibold text-ink">Gwagwalada, Abuja</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.08em] text-muted">Primary Produce</dt>
                <dd className="mt-1 text-[14px] font-semibold text-ink">Maize</dd>
              </div>
            </dl>
            <div className="mt-4">
              <dt className="text-[11px] uppercase tracking-[0.08em] text-muted">Status</dt>
              <dd className="mt-1 flex items-center gap-1.5 text-[14px] font-semibold text-brand">
                <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
                Verified
              </dd>
            </div>
            <p className="mt-6 border-t border-line pt-4 text-[12px] text-muted">
              <Leaf className="mr-1.5 inline h-3.5 w-3.5 text-brand/60" aria-hidden="true" />
              Personal farmer information remains private.
            </p>
          </article>
        </div>
      </Shell>
    </section>
  );
}
