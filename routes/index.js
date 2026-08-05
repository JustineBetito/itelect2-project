import express from "express";
import { createTask } from "../src/utils.js";
import { fetchSampleUsers } from "../src/api.js";

const router = express.Router();

const rawTasks = [
  createTask({ title: "Finish GT3", dueDate: "2026-07-22" }),
  createTask({ title: "Finish GT4", dueDate: "2026-07-29" }),
  createTask({ title: "Finish GT5", dueDate: "2026-08-05" }),
];

// Force explicit IDs 1, 2, 3
const tasks = rawTasks.map((task, index) => ({
  ...task,
  id: index + 1, // Forces IDs to be 1, 2, 3
}));

// Cache for users fetched at startup
let cachedUsers = [];

export async function initUsersCache() {
  cachedUsers = await fetchSampleUsers();
  console.log(`Cached ${cachedUsers.length} sample users.`);
}

// GET /api/tasks -> returns array of all tasks
router.get("/tasks", (req, res) => {
  res.json(tasks);
});

// GET /api/tasks/:id -> returns single task or 404
router.get("/tasks/:id", (req, res) => {
  // Use Number() to parse the URL parameter safely
  const taskId = Number(req.params.id);
  
  // Find the task matching the numeric ID
  const task = tasks.find((t) => Number(t.id) === taskId);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
});

// GET /api/users -> returns cached user list
router.get("/users", (req, res) => {
  res.json(cachedUsers);
});

export default router;

