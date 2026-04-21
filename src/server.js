import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { startWorker } from "./workers/notification.worker.js";
import { initMailer } from "./services/email.service.js";

initMailer();
const PORT = 3000;

startWorker();

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});