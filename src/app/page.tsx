import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RarityBadge } from "@/components/ui/badge";
import { formatPlate } from "@/lib/utils";

const examplePlates = [
  { plate: "007", tier: "legendary", score: 95 },
  { plate: "ACE", tier: "epic", score: 78 },
  { plate: "123", tier: "rare", score: 55 },
  { plate: "XYZ99", tier: "uncommon", score: 28 },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-900 px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <span className="font-mono text-sm font-bold tracking-wider">PLATEHUNT</span>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Get started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6">
        <div className="py-24 text-center">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-zinc-500">
            License plate availability tracker
          </p>
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-zinc-100">
            Get the plate
            <br />
            you actually want.
          </h1>
          <p className="mx-auto mb-10 max-w-md text-zinc-400">
            We monitor DMV systems and alert you the moment a rare or custom
            plate becomes available — so you never miss it.
          </p>
          <Link href="/register">
            <Button size="lg">Start watching plates</Button>
          </Link>
        </div>

        <div className="pb-24">
          <p className="mb-6 text-center font-mono text-xs uppercase tracking-widest text-zinc-600">
            Example rare plates
          </p>
          <div className="mx-auto max-w-lg space-y-3">
            {examplePlates.map(({ plate, tier, score }) => (
              <div
                key={plate}
                className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 px-5 py-4"
              >
                <div className="flex h-10 w-24 items-center justify-center rounded-md border border-zinc-700 bg-zinc-950">
                  <span className="font-mono text-lg font-bold tracking-widest">
                    {formatPlate(plate)}
                  </span>
                </div>
                <RarityBadge tier={tier} score={score} />
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-zinc-900 py-24 text-center" id="pricing">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-zinc-500">
            Pricing
          </p>
          <h2 className="mb-12 text-3xl font-bold">Simple, flat rate.</h2>
          <div className="mx-auto max-w-xs rounded-2xl border border-zinc-700 bg-zinc-900 p-8">
            <p className="mb-1 text-4xl font-bold">$9</p>
            <p className="mb-6 text-sm text-zinc-500">per month</p>
            <ul className="mb-8 space-y-2 text-left text-sm text-zinc-400">
              {[
                "Real-time plate availability alerts",
                "Search any plate instantly",
                "Watchlist up to 50 plates",
                "Email notifications",
                "US support (more countries soon)",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> {f}
                </li>
              ))}
            </ul>
            <Link href="/register">
              <Button className="w-full" size="md">
                Get started
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
