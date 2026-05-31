export interface UserAnswers {
  budget?: number;
  use_case?: string;
  gaming_level?: string;
  battery?: string;
  portability?: string;
  editing?: string;
  coding?: string;
  perf_vs_battery?: string;
  future_proof?: string;
  brand?: string;
}

export interface MatchResult {
  score: number;
  reasons: string[];
  mismatches: string[];
}

function calculateMatch(user: UserAnswers, laptop: any): MatchResult {
  let totalWeight = 0;
  let earnedScore = 0;
  const reasons: string[] = [];
  const mismatches: string[] = [];

  const budget = user.budget || 80000;
  const price = laptop.price || 0;

  if (price > budget * 1.15) {
    const overPct = Math.round(((price - budget) / budget) * 100);
    return {
      score: Math.max(5, 50 - overPct),
      reasons: [`₹${(price / 1000).toFixed(0)}K is over your ₹${(budget / 1000).toFixed(0)}K budget`],
      mismatches: ["Over budget"],
    };
  }
  if (price <= budget) {
    reasons.push(`Fits within your ₹${(budget / 1000).toFixed(0)}K budget`);
  }

  const useCase = user.use_case;
  if (useCase) {
    totalWeight += 25;
    let score = 5;
    if (useCase === "gaming") score = laptop.gaming_score;
    else if (useCase === "coding") score = laptop.coding_score;
    else if (useCase === "editing") score = laptop.editing_score;
    else if (useCase === "student" || useCase === "business") score = laptop.student_score;
    earnedScore += (score / 10) * 25;
    if (score >= 8) reasons.push(`Excellent for ${useCase}`);
    else if (score <= 4) mismatches.push(`Not ideal for ${useCase}`);
  }

  const gamingLevel = user.gaming_level;
  if (gamingLevel && gamingLevel !== "none") {
    totalWeight += 20;
    const score = laptop.gaming_score;
    const thresholds: Record<string, number> = { casual: 3, moderate: 5, serious: 7, enthusiast: 9 };
    const threshold = thresholds[gamingLevel] || 5;
    earnedScore += (score / 10) * 20;
    if (score >= threshold) reasons.push(`Handles ${gamingLevel} gaming well`);
    else mismatches.push(`May struggle for ${gamingLevel} gaming`);
  }

  const battery = parseInt(user.battery || "3");
  if (battery >= 3) {
    totalWeight += 15;
    const score = laptop.battery_score;
    earnedScore += (score / 10) * 15;
    if (score >= 7 && battery >= 4) reasons.push("Long battery life");
    else if (score < 5 && battery >= 4) mismatches.push("Battery may not last full day");
  }

  const portability = parseInt(user.portability || "3");
  if (portability >= 3) {
    totalWeight += 10;
    const score = laptop.portability_score;
    earnedScore += (score / 10) * 10;
    if (score >= 7) reasons.push("Lightweight and portable");
    else if (portability >= 4 && score < 5) mismatches.push("Heavier than ideal");
  }

  const editing = user.editing;
  if (editing && editing !== "none") {
    totalWeight += 15;
    const score = laptop.editing_score;
    const thresholds: Record<string, number> = { light: 4, moderate: 6, heavy: 8, pro: 9 };
    const threshold = thresholds[editing] || 5;
    earnedScore += (score / 10) * 15;
    if (score >= threshold) reasons.push(`Great for ${editing} editing`);
    else mismatches.push(`May struggle with ${editing} editing`);
  }

  const coding = user.coding;
  if (coding && coding !== "none") {
    totalWeight += 15;
    const score = laptop.coding_score;
    earnedScore += (score / 10) * 15;
    if (score >= 8) reasons.push("Powerful for development");
    if (coding === "ai" && score < 8) mismatches.push("May not handle AI/ML workloads");
  }

  const perfVsBattery = user.perf_vs_battery;
  if (perfVsBattery) {
    totalWeight += 10;
    const pScore = laptop.performance_score;
    const bScore = laptop.battery_score;
    let combined = 5;
    if (perfVsBattery === "max_perf") combined = pScore;
    else if (perfVsBattery === "perf_lean") combined = pScore * 0.7 + bScore * 0.3;
    else if (perfVsBattery === "balanced") combined = (pScore + bScore) / 2;
    else if (perfVsBattery === "batt_lean") combined = pScore * 0.3 + bScore * 0.7;
    else if (perfVsBattery === "max_battery") combined = bScore;
    earnedScore += (combined / 10) * 10;
  }

  const futureProof = parseInt(user.future_proof || "2");
  if (futureProof >= 3) {
    const avg =
      (laptop.gaming_score + laptop.battery_score + laptop.coding_score + laptop.editing_score + laptop.portability_score + laptop.performance_score) / 6;
    if (avg >= 7) reasons.push("Well-spec'd for long-term use");
  }

  const brand = user.brand;
  if (brand && brand !== "any" && laptop.brand?.toLowerCase() === brand.toLowerCase()) {
    reasons.push(`Matches your ${brand} preference`);
  }

  if (totalWeight === 0) {
    return { score: 60, reasons: ["General recommendation"], mismatches: [] };
  }

  let finalScore = (earnedScore / totalWeight) * 100;
  if (price <= budget * 0.9) {
    finalScore = Math.min(100, finalScore + 3);
  }

  return {
    score: Math.round(Math.max(15, Math.min(99, finalScore))),
    reasons: reasons.slice(0, 4),
    mismatches: mismatches.slice(0, 2),
  };
}

export function getTopMatches(user: UserAnswers, laptops: any[], limit = 8) {
  const scored = laptops.map((laptop) => {
    const result = calculateMatch(user, laptop);
    return { ...laptop, matchScore: result.score, matchReasons: result.reasons, matchMismatches: result.mismatches };
  });
  scored.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
  return scored.slice(0, limit);
}
