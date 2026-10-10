import type { ContentStatus } from "@/types/portfolio";
import { site } from "@/lib/data/portfolio";

const LABEL: Record<ContentStatus, string> = {
  verified: "",
  draft: "Draft",
  placeholder: "Placeholder",
};

const TITLE: Record<ContentStatus, string> = {
  verified: "",
  draft: "Imported from the résumé draft. Details are awaiting final review.",
  placeholder: "Sample content. Replace it in lib/data before publishing.",
};

/** Marks content that has not been verified, so nothing sample reads as fact. */
export default function StatusBadge({ status, className = "" }: { status: ContentStatus; className?: string }) {
  if (status === "verified" || !site.showStatusBadges) return null;
  const tone = status === "placeholder" ? "border-amber/40 text-amber" : "border-line-strong text-muted";
  return (
    <span
      title={TITLE[status]}
      className={`display inline-flex h-5 shrink-0 items-center rounded-md border px-1.5 text-[0.625rem] uppercase tracking-[0.16em] ${tone} ${className}`}
    >
      {LABEL[status]}
      <span className="sr-only">: {TITLE[status]}</span>
    </span>
  );
}
