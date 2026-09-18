import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useState } from "react";
import Nav from "@/components/portfolio/Nav";
import Hero from "@/components/portfolio/Hero";
import LoadingScreen from "@/components/portfolio/LoadingScreen";
import Mindset from "@/components/portfolio/Mindset";

const Projects = lazy(() => import("@/components/portfolio/Projects"));
const Stack = lazy(() => import("@/components/portfolio/Stack"));
const Portrait = lazy(() => import("@/components/portfolio/Portrait"));
const Terminal = lazy(() => import("@/components/portfolio/Terminal"));

const TITLE = "Lovish Thukral — Full Stack Software Engineer · AI Systems";
const DESC =
  "I build systems to scale, not pages to sell. Full stack engineer working on backend architecture, database performance and on-device AI inference.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [loading, setLoading] = useState(true);

  return (
    <div id="top" className="min-h-screen bg-background">
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <Nav />
      <main>
        <Hero />
        <Mindset />
        <Portrait />
        <Suspense fallback={<div className="h-[60vh]" />}>
          <Projects />
          <Stack />
          <Terminal />
        </Suspense>
      </main>
      <footer className="border-t border-border/70 py-8">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground md:px-8">
          <span>© {new Date().getFullYear()} Lovish Thukral</span>
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-signal" />
            build stable
          </span>
        </div>
      </footer>
    </div>
  );
}
