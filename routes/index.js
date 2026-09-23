import express from "express";
import db from "../models/index.cjs";
import verifyToken from "../middleware/verifyToken.js";
import requireRole from "../middleware/requireRole.js";

const { Task, User } = db;
const router = express.Router();

// Public route test
router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// GET /api/tasks -- anyone can view tasks
router.get("/tasks", async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
});

// POST /api/tasks -- logged-in users (member or admin)
router.post("/tasks", verifyToken, async (req, res) => {
  const { title, completed } = req.body;
  const task = await Task.create({ title, completed });
  res.status(201).json(task);
});

// PUT /api/tasks/:id -- logged-in users (member or admin)
router.put("/tasks/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  
  const task = await Task.findByPk(id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  await task.update({ title, completed });
  res.json(task);
});

// DELETE /api/tasks/:id -- admin only
router.delete("/tasks/:id", verifyToken, requireRole("admin"), async (req, res) => {
  const { id } = req.params;
  
  const task = await Task.findByPk(id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  await task.destroy();
  res.json({ message: "Task deleted successfully" });
});

// Example Admin-Only Route
router.get("/admin/users", verifyToken, requireRole("admin"), async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

export default router;