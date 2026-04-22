import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { BillingButton } from "./billing-button";

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const [user, subscription] = await Promise.all([
    db.user.findUnique({
      where: { id: session.user.id },
      select: { email: true, name: true, createdAt: true },
    }),
    db.subscription.findUnique({
      where: { userId: session.user.id },
    }),
  ]);

  const isActive = subscription?.status === "active";

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <h1 className="mb-8 text-xl font-bold">Account</h1>

      <div className="space-y-4">
        <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <h2 className="mb-4 text-sm font-medium text-zinc-400">Profile</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-500">Email</span>
              <span className="font-mono text-sm text-zinc-200">{user?.email}</span>
            </div>
            {user?.name && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">Name</span>
                <span className="text-sm text-zinc-200">{user.name}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-500">Member since</span>
              <span className="text-sm text-zinc-400">
                {user?.createdAt?.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <h2 className="mb-4 text-sm font-medium text-zinc-400">Subscription</h2>
          {isActive ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">Status</span>
                <span className="flex items-center gap-1.5 text-sm text-green-400">
                  <span className="size-1.5 rounded-full bg-green-400" />
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">Renews</span>
                <span className="text-sm text-zinc-400">
                  {subscription?.currentPeriodEnd.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              {subscription?.cancelAtPeriodEnd && (
                <p className="text-xs text-amber-400">
                  Cancels at end of billing period
                </p>
              )}
              <div className="pt-1">
                <BillingButton />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-zinc-500">No active subscription</p>
              <BillingButton isNew />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
