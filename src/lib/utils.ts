import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function rarityColor(tier: string) {
  const colors: Record<string, string> = {
    common: "text-zinc-400 bg-zinc-400/10",
    uncommon: "text-green-400 bg-green-400/10",
    rare: "text-blue-400 bg-blue-400/10",
    epic: "text-purple-400 bg-purple-400/10",
    legendary: "text-amber-400 bg-amber-400/10",
  };
  return colors[tier] ?? colors.common;
}

export function rarityLabel(score: number): string {
  if (score >= 90) return "legendary";
  if (score >= 70) return "epic";
  if (score >= 50) return "rare";
  if (score >= 25) return "uncommon";
  return "common";
}

export function formatPlate(plate: string) {
  return plate.toUpperCase();
}

export function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}
