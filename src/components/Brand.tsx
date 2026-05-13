export function Crest({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <div className={`${className} relative rounded-md bg-[var(--gradient-primary)] grid place-items-center text-primary-foreground shadow-[var(--shadow-elegant)]`}>
      <span className="font-display text-base font-bold leading-none">L<span className="text-gold">C</span>U</span>
    </div>
  );
}

export function BrandLockup() {
  return (
    <div className="flex items-center gap-3">
      <Crest />
      <div className="leading-tight">
        <div className="font-display text-base font-bold tracking-tight">Lil Champ University</div>
        <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Knowledge · Honour · Service</div>
      </div>
    </div>
  );
}
