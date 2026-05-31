export interface Question {
  id: string;
  question: string;
  options: { label: string; value: string }[];
  type: "single" | "number";
}

export const questions: Question[] = [
  {
    id: "budget",
    question: "What's your budget?",
    type: "number",
    options: [
      { label: "Under ₹30,000", value: "30000" },
      { label: "₹30,000 – ₹50,000", value: "50000" },
      { label: "₹50,000 – ₹80,000", value: "80000" },
      { label: "₹80,000 – ₹1,20,000", value: "120000" },
      { label: "Above ₹1,20,000", value: "150000" },
    ],
  },
  {
    id: "use_case",
    question: "What will you primarily use the laptop for?",
    type: "single",
    options: [
      { label: "Gaming", value: "gaming" },
      { label: "Coding / Development", value: "coding" },
      { label: "Video / Photo Editing", value: "editing" },
      { label: "Student / Study", value: "student" },
      { label: "Business / Office", value: "business" },
      { label: "General Use", value: "general" },
    ],
  },
  {
    id: "gaming_level",
    question: "How serious are you about gaming?",
    type: "single",
    options: [
      { label: "Casual (indie, light games)", value: "casual" },
      { label: "Moderate (AAA at medium settings)", value: "moderate" },
      { label: "Serious (AAA at high/ultra)", value: "serious" },
      { label: "Enthusiast (max settings, 144+fps)", value: "enthusiast" },
      { label: "Not interested in gaming", value: "none" },
    ],
  },
  {
    id: "battery",
    question: "How important is battery life?",
    type: "single",
    options: [
      { label: "Not important (mostly plugged in)", value: "1" },
      { label: "Nice to have (2-4 hours)", value: "3" },
      { label: "Important (4-6 hours)", value: "4" },
      { label: "Critical (6+ hours unplugged)", value: "5" },
    ],
  },
  {
    id: "portability",
    question: "How important is portability?",
    type: "single",
    options: [
      { label: "Not important (stays on desk)", value: "1" },
      { label: "Somewhat (move around occasionally)", value: "3" },
      { label: "Important (carry daily)", value: "4" },
      { label: "Critical (travel frequently)", value: "5" },
    ],
  },
  {
    id: "editing",
    question: "Do you do video or photo editing?",
    type: "single",
    options: [
      { label: "Light editing (casual photos, short clips)", value: "light" },
      { label: "Moderate editing (regular projects)", value: "moderate" },
      { label: "Heavy editing (4K video, professional)", value: "heavy" },
      { label: "Professional (DaVinci, After Effects)", value: "pro" },
      { label: "No editing work", value: "none" },
    ],
  },
  {
    id: "coding",
    question: "What kind of development work do you do?",
    type: "single",
    options: [
      { label: "Web / Frontend Development", value: "web" },
      { label: "Backend / Full Stack", value: "backend" },
      { label: "Mobile / App Development", value: "mobile" },
      { label: "AI / ML / Data Science", value: "ai" },
      { label: "Not a developer", value: "none" },
    ],
  },
  {
    id: "perf_vs_battery",
    question: "Performance vs Battery — which do you prioritize?",
    type: "single",
    options: [
      { label: "Maximum performance, battery doesn't matter", value: "max_perf" },
      { label: "Lean towards performance", value: "perf_lean" },
      { label: "Balanced between performance and battery", value: "balanced" },
      { label: "Lean towards battery life", value: "batt_lean" },
      { label: "Maximum battery life, performance doesn't matter", value: "max_battery" },
    ],
  },
  {
    id: "future_proof",
    question: "How important is future-proofing?",
    type: "single",
    options: [
      { label: "Not important (upgrade in 1-2 years)", value: "1" },
      { label: "Somewhat (3-4 years usage)", value: "3" },
      { label: "Very important (5+ years usage)", value: "5" },
    ],
  },
  {
    id: "brand",
    question: "Any brand preference?",
    type: "single",
    options: [
      { label: "Any brand", value: "any" },
      { label: "Apple", value: "apple" },
      { label: "ASUS", value: "asus" },
      { label: "Dell", value: "dell" },
      { label: "HP", value: "hp" },
      { label: "Lenovo", value: "lenovo" },
      { label: "Acer", value: "acer" },
      { label: "MSI", value: "msi" },
      { label: "Samsung", value: "samsung" },
    ],
  },
  {
    id: "ram",
    question: "How much RAM do you need?",
    type: "single",
    options: [
      { label: "8GB (basic tasks)", value: "8" },
      { label: "16GB (sweet spot)", value: "16" },
      { label: "32GB (heavy workloads)", value: "32" },
      { label: "64GB+ (extreme/professional)", value: "64" },
    ],
  },
  {
    id: "storage",
    question: "How much storage do you need?",
    type: "single",
    options: [
      { label: "256GB (basic)", value: "256" },
      { label: "512GB (standard)", value: "512" },
      { label: "1TB (plenty of space)", value: "1024" },
      { label: "2TB+ (media professional)", value: "2048" },
    ],
  },
];
