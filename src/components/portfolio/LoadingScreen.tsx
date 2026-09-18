import { useEffect, useState } from "react";

const GREETINGS = ["नमस्ते", "你好", "こんにちは", "bonjour", "hola", "سلام"];
const DISPLAY_TIME = 2000;
const FADE_TIME = 300;

export default function LoadingScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const greetingTimer = window.setInterval(() => {
      setGreetingIndex((current) => (current + 1) % GREETINGS.length);
    }, 320);
    const fadeTimer = window.setTimeout(
      () => setFading(true),
      DISPLAY_TIME - FADE_TIME,
    );
    const completeTimer = window.setTimeout(onComplete, DISPLAY_TIME);

    return () => {
      window.clearInterval(greetingTimer);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-300 ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="tech-grid absolute inset-0 opacity-40" />
      <div className="relative flex w-[min(22rem,calc(100%-2.5rem))] flex-col gap-8">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          <span>LT_ / boot sequence</span>
          <span>{String(greetingIndex + 1).padStart(2, "0")} / 06</span>
        </div>
        <div className="border-y border-border/70 py-8">
          <p className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {GREETINGS[greetingIndex]}
            <span className="text-signal">_</span>
          </p>
        </div>
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          <span className="h-px flex-1 overflow-hidden bg-border">
            <span
              className="block h-full bg-signal transition-[width] duration-300"
              style={{
                width: `${((greetingIndex + 1) / GREETINGS.length) * 100}%`,
              }}
            />
          </span>
          <span>initializing</span>
        </div>
      </div>
    </div>
  );
}
