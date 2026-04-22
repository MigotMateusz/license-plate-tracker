"use client";

import { RarityBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { timeAgo, formatPlate } from "@/lib/utils";
import { Eye, Plus, Check } from "lucide-react";
import { useState } from "react";

interface PlateCardProps {
  plate: {
    id: string;
    plateString: string;
    stateCode?: string | null;
    rarityScore: number;
    rarityTier: string;
    firstSeenAt: string | Date;
    isAvailable: boolean;
  };
  isWatched?: boolean;
  onWatch?: (plateString: string) => Promise<void>;
}

export function PlateCard({ plate, isWatched, onWatch }: PlateCardProps) {
  const [watching, setWatching] = useState(false);
  const [watched, setWatched] = useState(isWatched ?? false);

  async function handleWatch() {
    if (!onWatch || watched) return;
    setWatching(true);
    try {
      await onWatch(plate.plateString);
      setWatched(true);
    } finally {
      setWatching(false);
    }
  }

  return (
    <div className="group flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 px-5 py-4 transition-colors hover:border-zinc-700 hover:bg-zinc-900">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-24 items-center justify-center rounded-md border border-zinc-700 bg-zinc-950">
          <span className="font-mono text-lg font-bold tracking-widest text-zinc-100">
            {formatPlate(plate.plateString)}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <RarityBadge tier={plate.rarityTier} score={plate.rarityScore} />
            {plate.stateCode && (
              <span className="text-xs text-zinc-500">{plate.stateCode}</span>
            )}
          </div>
          <span className="text-xs text-zinc-600">
            seen {timeAgo(new Date(plate.firstSeenAt))}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {plate.isAvailable ? (
          <span className="flex items-center gap-1 text-xs text-green-400">
            <span className="size-1.5 rounded-full bg-green-400" />
            available
          </span>
        ) : (
          <span className="flex items-center gap-1 text-xs text-zinc-600">
            <span className="size-1.5 rounded-full bg-zinc-600" />
            taken
          </span>
        )}
        {onWatch && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleWatch}
            loading={watching}
            disabled={watched}
            className="opacity-0 group-hover:opacity-100"
          >
            {watched ? <Check className="size-3.5" /> : <Plus className="size-3.5" />}
            {watched ? "watching" : "watch"}
          </Button>
        )}
      </div>
    </div>
  );
}

export function PlateCardSkeleton() {
  return (
    <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 px-5 py-4">
      <div className="flex items-center gap-4">
        <div className="h-10 w-24 animate-pulse rounded-md bg-zinc-800" />
        <div className="flex flex-col gap-2">
          <div className="h-4 w-20 animate-pulse rounded bg-zinc-800" />
          <div className="h-3 w-16 animate-pulse rounded bg-zinc-800" />
        </div>
      </div>
      <div className="h-4 w-16 animate-pulse rounded bg-zinc-800" />
    </div>
  );
}
