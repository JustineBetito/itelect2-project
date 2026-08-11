import express from "express";
import cors from "cors";
import morgan from "morgan";
import router, { initUsersCache } from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(morgan("dev"));
app.use(express.json());


app.use("/api", router);


app.use((err, req, res, next) => {
  console.error(err.message);
  const status = err.status || 500;
  res.status(status).json({ error: err.message });
});


async function startServer() {
  try {
    await initUsersCache();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
  }
}


startServer();