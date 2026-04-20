import express from "express";
import orderRoutes from "./routes/order.route.js";
import reportRoutes from "./routes/report.route.js";
import mockRoutes from "./routes/mock.route.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.use("/api/orders", orderRoutes);

app.use("/mock", mockRoutes);

app.use("/api/report", reportRoutes);

app.use(errorHandler);

export default app;
