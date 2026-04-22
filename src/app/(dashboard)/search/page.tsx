"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { RarityBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPlate, rarityColor } from "@/lib/utils";
import { Plus, Check } from "lucide-react";

interface SearchResult {
  plateString: string;
  rarityScore: number;
  rarityTier: string;
  isAvailable: boolean;
  firstSeenAt: string | null;
  stateCode: string | null;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [watched, setWatched] = useState(false);
  const [watching, setWatching] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResult(null);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/plates/search?q=${encodeURIComponent(query)}`);
        if (!res.ok) return;
        const data = await res.json();
        setResult(data.results[0] ?? null);
        setWatched(false);
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  async function handleWatch() {
    if (!result) return;
    setWatching(true);
    try {
      await fetch("/api/watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plateString: result.plateString, countryCode: "US" }),
      });
      setWatched(true);
    } finally {
      setWatching(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <div className="mb-8">
        <h1 className="mb-1 text-xl font-bold">Search plates</h1>
        <p className="text-sm text-zinc-500">Check availability and rarity of any plate</p>
      </div>

      <div className="relative mb-8">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value.toUpperCase())}
          placeholder="Type a plate..."
          className="font-mono text-2xl tracking-widest h-16 text-center uppercase"
          maxLength={8}
          autoFocus
        />
        {loading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <span className="size-4 animate-spin rounded-full border border-zinc-500 border-t-transparent block" />
          </div>
        )}
      </div>

      {result && (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex h-14 w-32 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-950">
              <span className="font-mono text-2xl font-bold tracking-widest text-zinc-100">
                {formatPlate(result.plateString)}
              </span>
            </div>
            <div className="text-right">
              <div
                className={`text-3xl font-bold font-mono ${
                  result.rarityScore >= 90
                    ? "text-amber-400"
                    : result.rarityScore >= 70
                    ? "text-purple-400"
                    : result.rarityScore >= 50
                    ? "text-blue-400"
                    : result.rarityScore >= 25
                    ? "text-green-400"
                    : "text-zinc-400"
                }`}
              >
                {result.rarityScore}
              </div>
              <div className="text-xs text-zinc-500">rarity score</div>
            </div>
          </div>

          <div className="mb-4 flex items-center gap-3">
            <RarityBadge tier={result.rarityTier} />
            <span
              className={`flex items-center gap-1.5 text-sm ${
                result.isAvailable ? "text-green-400" : "text-zinc-500"
              }`}
            >
              <span
                className={`size-1.5 rounded-full ${
                  result.isAvailable ? "bg-green-400" : "bg-zinc-600"
                }`}
              />
              {result.isAvailable ? "Available now" : "Not currently available"}
            </span>
          </div>

          <div className="border-t border-zinc-800 pt-4">
            <Button
              variant={watched ? "ghost" : "outline"}
              onClick={handleWatch}
              loading={watching}
              disabled={watched}
            >
              {watched ? (
                <>
                  <Check className="size-4" /> Watching
                </>
              ) : (
                <>
                  <Plus className="size-4" />
                  {result.isAvailable ? "Watch anyway" : "Watch — alert me when available"}
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {!result && !loading && query.length === 0 && (
        <div className="py-16 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-600">
            Start typing to search
          </p>
        </div>
      )}
    </div>
  );
}
