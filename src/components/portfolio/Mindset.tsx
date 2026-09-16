import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PRINCIPLES } from "@/lib/portfolio";
import { Section } from "./primitives";

export default function Mindset() {
  const [active, setActive] = useState(0);
  const p = PRINCIPLES[active] ?? PRINCIPLES[0];

  return (
    <Section id="mindset" index="02" title="How I Think">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,300px)_1fr]">
        <ul className="flex flex-row gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {PRINCIPLES.map((item, i) => (
            <li key={item.id} className="shrink-0 lg:shrink">
              <button
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className={`relative w-full border-l-2 px-4 py-3 text-left transition-colors duration-200 ${
                  i === active
                    ? "border-signal bg-surface/70 text-foreground"
                    : "border-border/70 text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="font-mono text-[10px] tracking-[0.18em] text-signal-dim">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="ml-3 font-display text-sm font-medium tracking-tight">
                  {item.title}
                </span>
                <span className="mt-1 hidden text-xs text-muted-foreground lg:block">
                  {item.line}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="hairline relative min-h-[260px] overflow-hidden p-6 md:p-10">
          <div className="tech-grid pointer-events-none absolute inset-0 opacity-60" />
          <AnimatePresence mode="wait">
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <p className="mono-label text-signal">{p.title}</p>
              <p className="mt-4 max-w-2xl text-pretty font-display text-lg leading-snug md:text-xl">
                {p.line}
              </p>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {p.metrics.map((m) => (
                  <span
                    key={m}
                    className="border border-border/80 bg-background/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
