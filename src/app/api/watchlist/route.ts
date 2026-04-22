import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { hasActiveSubscription } from "@/lib/subscription";
import { z } from "zod";

const addSchema = z.object({
  plateString: z.string().min(1).max(8),
  countryCode: z.string().default("US"),
  stateCode: z.string().optional(),
  notifyEmail: z.boolean().default(true),
  notifyPush: z.boolean().default(false),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const watchlist = await db.watchedPlate.findMany({
    where: { userId: session.user.id },
    include: { country: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ watchlist });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!(await hasActiveSubscription(session.user.id))) {
    return NextResponse.json({ error: "Subscription required" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = addSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { plateString, countryCode, stateCode, notifyEmail, notifyPush } = parsed.data;

  const country = await db.country.findUnique({ where: { code: countryCode } });
  if (!country) {
    return NextResponse.json({ error: "Country not found" }, { status: 404 });
  }

  const existing = await db.watchedPlate.count({ where: { userId: session.user.id } });
  if (existing >= 50) {
    return NextResponse.json({ error: "Watchlist limit reached (50)" }, { status: 429 });
  }

  const watch = await db.watchedPlate.upsert({
    where: {
      userId_countryId_stateCode_plateString: {
        userId: session.user.id,
        countryId: country.id,
        stateCode: stateCode ?? "",
        plateString: plateString.toUpperCase(),
      },
    },
    update: { notifyEmail, notifyPush },
    create: {
      userId: session.user.id,
      countryId: country.id,
      stateCode,
      plateString: plateString.toUpperCase(),
      notifyEmail,
      notifyPush,
    },
  });

  return NextResponse.json(watch, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await db.watchedPlate.deleteMany({
    where: { id, userId: session.user.id },
  });

  return NextResponse.json({ success: true });
}
