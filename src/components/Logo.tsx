import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 font-display font-bold text-lg ${className}`}>
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-background text-xs font-black">
        R
      </span>
      <span>RiskyDigitals</span>
    </Link>
  );
}
