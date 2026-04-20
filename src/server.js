import app from "./app.js";
import { startWorker } from "./workers/notification.worker.js";

const PORT = 3000;

startWorker();
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
