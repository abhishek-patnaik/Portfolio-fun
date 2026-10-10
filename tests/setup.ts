import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { createElement, type AnchorHTMLAttributes, type ImgHTMLAttributes } from "react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
});

// The framework's link and image components need the Next.js runtime; in unit
// tests plain elements are equivalent for what is being asserted.
vi.mock("next/link", () => ({
  default: ({ children, href, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => createElement("a", { href, ...rest }, children),
}));
vi.mock("next/image", () => ({
  default: ({ alt, src }: ImgHTMLAttributes<HTMLImageElement>) => createElement("img", { alt, src }),
}));
