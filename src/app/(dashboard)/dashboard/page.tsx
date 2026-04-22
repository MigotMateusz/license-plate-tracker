"use client";

import { useEffect, useState, useCallback } from "react";
import { PlateCard, PlateCardSkeleton } from "@/components/plates/plate-card";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const TIERS = ["", "legendary", "epic", "rare", "uncommon", "common"] as const;

interface Plate {
  id: string;
  plateString: string;
  stateCode?: string | null;
  rarityScore: number;
  rarityTier: string;
  firstSeenAt: string;
  isAvailable: boolean;
}

export default function DashboardPage() {
  const [plates, setPlates] = useState<Plate[]>([]);
  const [tier, setTier] = useState<typeof TIERS[number]>("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [watchedIds, setWatchedIds] = useState<Set<string>>(new Set());

  const fetchPlates = useCallback(async (tierFilter: string, pageNum: number, append = false) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(pageNum), limit: "20" });
      if (tierFilter) params.set("tier", tierFilter);

      const res = await fetch(`/api/plates?${params}`);
      if (!res.ok) return;

      const data = await res.json();
      setPlates((prev) => append ? [...prev, ...data.plates] : data.plates);
      setTotal(data.total);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setPage(1);
    fetchPlates(tier, 1);
  }, [tier, fetchPlates]);

  async function handleWatch(plateString: string) {
    await fetch("/api/watchlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plateString, countryCode: "US" }),
    });
    setWatchedIds((prev) => new Set([...prev, plateString]));
  }

  function loadMore() {
    const next = page + 1;
    setPage(next);
    fetchPlates(tier, next, true);
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Rare plates</h1>
          <p className="mt-0.5 text-sm text-zinc-500">
            {total.toLocaleString()} available plates
          </p>
        </div>
        <div className="flex items-center gap-2">
          {TIERS.map((t) => (
            <Button
              key={t || "all"}
              variant={tier === t ? "outline" : "ghost"}
              size="sm"
              onClick={() => setTier(t)}
              className="capitalize"
            >
              {t || "all"}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {loading && plates.length === 0
          ? Array.from({ length: 8 }).map((_, i) => <PlateCardSkeleton key={i} />)
          : plates.map((plate) => (
              <PlateCard
                key={plate.id}
                plate={plate}
                isWatched={watchedIds.has(plate.plateString)}
                onWatch={handleWatch}
              />
            ))}
      </div>

      {plates.length < total && (
        <div className="mt-6 flex justify-center">
          <Button variant="ghost" onClick={loadMore} loading={loading}>
            <ChevronDown className="size-4" />
            Load more
          </Button>
        </div>
      )}

      {!loading && plates.length === 0 && (
        <div className="py-16 text-center text-zinc-600">
          No plates match this filter yet.
        </div>
      )}
    </div>
  );
}
