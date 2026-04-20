import express from "express";

const router = express.Router();

router.get("/external/:userId", async (req, res) => {
  const delay = Math.floor(Math.random() * 3000) + 2000;

  await new Promise((r) => setTimeout(r, delay));

  const stats = {
    1: { activity_count: 42 },
    2: { activity_count: 31 },
    3: { activity_count: 17 },
  };

  res.json(stats[req.params.userId] || { activity_count: 0 });
});

export default router;
