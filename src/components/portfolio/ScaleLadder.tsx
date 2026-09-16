import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const STEPS = [
  { n: "1", label: "request", note: "anything works" },
  { n: "10", label: "requests", note: "still anything works" },
  { n: "1,000", label: "requests", note: "queries start mattering" },
  { n: "1,000,000", label: "requests", note: "the schema is the product" },
];

export default function ScaleLadder() {
  const reduced = useReducedMotion();
  const [i, setI] = useState(reduced ? STEPS.length - 1 : 0);

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setI((v) => (v + 1) % STEPS.length), 1600);
    return () => clearInterval(t);
  }, [reduced]);

  return (
    <div className="hairline p-5">
      <p className="mono-label mb-4">the problem changes with scale</p>
      <div className="space-y-2">
        {STEPS.map((s, idx) => {
          const on = idx <= i;
          return (
            <div key={s.n} className="flex items-center gap-3">
              <span
                className={`w-24 shrink-0 text-right font-mono text-sm transition-colors duration-500 ${
                  on ? "text-signal" : "text-muted-foreground/40"
                }`}
              >
                {s.n}
              </span>
              <span className="relative h-1 flex-1 overflow-hidden bg-border/60">
                <motion.span
                  className="absolute inset-y-0 left-0 bg-signal/70"
                  animate={{ width: on ? `${((idx + 1) / STEPS.length) * 100}%` : "0%" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </span>
              <span
                className={`w-40 shrink-0 font-mono text-[10px] transition-colors duration-500 ${
                  on ? "text-muted-foreground" : "text-muted-foreground/30"
                }`}
              >
                {s.note}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
