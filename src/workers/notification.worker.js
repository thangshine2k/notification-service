import { jobQueue } from "../queue/notification.queue.js";
import { sendEmail } from "../services/email.service.js";
import { logResult } from "../services/logger.service.js";

const MAX_RETRY = 3;

export const startWorker = () => {
  setInterval(async () => {
    if (jobQueue.length === 0) return;

    const job = jobQueue.shift();

    console.log("🚀 Processing job:", job.id);

    try {
      await sendEmail(job.email, job.message);

      await logResult({
        jobId: job.id,
        status: "SUCCESS",
      });

      console.log("✅ SUCCESS:", job.id);
    } catch (err) {
      console.log("❌ FAIL:", job.id, err.message);

      if (job.retry < MAX_RETRY) {
        job.retry++;
        jobQueue.push(job);
      } else {
        await logResult({
          jobId: job.id,
          status: "FAILED",
        });
      }
    }
  }, 100);
};
