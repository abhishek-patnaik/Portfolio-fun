"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Icon from "./Icon";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface Props {
  title: string;
  /** Small label above the title. */
  kicker?: string;
  accent?: string;
  onClose: () => void;
  children: ReactNode;
  size?: "md" | "lg" | "xl" | "full";
  /** Extra controls rendered next to the close button. */
  actions?: ReactNode;
  testId?: string;
  bodyClassName?: string;
  /** Use the full available height instead of fitting the content. */
  fill?: boolean;
}

const SIZES: Record<NonNullable<Props["size"]>, string> = {
  md: "sm:max-w-lg",
  lg: "sm:max-w-3xl",
  xl: "sm:max-w-5xl",
  full: "sm:max-w-6xl",
};

/**
 * Accessible dialog: labelled, focus is moved inside on open, trapped while
 * open and returned to the control that opened it on close. Full-screen on
 * phones, a centred sheet on larger screens.
 */
export default function Modal({ title, kicker, accent = "#7cc4ff", onClose, children, size = "lg", actions, testId, bodyClassName, fill }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const node = ref.current;
    node?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !node) return;
      const items = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null || el === document.activeElement);
      if (items.length === 0) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === node)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    node?.addEventListener("keydown", onKey);
    return () => {
      node?.removeEventListener("keydown", onKey);
      if (previous && document.contains(previous)) previous.focus({ preventScroll: true });
    };
  }, []);

  return (
    <div className="animate-fade absolute inset-0 z-40 flex items-stretch justify-center sm:items-center sm:p-6" data-testid={testId}>
      <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={`glass-solid selectable animate-rise relative flex max-h-full w-full flex-col overflow-hidden outline-none sm:max-h-[min(88dvh,60rem)] sm:rounded-2xl ${SIZES[size]} ${fill ? "h-full sm:h-[min(88dvh,60rem)]" : ""}`}
      >
        <div className="h-px w-full shrink-0" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} aria-hidden />
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-7">
          <div className="min-w-0">
            {kicker ? (
              <p className="hud-label truncate" style={{ color: accent }}>
                {kicker}
              </p>
            ) : null}
            <h2 className="display mt-0.5 truncate text-xl font-semibold text-fg sm:text-2xl">{title}</h2>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {actions}
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-line text-muted transition hover:bg-white/8 hover:text-fg"
              aria-label="Close"
              data-testid="modal-close"
            >
              <Icon name="close" />
            </button>
          </div>
        </header>
        <div className={`thin-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-7 sm:py-6 ${bodyClassName ?? ""}`}>{children}</div>
      </div>
    </div>
  );
}
