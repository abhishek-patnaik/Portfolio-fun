"use client";

import { navigation, site } from "@/lib/data/portfolio";
import { useGameStore } from "@/lib/game/store";
import { SECTION_ICONS } from "@/components/portfolio/IntroductionPanel";
import { sectionHref } from "@/components/portfolio/nav";
import Icon from "@/components/ui/Icon";
import Modal from "@/components/ui/Modal";

/**
 * Conventional portfolio navigation, available at any time. Choosing a section
 * opens it immediately; nobody has to drive to a building to read anything.
 */
export default function MainMenu({ onClose }: { onClose: () => void }) {
  const openPanel = useGameStore((s) => s.openPanel);
  const openOverlay = useGameStore((s) => s.openOverlay);
  const returnToIntro = useGameStore((s) => s.returnToIntro);
  const phase = useGameStore((s) => s.phase);
  return (
    <Modal title="Portfolio" kicker={site.name} onClose={onClose} size="md" testId="main-menu">
      <nav aria-label="Portfolio sections">
        <ul className="space-y-1">
          {navigation.map((item) => (
            <li key={item.section}>
              <a
                href={sectionHref(item.section)}
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                  e.preventDefault();
                  if (item.section === "home" && phase === "driving") returnToIntro();
                  else openPanel(item.section);
                }}
                className="group flex items-center gap-3.5 rounded-xl px-3 py-2.5 transition hover:bg-white/8"
                data-testid={`menu-${item.section}`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/6 text-sky">
                  <Icon name={SECTION_ICONS[item.section]} size={19} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="display block text-sm font-semibold uppercase tracking-[0.14em] text-fg">{item.label}</span>
                  <span className="block truncate text-xs text-muted">{item.description}</span>
                </span>
                <Icon name="chevronRight" size={16} className="text-dim transition group-hover:translate-x-0.5 group-hover:text-sky" />
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-4 grid grid-cols-2 gap-2 border-t border-line pt-4">
        {phase === "driving" ? (
          <button type="button" onClick={() => openOverlay("map")} className="flex items-center justify-center gap-2 rounded-xl border border-line py-2.5 text-sm text-fg transition hover:bg-white/8">
            <Icon name="map" size={17} /> City map
          </button>
        ) : null}
        <button type="button" onClick={() => openOverlay("settings")} className="flex items-center justify-center gap-2 rounded-xl border border-line py-2.5 text-sm text-fg transition hover:bg-white/8">
          <Icon name="settings" size={17} /> Settings
        </button>
        <a href="/about" className="col-span-2 flex items-center justify-center gap-2 rounded-xl border border-line py-2.5 text-sm text-muted transition hover:bg-white/8 hover:text-fg">
          <Icon name="external" size={16} /> Open the classic site (no 3D)
        </a>
      </div>
    </Modal>
  );
}
