import { RarityTier } from "@prisma/client";

const DICTIONARY_WORDS = new Set([
  "ace", "air", "art", "bay", "bee", "big", "car", "cat", "cow", "day",
  "dog", "eye", "far", "fly", "fox", "fun", "god", "hot", "ice", "jet",
  "joy", "key", "law", "leo", "max", "neo", "new", "old", "one", "own",
  "pro", "ray", "red", "rex", "sky", "sun", "top", "two", "war", "win",
  "wow", "zoo", "apex", "atom", "axle", "bare", "bold", "boss", "bull",
  "burn", "byte", "cash", "chef", "chip", "city", "club", "cool", "core",
  "dash", "data", "dawn", "dusk", "duke", "easy", "edge", "epic", "fire",
  "five", "flag", "flex", "flow", "foam", "font", "ford", "form", "four",
  "free", "fuel", "full", "game", "gear", "glow", "gold", "grid", "grow",
  "hero", "high", "home", "hope", "huge", "icon", "idea", "init", "iron",
  "java", "jump", "just", "king", "king", "lake", "land", "last", "lead",
  "life", "like", "link", "lion", "live", "load", "lock", "logo", "long",
  "loop", "loud", "love", "luck", "make", "mass", "mega", "mesh", "meta",
  "mile", "mind", "mint", "mode", "moon", "more", "move", "much", "name",
  "navy", "next", "node", "neon", "none", "norm", "nova", "null", "nums",
  "oath", "obey", "only", "open", "opus", "over", "peak", "pick", "ping",
  "pipe", "plan", "play", "plot", "plus", "posh", "post", "prep", "pure",
  "push", "race", "raid", "rain", "rank", "rare", "read", "real", "repo",
  "rest", "ride", "ring", "rise", "road", "rock", "role", "roll", "root",
  "rush", "rust", "safe", "sage", "sail", "sale", "salt", "save", "scan",
  "seed", "self", "send", "shop", "show", "sign", "silk", "slim", "slow",
  "snap", "snow", "soft", "solo", "sort", "soul", "spin", "spot", "star",
  "stay", "stem", "step", "stop", "suit", "swap", "sync", "tail", "take",
  "tank", "task", "team", "tech", "test", "text", "thin", "tick", "tide",
  "time", "tire", "toll", "tone", "tool", "tour", "town", "tree", "trip",
  "true", "tune", "type", "unit", "user", "vibe", "view", "void", "volt",
  "vote", "wake", "walk", "wall", "wave", "west", "wide", "wiki", "wild",
  "wind", "wire", "wise", "wish", "with", "work", "worm", "wrap", "xray",
  "year", "zero", "zone", "zoom",
]);

export function computeRarityScore(plate: string): number {
  const p = plate.toUpperCase().replace(/\s/g, "");
  let score = 0;

  // Length scoring — shorter = rarer
  const lengthScores: Record<number, number> = { 1: 60, 2: 45, 3: 30, 4: 15, 5: 8, 6: 3, 7: 0 };
  score += lengthScores[p.length] ?? 0;

  // All same character (AAA, 111)
  if (/^(.)\1+$/.test(p)) score += 35;

  // All digits
  if (/^\d+$/.test(p)) {
    // Sequential ascending (123, 1234)
    if (isSequential(p, 1)) score += 25;
    // Sequential descending (321)
    else if (isSequential(p, -1)) score += 20;
    // Round numbers (100, 1000)
    else if (/^[1-9]0+$/.test(p)) score += 15;
    // Low number (1–99)
    else if (parseInt(p) <= 99) score += 20;
    else score += 5;
  }

  // All letters
  if (/^[A-Z]+$/.test(p)) {
    // Dictionary word
    if (DICTIONARY_WORDS.has(p.toLowerCase())) score += 25;
    // All same letter already covered above
  }

  // Mixed patterns (like "A1", "AB12", "007")
  if (/^0+\d+$/.test(p)) score += 15; // 007, 0001

  // Palindrome
  if (p.length >= 3 && p === p.split("").reverse().join("")) score += 15;

  // Alternating (A1A1, 1A1A)
  if (p.length >= 4 && /^([A-Z]\d)+$/.test(p)) score += 10;
  if (p.length >= 4 && /^(\d[A-Z])+$/.test(p)) score += 10;

  return Math.min(100, score);
}

function isSequential(digits: string, step: 1 | -1): boolean {
  for (let i = 1; i < digits.length; i++) {
    if (parseInt(digits[i]) - parseInt(digits[i - 1]) !== step) return false;
  }
  return true;
}

export function scoreToTier(score: number): RarityTier {
  if (score >= 90) return "legendary";
  if (score >= 70) return "epic";
  if (score >= 50) return "rare";
  if (score >= 25) return "uncommon";
  return "common";
}
