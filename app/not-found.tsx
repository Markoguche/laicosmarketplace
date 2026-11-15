import { Shell } from '@/components/ui/Section';

export default function NotFound() {
  return (
    <main id="main" className="bg-paper">
      <Shell className="flex min-h-[70vh] flex-col justify-center py-24 text-center">
        <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-brand">404 — Page not found</p>
        <h1 className="mt-4 text-[40px] font-bold tracking-[-0.02em] text-ink md:text-[56px]">
          This page has moved on.
        </h1>
        <p className="mx-auto mt-5 max-w-[460px] text-[15px] leading-relaxed text-muted">
          The page you are looking for doesn&rsquo;t exist or may have been renamed. Head back to the marketplace to keep
          sourcing.
        </p>
        <a
          href="/"
          className="mx-auto mt-9 inline-flex h-12 items-center rounded-full bg-gradient-to-b from-[#2aa67d] to-[#14996d] px-8 text-[15px] font-semibold text-white transition-transform hover:scale-[1.02]"
        >
          Back to LAICOS
        </a>
      </Shell>
    </main>
  );
}
