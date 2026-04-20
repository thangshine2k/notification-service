import express from "express";
import { getReportHandler } from "../controllers/report.controller.js";

const router = express.Router();

router.get("/", getReportHandler);

export default router;
