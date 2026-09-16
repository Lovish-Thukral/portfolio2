import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { PROFILE } from "@/lib/portfolio";

type Line = { kind: "cmd" | "out" | "dim"; text: string };

const SCRIPT: Line[] = [
  { kind: "cmd", text: "whoami" },
  { kind: "out", text: "lovish-thukral" },
  { kind: "cmd", text: "focus" },
  { kind: "out", text: "systems" },
  { kind: "out", text: "backend" },
  { kind: "out", text: "ai" },
  { kind: "out", text: "performance" },
  { kind: "out", text: "scale" },
  { kind: "cmd", text: "status" },
  { kind: "out", text: "open_to_building_hard_things" },
  { kind: "dim", text: "session idle — connections below" },
];

export default function Terminal() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (reduced) {
      setN(SCRIPT.length);
      return;
    }
    if (!inView) return;
    const t = setInterval(() => setN((v) => (v < SCRIPT.length ? v + 1 : v)), 380);
    return () => clearInterval(t);
  }, [inView, reduced]);

  const links = [
    { icon: Github, label: "GitHub", href: PROFILE.github },
    { icon: Linkedin, label: "LinkedIn", href: PROFILE.linkedin },
    { icon: Mail, label: "Email", href: `mailto:${PROFILE.email}` },
    { icon: FileText, label: "Resume", href: PROFILE.resume },
  ];

  return (
    <section id="contact" className="relative grain border-t border-border/70 py-24 md:py-32">
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_50%_100%,black,transparent_70%)]" />
      <div className="relative mx-auto w-full max-w-4xl px-5 md:px-8">
        <header className="mb-10 flex items-baseline gap-4">
          <span className="mono-label text-signal-dim">07</span>
          <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            Terminal
          </h2>
        </header>

        <div ref={ref} className="hairline overflow-hidden">
          <div className="flex items-center gap-2 border-b border-border bg-surface-2/60 px-4 py-2">
            <span className="size-2 rounded-full bg-destructive/70" />
            <span className="size-2 rounded-full bg-amber/70" />
            <span className="size-2 rounded-full bg-signal/70" />
            <span className="ml-3 font-mono text-[10px] tracking-[0.14em] text-muted-foreground">
              lovish@systems — zsh
            </span>
          </div>
          <div className="min-h-[300px] space-y-1 p-5 font-mono text-[13px] leading-relaxed md:p-7">
            {SCRIPT.slice(0, n).map((l, i) => (
              <p
                key={i}
                className={
                  l.kind === "cmd"
                    ? "text-foreground"
                    : l.kind === "dim"
                      ? "pt-3 text-muted-foreground/60"
                      : "pl-4 text-signal"
                }
              >
                {l.kind === "cmd" && <span className="mr-2 text-signal-dim">$</span>}
                {l.text}
              </p>
            ))}
            <p className="text-foreground">
              <span className="mr-2 text-signal-dim">$</span>
              <span className="inline-block h-4 w-2 translate-y-0.5 animate-caret bg-signal" />
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-px border border-border bg-border sm:grid-cols-4">
          {links.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="group flex items-center justify-between bg-background px-4 py-4 transition-colors hover:bg-surface/70"
            >
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground transition-colors group-hover:text-signal">
                {label}
              </span>
              <Icon className="size-3.5 text-muted-foreground transition-colors group-hover:text-signal" />
            </a>
          ))}
        </div>

        <p className="mt-8 font-mono text-[11px] text-muted-foreground">
          {PROFILE.email} · {PROFILE.location}
        </p>
      </div>
    </section>
  );
}
