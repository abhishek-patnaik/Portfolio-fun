import { skillGroups } from "@/lib/data/skills";
import StatusBadge from "@/components/ui/StatusBadge";

/** Skills grouped by discipline, described in words rather than percentages. */
export default function SkillsPanel() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {skillGroups.map((group) => (
        <section key={group.id} aria-labelledby={`skills-${group.id}`} className="rounded-xl border border-line bg-white/3 p-5">
          <div className="flex items-center justify-between gap-2">
            <h2 id={`skills-${group.id}`} className="display text-lg font-semibold text-fg">
              {group.name}
            </h2>
            <StatusBadge status={group.status} />
          </div>
          <p className="mt-1 text-sm text-muted">{group.description}</p>
          <ul className="mt-4 divide-y divide-line">
            {group.skills.map((skill) => (
              <li key={skill.name} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 py-2.5">
                <span className="text-sm font-medium text-fg">{skill.name}</span>
                {skill.note ? <span className="text-xs text-muted">{skill.note}</span> : null}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
