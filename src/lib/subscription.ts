import { db } from "@/lib/db";

export async function hasActiveSubscription(userId: string): Promise<boolean> {
  if (process.env.NODE_ENV === "development") return true;

  const sub = await db.subscription.findUnique({ where: { userId } });
  return sub?.status === "active";
}
