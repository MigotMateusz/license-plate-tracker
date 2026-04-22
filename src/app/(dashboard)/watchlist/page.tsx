"use client";

import { useEffect, useState } from "react";
import { formatPlate, timeAgo } from "@/lib/utils";
import { RarityBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { computeRarityScore, scoreToTier } from "@/lib/rarity";
import { Trash2 } from "lucide-react";

interface WatchedPlate {
  id: string;
  plateString: string;
  stateCode?: string | null;
  notifyEmail: boolean;
  createdAt: string;
  country: { code: string; name: string };
}

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<WatchedPlate[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/watchlist")
      .then((r) => r.json())
      .then((d) => setWatchlist(d.watchlist ?? []))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: string) {
    setDeleting(id);
    await fetch(`/api/watchlist?id=${id}`, { method: "DELETE" });
    setWatchlist((prev) => prev.filter((w) => w.id !== id));
    setDeleting(null);
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-8">
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl bg-zinc-900" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-xl font-bold">Watchlist</h1>
        <p className="mt-0.5 text-sm text-zinc-500">
          {watchlist.length} / 50 plates watched
        </p>
      </div>

      {watchlist.length === 0 ? (
        <div className="py-16 text-center text-zinc-600">
          <p className="font-mono text-xs uppercase tracking-widest">No plates watched</p>
          <p className="mt-2 text-sm">Search for a plate and click Watch to add it here.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {watchlist.map((item) => {
            const score = computeRarityScore(item.plateString);
            const tier = scoreToTier(score);
            return (
              <div
                key={item.id}
                className="group flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 px-5 py-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-24 items-center justify-center rounded-md border border-zinc-700 bg-zinc-950">
                    <span className="font-mono text-lg font-bold tracking-widest text-zinc-100">
                      {formatPlate(item.plateString)}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <RarityBadge tier={tier} score={score} />
                      <span className="text-xs text-zinc-500">{item.country.code}</span>
                      {item.stateCode && (
                        <span className="text-xs text-zinc-600">{item.stateCode}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-600">
                      <span>watched {timeAgo(new Date(item.createdAt))}</span>
                      {item.notifyEmail && (
                        <span className="text-zinc-700">· email alerts on</span>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                  loading={deleting === item.id}
                  className="opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-red-400"
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
