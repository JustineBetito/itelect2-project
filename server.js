import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3000;

const secret = process.env.JWT_SECRET;
if (!secret || secret.length < 32) {
  console.error("JWT_SECRET in env must be at least 32 characters.");
  process.exit(1);
}

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Public health check route
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Router mounts
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Error handling middleware (must be mounted last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Task Manager API running on port ${PORT}`);
});