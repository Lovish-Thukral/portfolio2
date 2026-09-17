import { motion, useReducedMotion } from "motion/react";
import portrait from "@/assets/portrait.webp";
import { PROFILE } from "@/lib/portfolio";
import { Section } from "./primitives";

const READOUT = [
  ["focus", "systems · ai · product"],
  ["runtime", "linux · python · node"],
  ["mode", "build · break · rebuild"],
];

export default function Portrait() {
  const reduced = useReducedMotion();

  return (
    <Section id="portrait" index="03" title="The Operator">
      <div className="grid items-center gap-12 md:grid-cols-[minmax(0,420px)_1fr]">
        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.94, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 18,
          }}
          className="relative"
        >
          <div className="tech-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_60%,black,transparent_70%)]" />

          <div className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-signal/15 blur-[90px]" />

          <img
            src={portrait}
            alt={`${PROFILE.name}, full stack software engineer`}
            loading="lazy"
            width={900}
            height={1100}
            className="relative mx-auto w-full max-w-sm select-none [mask-image:linear-gradient(to_bottom,black_58%,transparent_98%)]"
          />

          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 h-px bg-signal/50"
            initial={{
              top: "10%",
              opacity: 0,
            }}
            whileInView={
              reduced
                ? {}
                : {
                    top: ["8%", "88%"],
                    opacity: [0, 0.8, 0],
                  }
            }
            viewport={{ once: false }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>

        <div>
          <p className="max-w-lg text-pretty font-display text-xl leading-snug md:text-2xl">
            I’m interested in the layer where software stops being a collection
            of features and starts becoming a system.
          </p>

          <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
            I build products, infrastructure, and AI systems to understand the
            machinery behind them. The goal isn't to use abstractions blindly,
            but to know when to trust them, when to break them, and when to
            build something better.
          </p>

          <dl className="mt-8 space-y-3">
            {READOUT.map(([k, v], i) => (
              <motion.div
                key={k}
                initial={reduced ? false : { opacity: 0, x: -14 }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.1 + i * 0.1,
                }}
                className="flex items-baseline justify-between gap-6 border-b border-border/60 pb-2 font-mono text-[11px] uppercase tracking-[0.16em]"
              >
                <dt className="text-muted-foreground">{k}</dt>

                <dd className="text-signal">{v}</dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
