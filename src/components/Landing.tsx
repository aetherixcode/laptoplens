import { useEffect } from "react";

export default function Landing({ onStart }: { onStart: () => void }) {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("revealed");
        });
      },
      { threshold: 0.08 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const stats = [
    { num: "100+", label: "Laptops" },
    { num: "12", label: "Questions" },
    { num: "~3min", label: "Time needed" },
    { num: "Free", label: "Always" },
  ];

  const steps = [
    { icon: "🎯", title: "Answer the Quiz", desc: "12 questions about your budget, use case, gaming needs, and more." },
    { icon: "⚙️", title: "Matching Engine Runs", desc: "Our weighted algorithm compares your answers against 100+ laptop profiles." },
    { icon: "📊", title: "Get Ranked Matches", desc: "See your top results with exact % scores, pros/cons, and reasons why." },
    { icon: "✨", title: "Buy With Confidence", desc: "Direct affiliate links to Amazon. No sign-up needed. Always free." },
  ];

  const why = [
    { icon: "🧠", title: "Weighted Algorithm", desc: "Not a simple tag match. Each preference is weighted by importance, so you get results that actually make sense." },
    { icon: "🎯", title: "Personalized Scoring", desc: "Every laptop gets a match percentage with specific reasons why it does or doesn't fit your profile." },
    { icon: "🔍", title: "Transparent Results", desc: "See exactly why each laptop was recommended — no black box, no hidden sponsorships." },
  ];

  return (
    <>
      <nav className="nav-glass fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="font-display text-lg font-bold tracking-tight">LaptopLens</span>
          <span className="text-accent text-lg font-display">.</span>
        </div>
        <button onClick={onStart} className="btn-nav text-sm">Start Quiz</button>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-28 pb-16">
        <div className="orb orb-accent" style={{ top: "-250px", left: "-150px" }} />
        <div className="orb orb-blue" style={{ bottom: "-150px", right: "-100px" }} />
        <div className="grid-bg absolute inset-0 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-wide mb-8 border fade-in-1" style={{ background: "var(--color-accent-dim)", borderColor: "rgba(200,240,96,0.2)", color: "var(--color-accent)" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-accent)", animation: "pulse-dot 1.8s ease-in-out infinite" }} />
            Powered by Smart Matching
          </div>

          <h1 className="font-display leading-[0.95] tracking-tighter mb-6 fade-in-2" style={{ fontSize: "clamp(2.8rem, 8vw, 6.5rem)" }}>
            Find Your<br />
            <span className="text-accent">Perfect</span> <span className="text-outline">Laptop</span>
          </h1>

          <p className="text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed fade-in-3" style={{ color: "var(--color-text-secondary)" }}>
            Answer 12 questions. Our matching engine compares your needs against 100+ laptops and shows you exactly what fits — with reasons.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap fade-in-4">
            <button onClick={onStart} className="btn-accent text-base px-8 py-4">
              Start the Quiz
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <a href="#how-it-works" className="btn-ghost">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
              How it works
            </a>
          </div>

          <div className="flex items-center justify-center gap-8 sm:gap-14 mt-16 pt-10 border-t fade-in-5" style={{ borderColor: "var(--color-border)" }}>
            {stats.map((s, i) => (
              <div key={s.label} className="flex items-center gap-8 sm:gap-14">
                <div className="text-center">
                  <span className="font-display text-3xl sm:text-4xl font-bold block leading-none mb-1 text-accent">{s.num}</span>
                  <span className="text-xs font-mono tracking-wide uppercase" style={{ color: "var(--color-text-muted)" }}>{s.label}</span>
                </div>
                {i < stats.length - 1 && <div className="hidden sm:block w-px h-10" style={{ background: "var(--color-border)" }} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="px-6 py-28 sm:py-36">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 sm:mb-20 reveal">
            <span className="section-label">The Process</span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight mb-4">How LaptopLens Works</h2>
            <p className="max-w-lg mx-auto text-base sm:text-lg" style={{ color: "var(--color-text-secondary)" }}>No sign-up needed. Just answer honestly and we handle the math.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((s, i) => (
              <div key={s.title} className={`card reveal reveal-delay-${i + 1} p-7 sm:p-8`}>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center text-sm font-display font-bold mb-5 border" style={{ borderColor: "rgba(200,240,96,0.15)", color: "var(--color-accent)" }}>
                    {s.icon}
                  </div>
                  <h3 className="font-display text-lg font-bold mb-2">{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-28 sm:pb-36">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 sm:mb-20 reveal">
            <span className="section-label">Why LaptopLens</span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight mb-4">Built Different</h2>
            <p className="max-w-lg mx-auto text-base sm:text-lg" style={{ color: "var(--color-text-secondary)" }}>No bias. No sponsorships. Just honest matching.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {why.map((w, i) => (
              <div key={w.title} className={`card-soft reveal reveal-delay-${i + 2} p-8 sm:p-10 text-center`}>
                <span className="text-4xl block mb-5">{w.icon}</span>
                <h3 className="font-display text-xl font-bold mb-3">{w.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-28 sm:pb-36 reveal">
        <div className="max-w-3xl mx-auto text-center cta-panel p-12 sm:p-20">
          <div className="relative z-10">
            <span className="section-label">Ready?</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">Find Your Perfect Laptop</h2>
            <p className="max-w-md mx-auto mb-8" style={{ color: "var(--color-text-secondary)" }}>12 questions. 3 minutes. A lifetime of right decisions.</p>
            <button onClick={onStart} className="btn-accent text-base px-8 py-4">
              Start the Quiz
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <footer className="px-6 sm:px-10 py-10 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: "var(--color-border)" }}>
        <div className="text-center sm:text-left">
          <span className="font-display font-bold">LaptopLens<span className="text-accent">.</span></span>
          <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>A product of Aetherix Group</p>
        </div>
        <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Affiliate links may earn commission. Prices may vary.</p>
        <div className="flex gap-5 text-xs" style={{ color: "var(--color-text-muted)" }}>
          <a href="#" className="hover:text-accent transition-colors duration-200">Privacy</a>
          <a href="#" className="hover:text-accent transition-colors duration-200">Affiliate Disclosure</a>
        </div>
      </footer>
    </>
  );
}
