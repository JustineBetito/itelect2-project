import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.message);

  // Catch Sequelize validation errors and send 400 Bad Request
  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({ error: err.errors.map((e) => e.message) });
  }

  const status = err.status || 500;
  res.status(status).json({ error: err.message });
});

// Start server directly without initUsersCache
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});