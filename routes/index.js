import express from "express";
import db from "../models/index.cjs";
import { authenticateToken, requireAdmin } from "../middleware/auth.js";

const { Task, User } = db;
const router = express.Router();

// Public route test
router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Protect all task endpoints below with JWT authentication
router.use(authenticateToken);

// GET /api/tasks (Returns tasks)
router.get("/tasks", async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
});

// POST /api/tasks (Create a task)
router.post("/tasks", async (req, res) => {
  const { title, completed } = req.body;
  const task = await Task.create({ title, completed });
  res.status(201).json(task);
});

// Example Admin-Only Route
router.get("/admin/users", requireAdmin, async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

export default router;