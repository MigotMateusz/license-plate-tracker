import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { hasActiveSubscription } from "@/lib/subscription";
import { z } from "zod";

const querySchema = z.object({
  country: z.string().default("US"),
  state: z.string().optional(),
  tier: z.enum(["common", "uncommon", "rare", "epic", "legendary"]).optional(),
  search: z.string().optional(),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().max(50).default(20),
});

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!(await hasActiveSubscription(session.user.id))) {
    return NextResponse.json({ error: "Subscription required" }, { status: 403 });
  }

  const params = Object.fromEntries(req.nextUrl.searchParams);
  const query = querySchema.safeParse(params);
  if (!query.success) {
    return NextResponse.json({ error: "Invalid query" }, { status: 400 });
  }

  const { country, state, tier, search, page, limit } = query.data;

  const countryRecord = await db.country.findUnique({ where: { code: country } });
  if (!countryRecord) {
    return NextResponse.json({ error: "Country not found" }, { status: 404 });
  }

  const where = {
    countryId: countryRecord.id,
    isAvailable: true,
    ...(state && { stateCode: state }),
    ...(tier && { rarityTier: tier as never }),
    ...(search && {
      plateString: { contains: search.toUpperCase() },
    }),
  };

  const [plates, total] = await Promise.all([
    db.availablePlate.findMany({
      where,
      orderBy: { rarityScore: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.availablePlate.count({ where }),
  ]);

  return NextResponse.json({ plates, total, page, limit });
}
