import { useState } from "react";
import { questions, type Question } from "../lib/questions";
import type { UserAnswers } from "../lib/matching";

export default function Quiz({ onComplete }: { onComplete: (answers: UserAnswers) => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [selected, setSelected] = useState<string>("");

  const current = questions[step];
  const progress = ((step) / questions.length) * 100;

  const handleSelect = (value: string) => {
    setSelected(value);
    setAnswers((prev) => ({ ...prev, [current.id]: value }));
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
      setSelected("");
    } else {
      onComplete(answers);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setSelected(answers[questions[step - 1].id] as string || "");
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--color-bg-primary)" }}>
      <nav className="nav-glass flex items-center justify-between px-6 sm:px-10 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="font-display text-lg font-bold tracking-tight">LaptopLens</span>
          <span className="text-accent text-lg font-display">.</span>
        </div>
        <span className="text-xs font-mono" style={{ color: "var(--color-text-muted)" }}>{step + 1} / {questions.length}</span>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl mx-auto slide-up">
          <div className="progress-bar mb-10">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>

          <div className="mb-2">
            <span className="text-xs font-mono tracking-wide uppercase" style={{ color: "var(--color-accent)" }}>
              Question {step + 1} of {questions.length}
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-8">
            {current.question}
          </h2>

          <div className="space-y-3">
            {current.options.map((opt) => {
              const isSelected = (selected || answers[current.id]) === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  className={`quiz-option ${isSelected ? "selected" : ""}`}
                >
                  <div
                    className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all"
                    style={{
                      borderColor: isSelected ? "var(--color-accent)" : "var(--color-border-bright)",
                    }}
                  >
                    {isSelected && <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--color-accent)" }} />}
                  </div>
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between mt-10">
            <button
              onClick={handleBack}
              disabled={step === 0}
              className="btn-ghost disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!selected && !answers[current.id]}
              className="btn-accent text-base px-8 py-3 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {step < questions.length - 1 ? "Next" : "See Results"}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
