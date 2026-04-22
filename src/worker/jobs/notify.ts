import { Worker, Job } from "bullmq";
import IORedis from "ioredis";
import { Resend } from "resend";
import { db } from "@/lib/db";

const connection = new IORedis(process.env.REDIS_URL!, { maxRetriesPerRequest: null });
const resend = new Resend(process.env.RESEND_API_KEY!);

export function startNotifyWorker() {
  const worker = new Worker(
    "notify",
    async (job: Job) => {
      const { userId, watchedPlateId, plateString, countryId } = job.data;

      const [user, watchedPlate, plate] = await Promise.all([
        db.user.findUnique({ where: { id: userId } }),
        db.watchedPlate.findUnique({ where: { id: watchedPlateId } }),
        db.availablePlate.findFirst({ where: { countryId, plateString } }),
      ]);

      if (!user || !watchedPlate || !plate) return;

      // Dedup: skip if already notified in last 24h
      const recentNotification = await db.notification.findFirst({
        where: {
          userId,
          watchedPlateId,
          availablePlateId: plate.id,
          sentAt: { gte: new Date(Date.now() - 86400000) },
        },
      });
      if (recentNotification) return;

      if (watchedPlate.notifyEmail && user.email) {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL!,
          to: user.email,
          subject: `Plate ${plateString} is now available!`,
          html: `
            <h2>Your watched plate is available</h2>
            <p>The license plate <strong>${plateString}</strong> you're watching is now available.</p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/search?q=${plateString}">View it now</a>
          `,
        });
      }

      await db.notification.create({
        data: {
          userId,
          watchedPlateId,
          availablePlateId: plate.id,
          channel: watchedPlate.notifyEmail ? "email" : "push",
        },
      });
    },
    { connection }
  );

  worker.on("failed", (job, err) => {
    console.error(`Notify job ${job?.id} failed:`, err.message);
  });

  return worker;
}
