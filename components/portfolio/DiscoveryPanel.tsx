"use client";

import { getDiscovery } from "@/lib/data/landmarks";
import { buttonClass } from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { ExternalLink, SectionLink, usePortfolioNav } from "./nav";

/** Content for the optional discoveries hidden around the city. */
export default function DiscoveryPanel({ itemId, onCinematic }: { itemId?: string; onCinematic?: () => void }) {
  const { close } = usePortfolioNav();
  const discovery = itemId ? getDiscovery(itemId) : undefined;
  if (!discovery) return <p className="text-muted">There is nothing here yet.</p>;
  const terminal = discovery.id === "dev-terminal";
  const action = discovery.action;
  return (
    <div className="space-y-6">
      <div className={terminal ? "rounded-xl border border-mint/30 bg-ink p-5 font-mono text-sm text-mint" : "space-y-3 text-lg leading-relaxed text-muted"}>
        {discovery.body.map((line) => (
          <p key={line.slice(0, 32)} className={terminal ? "leading-relaxed" : ""}>
            {terminal ? <span className="text-dim">$ </span> : null}
            {line}
          </p>
        ))}
      </div>
      {discovery.facts.length > 0 ? (
        <dl className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {discovery.facts.map((f) => (
            <div key={f.label} className="rounded-lg border border-line bg-white/3 p-3">
              <dd className="font-mono text-xl text-fg">{f.value}</dd>
              <dt className="mt-1 text-xs text-muted">{f.label}</dt>
            </div>
          ))}
        </dl>
      ) : null}
      <div className="flex flex-wrap gap-2.5">
        {action?.cinematic ? (
          <button type="button" className={buttonClass("primary")} onClick={onCinematic}>
            <Icon name="camera" /> {action.label}
          </button>
        ) : null}
        {action?.href ? (
          <ExternalLink href={action.href} className={buttonClass("primary")}>
            <Icon name="arrowRight" /> {action.label}
          </ExternalLink>
        ) : null}
        {action?.section ? (
          <SectionLink section={action.section} className={buttonClass("primary")}>
            <Icon name="arrowRight" /> {action.label}
          </SectionLink>
        ) : null}
        {close ? (
          <button type="button" className={buttonClass("outline")} onClick={close}>
            Keep driving
          </button>
        ) : null}
      </div>
    </div>
  );
}
