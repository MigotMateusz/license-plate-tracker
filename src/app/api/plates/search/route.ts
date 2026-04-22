import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { hasActiveSubscription } from "@/lib/subscription";
import { computeRarityScore, scoreToTier } from "@/lib/rarity";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!(await hasActiveSubscription(session.user.id))) {
    return NextResponse.json({ error: "Subscription required" }, { status: 403 });
  }

  const q = req.nextUrl.searchParams.get("q")?.toUpperCase() ?? "";
  if (!q || q.length < 1) {
    return NextResponse.json({ results: [] });
  }

  const country = await db.country.findUnique({ where: { code: "US" } });
  if (!country) return NextResponse.json({ results: [] });

  const existing = await db.availablePlate.findFirst({
    where: {
      countryId: country.id,
      plateString: q,
      isAvailable: true,
    },
  });

  const rarityScore = computeRarityScore(q);
  const rarityTier = scoreToTier(rarityScore);

  return NextResponse.json({
    results: [
      {
        plateString: q,
        rarityScore,
        rarityTier,
        isAvailable: !!existing,
        firstSeenAt: existing?.firstSeenAt ?? null,
        stateCode: existing?.stateCode ?? null,
      },
    ],
  });
}
