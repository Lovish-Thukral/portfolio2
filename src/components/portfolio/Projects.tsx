import { lazy, Suspense, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS, type Project } from "@/lib/portfolio";
import { Pipeline, Section } from "./primitives";

const ScaleLadder = lazy(() => import("./ScaleLadder"));

function DeviceSelector() {
  const tiers = [
    { device: "4 GB RAM · CPU", model: "1.1B · Q4_K_M" },
    { device: "8 GB RAM · CPU", model: "3B · Q4_K_M" },
    { device: "16 GB RAM · GPU", model: "7B · Q5_K_M" },
  ];
  const [i, setI] = useState(1);
  const sel = tiers[i] ?? { device: "", model: "" };
  return (
    <div className="hairline p-5">
      <p className="mono-label mb-4">adaptive model selection</p>
      <div className="flex gap-2">
        {tiers.map((t, idx) => (
          <button
            key={t.device}
            onClick={() => setI(idx)}
            className={`flex-1 border px-2 py-2 font-mono text-[10px] leading-tight transition-colors ${
              i === idx
                ? "border-signal/60 bg-signal/10 text-signal"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.device}
          </button>
        ))}
      </div>
      <motion.p
        key={i}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 font-mono text-xs text-foreground"
      >
        selected → <span className="text-signal">{sel.model}</span>
      </motion.p>
      <p className="mt-1 font-mono text-[10px] text-muted-foreground">
        quantization tier chosen from available device resources
      </p>
    </div>
  );
}

function LocalVsCloud() {
  const [local, setLocal] = useState(true);
  const rows = local
    ? [
        ["upload", "0 bytes"],
        ["network", "not required"],
        ["image leaves device", "no"],
        ["compute", "WebGPU / WASM, on-device"],
      ]
    : [
        ["upload", "full image"],
        ["network", "round trip per image"],
        ["image leaves device", "yes"],
        ["compute", "remote server"],
      ];
  return (
    <div className="hairline p-5">
      <div className="mb-4 flex items-center justify-between">
        <p className="mono-label">processing path</p>
        <div className="flex border border-border">
          {["local", "cloud"].map((m) => (
            <button
              key={m}
              onClick={() => setLocal(m === "local")}
              className={`px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${
                (m === "local") === local ? "bg-signal/15 text-signal" : "text-muted-foreground"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <dl className="space-y-2">
        {rows.map(([k, v]) => (
          <motion.div
            key={k}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-2 font-mono text-[11px]"
          >
            <dt className="text-muted-foreground">{k}</dt>
            <dd className={local ? "text-signal" : "text-amber"}>{v}</dd>
          </motion.div>
        ))}
      </dl>
    </div>
  );
}

function ContextStack() {
  const layers = ["profile", "history", "goals", "memory window", "system prompt"];
  const reduced = useReducedMotion();
  return (
    <div className="hairline p-5">
      <p className="mono-label mb-4">context assembly</p>
      <div className="space-y-1.5">
        {layers.map((l, i) => (
          <motion.div
            key={l}
            initial={reduced ? false : { opacity: 0, scaleX: 0.8 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            style={{ transformOrigin: "left" }}
            className="flex items-center justify-between border border-border/70 bg-background/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
          >
            {l}
            <span className="text-signal-dim">layer {i + 1}</span>
          </motion.div>
        ))}
      </div>
      <p className="mt-4 font-mono text-[10px] text-muted-foreground">
        assembled per request → orchestrated prompt → LLM
      </p>
    </div>
  );
}

function ProjectBlock({ project }: { project: Project }) {
  const reduced = useReducedMotion();
  const extras: Record<string, React.ReactNode> = {
    sabrina: <DeviceSelector />,
    remvo: <LocalVsCloud />,
    nextep: <ContextStack />,
  };

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, scale: 0.96, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className="grid gap-8 border-t border-border/70 pt-10 lg:grid-cols-[1fr_minmax(0,360px)]"
    >
      <div>
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-xs tracking-[0.2em] text-signal-dim">
            PROJECT {project.index}
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>
        <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight md:text-3xl">
          {project.name}
        </h3>
        <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {project.subtitle}
        </p>
        <p className="mt-5 max-w-xl text-pretty font-display text-base leading-snug text-foreground md:text-lg">
          {project.thesis}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.map((t, i) => (
            <motion.span
              key={t}
              initial={reduced ? false : { opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 300, damping: 20 }}
              className="border border-border/80 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground"
            >
              {t}
            </motion.span>
          ))}
        </div>

        <dl className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-3">
          {project.notes.map((n, i) => (
            <motion.div
              key={n.label}
              initial={reduced ? false : { opacity: 0, y: 14, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 + i * 0.09, type: "spring", stiffness: 200, damping: 16 }}
            >
              <dt className="mono-label">{n.label}</dt>
              <dd className="mt-1 font-mono text-sm text-signal">{n.value}</dd>
            </motion.div>
          ))}
        </dl>
      </div>

      <div className="space-y-4">
        <div className="hairline p-5">
          <p className="mono-label mb-4">runtime path</p>
          <Pipeline nodes={project.pipeline} active />
        </div>
        {extras[project.id]}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <Section id="projects" index="04" title="Engineering Case Studies">
      <div className="space-y-12">
        <Suspense fallback={<div className="hairline h-40" />}>
          <ScaleLadder />
        </Suspense>
        {PROJECTS.map((p) => (
          <ProjectBlock key={p.id} project={p} />
        ))}
        <a
          href="https://github.com/Lovish-Thukral"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-signal"
        >
          more on github <ArrowUpRight className="size-3.5" />
        </a>
      </div>
    </Section>
  );
}
