import express from "express";
import router, { initUsersCache } from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Mount router under /api
app.use("/api", router);

// Pre-fetch users and start the server
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

// Call startServer to launch the application
startServer();