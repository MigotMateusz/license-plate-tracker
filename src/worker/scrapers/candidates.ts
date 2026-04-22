// Generates rare plate candidates to check availability for.
// Used by all state scrapers.

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const RARE_WORDS = [
  "ACE", "GOD", "VIP", "PRO", "TOP", "WIN", "ONE", "TWO", "SIX", "TEN",
  "ICE", "AIR", "SKY", "SUN", "MAX", "REX", "FOX", "ACE", "ZEN", "ZAP",
  "KING", "BOSS", "FIRE", "GOLD", "HERO", "STAR", "APEX", "EPIC", "NOVA",
  "BOLT", "DARK", "DAWN", "DUSK", "EDGE", "GLOW", "IRON", "JADE", "NEON",
  "VOID", "WAVE", "ZERO", "ZOOM",
];

export function generateCandidates(): string[] {
  const candidates = new Set<string>();

  // Single characters: A-Z, 1-9
  for (let c = 65; c <= 90; c++) candidates.add(String.fromCharCode(c));
  for (let i = 1; i <= 9; i++) candidates.add(String(i));

  // Two letters: AA–ZZ
  for (const a of LETTERS) {
    for (const b of LETTERS) {
      candidates.add(a + b);
    }
  }

  // Two digits: 10–99
  for (let i = 10; i <= 99; i++) candidates.add(String(i));

  // Three digits: 100–999 (low numbers only)
  for (let i = 100; i <= 199; i++) candidates.add(String(i));

  // Repeating digits: 111, 222 ... 999
  for (let i = 1; i <= 9; i++) candidates.add(String(i).repeat(3));
  for (let i = 1; i <= 9; i++) candidates.add(String(i).repeat(4));

  // Sequential: 123, 1234, 12345, 321, 4321, 234, 345, 456, 567, 678, 789
  ["123", "234", "345", "456", "567", "678", "789",
   "1234", "2345", "3456", "4567", "5678", "6789",
   "321", "4321", "9876", "007", "001", "000", "12345"].forEach(p => candidates.add(p));

  // Rare words
  for (const word of RARE_WORDS) candidates.add(word);

  // Three letters: AAA, BBB ... ZZZ
  for (const c of LETTERS) candidates.add(c.repeat(3));

  return [...candidates];
}
