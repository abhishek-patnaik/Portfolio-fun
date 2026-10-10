import type { ReactNode } from "react";

export function Chip({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "accent" }) {
  const cls = tone === "accent" ? "border-sky/35 bg-sky/10 text-sky" : "border-line bg-white/4 text-muted";
  return <span className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-xs ${cls}`}>{children}</span>;
}

interface FilterProps<T extends string> {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  label: string;
}

/** A single-select row of filter buttons with correct pressed state. */
export function FilterBar<T extends string>({ options, value, onChange, label }: FilterProps<T>) {
  return (
    <div role="group" aria-label={label} className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 py-1">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={option === value}
          onClick={() => onChange(option)}
          className={`display h-9 shrink-0 rounded-lg border px-3 text-xs uppercase tracking-[0.12em] transition ${
            option === value ? "border-sky/60 bg-sky/15 text-fg" : "border-line text-muted hover:border-line-strong hover:text-fg"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export function SearchField({ value, onChange, label, placeholder }: { value: string; onChange: (v: string) => void; label: string; placeholder: string }) {
  return (
    <label className="relative block">
      <span className="sr-only">{label}</span>
      <svg aria-hidden viewBox="0 0 24 24" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dim" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M10.5 4.5a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm4.4 10.4L20 20" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-line bg-white/4 pl-9 pr-3 text-sm text-fg placeholder:text-dim focus:border-sky/60 focus:outline-none"
      />
    </label>
  );
}
