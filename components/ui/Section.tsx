// Small shared primitives matching the design system (eyebrow, shell container).
// They spread extra props so scroll-animation hooks (data-reveal, data-split) can be
// attached directly where they're used.
type ShellProps = React.ComponentPropsWithoutRef<'div'>;

export function Shell({ className = '', children, ...rest }: ShellProps) {
  return (
    <div className={`mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-10 ${className}`} {...rest}>
      {children}
    </div>
  );
}

type EyebrowProps = React.ComponentPropsWithoutRef<'p'> & { light?: boolean };

export function Eyebrow({ children, light = false, ...rest }: EyebrowProps) {
  return (
    <p className="flex items-center gap-3" {...rest}>
      <span aria-hidden="true" className={`h-[3px] w-7 rounded-full ${light ? 'bg-white/70' : 'bg-amber'}`} />
      <span className={`text-[13px] font-bold uppercase tracking-[0.14em] ${light ? 'text-white/85' : 'text-brand'}`}>
        {children}
      </span>
    </p>
  );
}

type H2Props = React.ComponentPropsWithoutRef<'h2'>;

export function H2({ children, className = '', ...rest }: H2Props) {
  return (
    <h2 className={`font-bold leading-[1.08] tracking-[-0.02em] text-ink ${className}`} {...rest}>
      {children}
    </h2>
  );
}
