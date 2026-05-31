import type { UserAnswers } from "../lib/matching";

interface LaptopResult {
  id: number;
  name: string;
  brand: string;
  price: number;
  original_price: number;
  image_url: string;
  product_url: string;
  processor: string;
  ram: string;
  storage: string;
  gpu: string;
  rating: number;
  matchScore: number;
  matchReasons: string[];
  matchMismatches: string[];
}

export default function Results({ results, answers, onRestart }: { results: LaptopResult[]; answers: UserAnswers; onRestart: () => void }) {
  const topScore = results[0]?.matchScore || 0;

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg-primary)" }}>
      <nav className="nav-glass flex items-center justify-between px-6 sm:px-10 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="font-display text-lg font-bold tracking-tight">LaptopLens</span>
          <span className="text-accent text-lg font-display">.</span>
        </div>
        <button onClick={onRestart} className="btn-nav text-sm">Start Over</button>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12 slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-wide mb-6 border" style={{ background: "var(--color-accent-dim)", borderColor: "rgba(200,240,96,0.2)", color: "var(--color-accent)" }}>
            Your Results
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Your Perfect Match{results.length > 1 ? "es" : ""}
          </h1>
          {topScore >= 80 && (
            <p className="text-base" style={{ color: "var(--color-text-secondary)" }}>
              We found <strong className="text-accent">great matches</strong> based on your preferences.
            </p>
          )}
        </div>

        <div className="space-y-5">
          {results.map((lap, i) => {
            const score = lap.matchScore || 0;
            const specs = [lap.processor, lap.ram, lap.storage, lap.gpu].filter(Boolean);
            const scoreColor = score >= 85 ? "var(--color-accent)" : score >= 70 ? "var(--color-yellow)" : "var(--color-orange)";
            return (
              <div key={lap.id} className="result-card slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="flex items-start gap-5">
                  {lap.image_url && (
                    <img src={lap.image_url} alt={lap.name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shrink-0" style={{ background: "var(--color-bg-secondary)" }} />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-lg font-bold mb-1">{lap.name}</h3>
                        <div className="flex items-center gap-3 text-xs mb-3" style={{ color: "var(--color-text-muted)" }}>
                          <span>{lap.brand}</span>
                          <span>★ {lap.rating}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="score-ring" style={{ border: `3px solid ${scoreColor}`, color: scoreColor }}>
                          {score}%
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {specs.map((s) => (
                        <span key={s} className="text-xs px-3 py-1 rounded-full border" style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)" }}>
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="font-display text-lg font-bold text-accent">₹{lap.price.toLocaleString("en-IN")}</span>
                      {lap.original_price > lap.price && (
                        <span className="text-xs line-through" style={{ color: "var(--color-text-muted)" }}>₹{lap.original_price.toLocaleString("en-IN")}</span>
                      )}
                    </div>

                    {lap.matchReasons.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {lap.matchReasons.map((r) => (
                          <span key={r} className="text-xs px-2.5 py-1 rounded-md" style={{ background: "rgba(200,240,96,0.1)", color: "var(--color-accent)" }}>
                            ✓ {r}
                          </span>
                        ))}
                      </div>
                    )}

                    {lap.matchMismatches.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {lap.matchMismatches.map((m) => (
                          <span key={m} className="text-xs px-2.5 py-1 rounded-md" style={{ background: "rgba(240,96,96,0.1)", color: "var(--color-orange)" }}>
                            ✗ {m}
                          </span>
                        ))}
                      </div>
                    )}

                    {lap.product_url && (
                      <a
                        href={lap.product_url}
                        target="_blank"
                        rel="noopener"
                        className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all"
                        style={{ background: "var(--color-accent)", color: "#000" }}
                      >
                        View on Amazon
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {results.length === 0 && (
          <div className="text-center py-20">
            <p className="text-base" style={{ color: "var(--color-text-secondary)" }}>No matching laptops found. Try different preferences.</p>
            <button onClick={onRestart} className="btn-accent text-base px-8 py-3 mt-6">Try Again</button>
          </div>
        )}

        {results.length > 0 && (
          <div className="text-center mt-12">
            <button onClick={onRestart} className="btn-ghost">Start Over</button>
          </div>
        )}

        <footer className="mt-20 pt-10 border-t text-center" style={{ borderColor: "var(--color-border)" }}>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>LaptopLens — A product of Aetherix Group</p>
          <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>Affiliate links may earn commission. Prices may vary.</p>
        </footer>
      </div>
    </div>
  );
}
