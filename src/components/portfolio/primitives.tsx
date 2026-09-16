import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  index,
  title,
  children,
  className,
}: {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("relative border-t border-border/70 py-24 md:py-32", className)}>
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <header className="mb-12 flex items-baseline gap-4 md:mb-16">
          <span className="mono-label text-signal-dim">{index}</span>
          <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
          <span className="ml-2 hidden h-px flex-1 bg-border md:block" />
        </header>
        {children}
      </div>
    </section>
  );
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01<>/_$#*";

/** Text that resolves character by character, like a stream being decoded. */
export function DecodeText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  const [out, setOut] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (reduced || !inView) return;
    let frame = 0;
    let raf = 0;
    const start = performance.now() + delay;
    const step = (now: number) => {
      if (now < start) {
        raf = requestAnimationFrame(step);
        return;
      }
      frame += 1;
      const revealed = Math.floor(frame / 1.4);
      setOut(
        text
          .split("")
          .map((c, i) =>
            i < revealed || c === " " ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          )
          .join(""),
      );
      if (revealed <= text.length) raf = requestAnimationFrame(step);
      else setOut(text);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [text, inView, reduced, delay]);

  return (
    <span ref={ref} className={className}>
      {out || "\u00A0"}
    </span>
  );
}

/** Vertical/horizontal node pipeline with a packet travelling through it. */
export function Pipeline({
  nodes,
  orientation = "vertical",
  active = true,
  compact = false,
}: {
  nodes: readonly string[];
  orientation?: "vertical" | "horizontal";
  active?: boolean;
  compact?: boolean;
}) {
  const reduced = useReducedMotion();
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    if (reduced || !active) return;
    const t = setInterval(() => setCursor((c) => (c + 1) % nodes.length), 850);
    return () => clearInterval(t);
  }, [nodes.length, reduced, active]);

  const vertical = orientation === "vertical";

  return (
    <div
      className={cn(
        "flex",
        vertical ? "flex-col items-start gap-0" : "flex-wrap items-center gap-0",
      )}
      aria-hidden
    >
      {nodes.map((node, i) => {
        const hot = active && !reduced && i === cursor;
        return (
          <div key={node + i} className={cn("flex", vertical ? "flex-col" : "items-center")}>
            <div className="flex items-center gap-2.5">
              <span
                className={cn(
                  "size-1.5 shrink-0 rounded-full transition-all duration-300",
                  hot ? "bg-signal shadow-[0_0_10px_2px_var(--signal)]" : "bg-border",
                )}
              />
              <span
                className={cn(
                  "font-mono uppercase tracking-[0.16em] transition-colors duration-300",
                  compact ? "text-[10px]" : "text-[11px]",
                  hot ? "text-signal" : "text-muted-foreground",
                )}
              >
                {node}
              </span>
            </div>
            {i < nodes.length - 1 &&
              (vertical ? (
                <span className="ml-[2.5px] block h-5 w-px bg-border" />
              ) : (
                <span className="mx-3 block h-px w-6 bg-border" />
              ))}
          </div>
        );
      })}
    </div>
  );
}

/** Button that leans toward the cursor. */
export function Magnetic({
  children,
  className,
  href,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  href?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();

  return (
    <a
      ref={ref}
      href={href}
      className={cn(
        "group relative inline-flex items-center gap-2 border border-border bg-surface/60 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.16em] text-foreground transition-colors duration-200 hover:border-signal/60 hover:text-signal",
        className,
      )}
      onMouseMove={(e) => {
        if (reduced || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * 0.18;
        const y = (e.clientY - (r.top + r.height / 2)) * 0.28;
        ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = "translate3d(0,0,0)";
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
