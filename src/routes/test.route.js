// routes/test.route.js
import express from "express";
import { addJob } from "../queue/notification.queue.js";

const router = express.Router();

router.get("/load", (req, res) => {
  for (let i = 0; i < 1000; i++) {
    addJob({
      email: "thangshine2k@mail.com",
      message: `Order ${i}`,
    });
  }

  res.json({ message: "1000 jobs added" });
});

export default router;