import { cn, rarityColor } from "@/lib/utils";

interface BadgeProps {
  tier: string;
  score?: number;
  className?: string;
}

export function RarityBadge({ tier, score, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-mono font-medium uppercase tracking-wider",
        rarityColor(tier),
        className
      )}
    >
      {score !== undefined && <span className="opacity-60">{score}</span>}
      {tier}
    </span>
  );
}

interface PillProps {
  children: React.ReactNode;
  className?: string;
}

export function Pill({ children, className }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        className
      )}
    >
      {children}
    </span>
  );
}
