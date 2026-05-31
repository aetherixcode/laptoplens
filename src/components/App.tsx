import { useState, useEffect } from "react";
import Landing from "./Landing";
import Quiz from "./Quiz";
import Results from "./Results";
import { fetchLaptops } from "../lib/supabase";
import { getTopMatches } from "../lib/matching";
import type { UserAnswers } from "../lib/matching";

type View = "landing" | "quiz" | "results";

export default function App() {
  const [view, setView] = useState<View>("landing");
  const [results, setResults] = useState<any[]>([]);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [loading, setLoading] = useState(false);

  // Check URL for direct quiz access
  useEffect(() => {
    if (window.location.pathname === "/quiz") {
      setView("quiz");
    }
  }, []);

  const handleStart = () => {
    window.history.pushState({}, "", "/quiz");
    setView("quiz");
  };

  const handleComplete = async (userAnswers: UserAnswers) => {
    setAnswers(userAnswers);
    setLoading(true);
    const laptops = await fetchLaptops();
    const top = getTopMatches(userAnswers, laptops);
    setResults(top);
    setLoading(false);
    setView("results");
    window.history.pushState({}, "", "/results");
  };

  const handleRestart = () => {
    window.history.pushState({}, "", "/");
    setView("landing");
  };

  if (view === "quiz") return <Quiz onComplete={handleComplete} />;
  if (view === "results") return <Results results={results} answers={answers} onRestart={handleRestart} />;
  return <Landing onStart={handleStart} />;
}
