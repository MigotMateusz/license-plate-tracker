import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import type Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      if (!userId || !session.subscription || !session.customer) break;

      const sub = await stripe.subscriptions.retrieve(
        session.subscription as string
      );

      await db.user.update({
        where: { id: userId },
        data: { stripeCustomerId: session.customer as string },
      });

      // Support both old snake_case and new camelCase Stripe API shapes
      const periodEnd =
        (sub as unknown as Record<string, unknown>).currentPeriodEnd ??
        (sub as unknown as Record<string, unknown>).current_period_end;

      await db.subscription.upsert({
        where: { userId },
        update: {
          stripeSubscriptionId: sub.id,
          stripePriceId: sub.items.data[0].price.id,
          status: sub.status as never,
          currentPeriodEnd: new Date(Number(periodEnd) * 1000),
        },
        create: {
          userId,
          stripeSubscriptionId: sub.id,
          stripePriceId: sub.items.data[0].price.id,
          status: sub.status as never,
          currentPeriodEnd: new Date(Number(periodEnd) * 1000),
        },
      });
      break;
    }

    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      const periodEnd =
        (sub as unknown as Record<string, unknown>).currentPeriodEnd ??
        (sub as unknown as Record<string, unknown>).current_period_end;
      const cancelAtEnd =
        (sub as unknown as Record<string, unknown>).cancelAtPeriodEnd ??
        (sub as unknown as Record<string, unknown>).cancel_at_period_end;

      await db.subscription.updateMany({
        where: { stripeSubscriptionId: sub.id },
        data: {
          status: sub.status as never,
          currentPeriodEnd: new Date(Number(periodEnd) * 1000),
          cancelAtPeriodEnd: Boolean(cancelAtEnd),
        },
      });
      break;
    }
  }

  return NextResponse.json({ received: true });
}
