import { useEffect, useState } from "react";

const ITEMS = [
  { id: "mindset", label: "Think" },
  { id: "experience", label: "Systems" },
  { id: "projects", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "portrait", label: "Profile" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-border bg-background/85 backdrop-blur-md" : ""
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#top" className="font-mono text-xs tracking-[0.2em] text-foreground">
          LT<span className="text-signal">_</span>
        </a>
        <ul className="hidden items-center gap-5 sm:flex">
          {ITEMS.map((i) => (
            <li key={i.id}>
              <a
                href={`#${i.id}`}
                className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-signal"
              >
                {i.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal sm:hidden"
        >
          Contact
        </a>
      </div>
    </nav>
  );
}
