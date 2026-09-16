import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowDown, Github, FileText } from "lucide-react";
import { PROFILE } from "@/lib/portfolio";
import { DecodeText, Magnetic } from "./primitives";

const BOOT = [
  "init runtime",
  "load context",
  "warm model",
  "open socket",
  "ready",
];

const INFER = ["INPUT", "CONTEXT", "MODEL", "INFERENCE", "RESPONSE"];

function BootLog() {
  const reduced = useReducedMotion();
  const [n, setN] = useState(reduced ? BOOT.length : 0);
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setN((v) => (v < BOOT.length ? v + 1 : v)), 320);
    return () => clearInterval(t);
  }, [reduced]);
  return (
    <ul className="space-y-1 font-mono text-[11px] text-muted-foreground">
      {BOOT.slice(0, n).map((l) => (
        <motion.li
          key={l}
          initial={reduced ? false : { opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <span className="text-signal-dim">›</span>
          {l}
          <span className="text-signal">ok</span>
        </motion.li>
      ))}
    </ul>
  );
}

function InferenceColumn() {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setI((v) => (v + 1) % INFER.length), 900);
    return () => clearInterval(t);
  }, [reduced]);

  return (
    <div className="relative hairline p-6" aria-hidden>
      <div className="mono-label mb-5 flex items-center justify-between">
        <span>inference pipeline</span>
        <span className="flex items-center gap-1.5 text-signal">
          <span className="size-1.5 rounded-full bg-signal [animation:pulse-node_1.6s_ease-in-out_infinite]" />
          live
        </span>
      </div>
      <div className="space-y-0">
        {INFER.map((step, idx) => {
          const hot = !reduced && idx === i;
          return (
            <div key={step}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className={`size-2 rounded-full transition-all duration-300 ${
                      hot ? "bg-signal shadow-[0_0_12px_2px_var(--signal)]" : "bg-border"
                    }`}
                  />
                  <span
                    className={`font-mono text-xs tracking-[0.2em] transition-colors duration-300 ${
                      hot ? "text-signal" : "text-muted-foreground"
                    }`}
                  >
                    {step}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-muted-foreground/60">
                  {hot ? "processing" : "idle"}
                </span>
              </div>
              {idx < INFER.length - 1 && (
                <div className="ml-[3px] h-6 w-px overflow-hidden bg-border">
                  <motion.span
                    className="block h-2 w-px bg-signal"
                    animate={hot && !reduced ? { y: [0, 24] } : { y: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "linear" }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <header className="relative grain min-h-[100svh] overflow-hidden pt-36 pb-16">
      <div className="tech-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_75%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-signal/8 blur-[140px]" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-14 px-5 md:px-8 lg:grid-cols-[1.35fr_1fr] lg:items-center">
        <div>
          <p className="mono-label mb-6 flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-signal [animation:pulse-node_1.6s_ease-in-out_infinite]" />
            system online · {PROFILE.location}
          </p>

          <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-[0.95] tracking-tight">
            {PROFILE.name}
          </h1>

          <p className="mt-4 font-mono text-xs tracking-[0.18em] text-signal uppercase md:text-sm">
            <DecodeText text={`${PROFILE.role} · ${PROFILE.discipline}`} />
          </p>

          <p className="mt-10 max-w-xl text-balance font-display text-xl leading-snug text-foreground md:text-2xl">
            {PROFILE.thesis}
          </p>
          <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
            {PROFILE.neural}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Magnetic href="#projects" className="border-signal/50 bg-signal/10 text-signal">
              View Work
            </Magnetic>
            <Magnetic href={PROFILE.github} target="_blank" rel="noreferrer">
              <Github className="size-3.5" /> GitHub
            </Magnetic>
            <Magnetic href={PROFILE.resume} target="_blank" rel="noreferrer">
              <FileText className="size-3.5" /> Resume
            </Magnetic>
          </div>

          <div className="mt-14 hidden md:block">
            <BootLog />
          </div>
        </div>

        <div className="space-y-4">
          <InferenceColumn />
          <div className="hairline flex items-center justify-between px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            <span>code → systems → ai → scale</span>
            <ArrowDown className="size-3 text-signal" />
          </div>
        </div>
      </div>
    </header>
  );
}
