import { motion, useReducedMotion } from "motion/react";
import {
  Boxes,
  Braces,
  Cpu,
  Database,
  Layout,
  Server,
  type LucideIcon,
} from "lucide-react";
import { STACK } from "@/lib/portfolio";
import { Section } from "./primitives";

const ICONS: Record<string, LucideIcon> = {
  Languages: Braces,
  Backend: Server,
  Data: Database,
  Frontend: Layout,
  "AI Systems": Cpu,
  "Systems / Infra": Boxes,
};

export default function Stack() {
  const reduced = useReducedMotion();

  return (
    <Section id="stack" index="05" title="Engineering Stack">
      <div className="grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
        {STACK.map((group, gi) => {
          const Icon = ICONS[group.group] ?? Boxes;
          return (
            <motion.div
              key={group.group}
              initial={reduced ? false : { opacity: 0, scale: 0.94, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ type: "spring", stiffness: 140, damping: 16, delay: gi * 0.06 }}
              className="group bg-background p-6 transition-colors duration-300 hover:bg-surface/60"
            >
              <p className="mb-5 flex items-center gap-2.5">
                <Icon className="size-4 text-signal transition-transform duration-300 group-hover:scale-110" />
                <span className="mono-label text-signal-dim">{group.group}</span>
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {group.items.map((item, i) => (
                  <motion.li
                    key={item.name}
                    initial={reduced ? false : { opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 + i * 0.04, type: "spring", stiffness: 260, damping: 18 }}
                    className="border border-border/80 px-2.5 py-1 font-mono text-[11px] text-foreground/85 transition-colors duration-200 hover:border-signal/60 hover:text-signal"
                  >
                    {item.name}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
