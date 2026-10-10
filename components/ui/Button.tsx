import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost" | "outline" | "danger";
type Size = "sm" | "md" | "lg";

const VARIANT: Record<Variant, string> = {
  primary: "bg-sky text-ink hover:bg-white font-semibold",
  ghost: "text-muted hover:text-fg hover:bg-white/8",
  outline: "border border-line-strong text-fg hover:bg-white/8",
  danger: "border border-danger/50 text-danger hover:bg-danger/10",
};

const SIZE: Record<Size, string> = {
  sm: "h-9 px-3 text-xs",
  md: "h-11 px-4 text-sm",
  lg: "h-13 px-6 text-sm",
};

export function buttonClass(variant: Variant = "outline", size: Size = "md", extra = ""): string {
  return `display inline-flex shrink-0 items-center justify-center gap-2 rounded-xl uppercase tracking-[0.14em] transition disabled:cursor-not-allowed disabled:opacity-45 ${VARIANT[variant]} ${SIZE[size]} ${extra}`;
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

export default function Button({ variant = "outline", size = "md", className = "", type = "button", children, ...rest }: Props) {
  return (
    <button type={type} className={buttonClass(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
