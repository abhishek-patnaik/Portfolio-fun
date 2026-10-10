"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/data/portfolio";
import { buttonClass } from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

/**
 * Contact is deliberately one thing: the email address, with a button to open
 * the visitor's mail app and one to copy the address.
 */
export default function ContactPanel() {
  const [copied, setCopied] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  if (!site.email) return <p className="text-muted">Contact details will be added soon.</p>;
  const email = site.email;

  const copy = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(email);
      ok = true;
    } catch {
      ok = false;
    }
    setCopied(ok ? "copied" : "failed");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied("idle"), 2400);
  };

  return (
    <section aria-labelledby="contact-title" className="mx-auto max-w-2xl py-6 text-center sm:py-10" data-testid="contact-email">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber/12 text-amber">
        <Icon name="mail" size={26} />
      </span>
      <h2 id="contact-title" className="display mt-5 text-2xl font-semibold text-fg sm:text-3xl">
        Email me
      </h2>
      <p className="mt-2 text-muted">The best way to reach me is by email.</p>
      <a
        href={`mailto:${email}`}
        className="mt-6 inline-block max-w-full select-all break-all rounded-xl border border-line bg-white/4 px-5 py-4 font-mono text-lg text-fg transition hover:border-amber/60 sm:text-xl"
      >
        {email}
      </a>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        <a href={`mailto:${email}`} className={buttonClass("primary", "lg")}>
          <Icon name="mail" /> Write an email
        </a>
        <button type="button" onClick={() => void copy()} className={buttonClass("outline", "lg")}>
          <Icon name={copied === "copied" ? "check" : "file"} /> {copied === "copied" ? "Copied" : "Copy address"}
        </button>
      </div>
      <p role="status" aria-live="polite" className="mt-3 min-h-5 text-sm text-muted">
        {copied === "copied" ? "Email address copied to the clipboard." : copied === "failed" ? "Could not copy automatically. Select the address above to copy it." : ""}
      </p>
    </section>
  );
}
