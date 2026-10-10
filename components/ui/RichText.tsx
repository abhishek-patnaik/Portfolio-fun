import type { ReactNode } from "react";

const TOKEN = /\*\*(.+?)\*\*|\[([^\]]+)\]\((https?:[^)\s]+)\)/g;

/**
 * Renders the two inline marks used in the content files: **bold** and
 * [label](https://url). Everything else is plain text, so content can never
 * inject markup.
 */
export default function RichText({ text }: { text: string }) {
  const out: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(TOKEN)) {
    const index = match.index ?? 0;
    if (index > last) out.push(text.slice(last, index));
    if (match[1] !== undefined) {
      out.push(
        <strong key={index} className="font-semibold text-fg">
          {match[1]}
        </strong>,
      );
    } else {
      out.push(
        <a key={index} href={match[3]} target="_blank" rel="noopener noreferrer" className="text-sky underline underline-offset-2 hover:no-underline">
          {match[2]}
        </a>,
      );
    }
    last = index + match[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}
