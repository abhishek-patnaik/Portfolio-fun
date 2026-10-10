"use client";

import Link from "next/link";
import { createContext, useContext, type MouseEvent, type ReactNode } from "react";
import type { SectionId } from "@/types/portfolio";

export type PortfolioMode = "page" | "panel";
type Go = (section: SectionId, itemId?: string) => void;

interface NavValue {
  mode: PortfolioMode;
  go: Go | null;
  /** Closes the surrounding panel (panel mode only). */
  close: (() => void) | null;
}

const NavContext = createContext<NavValue>({ mode: "page", go: null, close: null });

/**
 * The portfolio sections are shared by two hosts: normal pages, where links
 * navigate by URL, and the in-world panel, where the same links switch the
 * panel's content so the visitor never leaves the city.
 */
export function PortfolioNavProvider({ mode, go, close, children }: { mode: PortfolioMode; go?: Go; close?: () => void; children: ReactNode }) {
  return <NavContext.Provider value={{ mode, go: go ?? null, close: close ?? null }}>{children}</NavContext.Provider>;
}

export function usePortfolioNav(): NavValue {
  return useContext(NavContext);
}

/** Pseudo item id that opens the project list filtered to case studies. */
export const CASE_STUDIES = "case-studies";

export function sectionHref(section: SectionId, itemId?: string): string {
  switch (section) {
    case "home":
      return "/";
    case "projects":
      if (itemId === CASE_STUDIES) return "/case-studies";
      return itemId ? `/projects/${itemId}` : "/projects";
    case "blog":
      return itemId ? `/blog/${itemId}` : "/blog";
    case "discovery":
      return itemId === "garage" ? "/garage" : "/";
    default:
      return itemId ? `/${section}#${itemId}` : `/${section}`;
  }
}

interface LinkProps {
  section: SectionId;
  itemId?: string;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
  "data-testid"?: string;
}

/** A real link that the in-world panel intercepts to stay inside the city. */
export function SectionLink({ section, itemId, className, children, ...rest }: LinkProps) {
  const { mode, go } = usePortfolioNav();
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (mode !== "panel" || !go) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    go(section, itemId);
  };
  return (
    <Link href={sectionHref(section, itemId)} onClick={onClick} className={className} {...rest}>
      {children}
    </Link>
  );
}

/** External links always open in a new tab with safe rel attributes. */
export function ExternalLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  const external = /^https?:\/\//.test(href) || href.startsWith("mailto:");
  if (!external) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} target={href.startsWith("mailto:") ? undefined : "_blank"} rel="noopener noreferrer">
      {children}
    </a>
  );
}
