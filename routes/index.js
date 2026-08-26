import express from "express";
import db from "../models/index.cjs";

const { Task, User } = db;
const router = express.Router();

// 1. GET /api/tasks -> Returns all tasks with their owning User (JOIN query)
router.get("/tasks", async (req, res) => {
  const tasks = await Task.findAll({
    include: User,
    order: [["id", "ASC"]]
  });
  res.json(tasks);
});

// 2. GET /api/tasks/:id -> Returns one task by ID with its owning User
router.get("/tasks/:id", async (req, res) => {
  const task = await Task.findByPk(req.params.id, { include: User });
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.json(task);
});

// 3. POST /api/tasks -> Creates a new task in PostgreSQL
router.post("/tasks", async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
});

// 4. PUT /api/tasks/:id -> Updates an existing task
router.put("/tasks/:id", async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  await task.update(req.body);
  res.json(task);
});

// 5. DELETE /api/tasks/:id -> Deletes a task by ID
router.delete("/tasks/:id", async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  await task.destroy();
  res.json({ message: "Deleted", task });
});

// 6. GET /api/users -> Returns all users from PostgreSQL
router.get("/users", async (req, res) => {
  const users = await User.findAll({
    order: [["id", "ASC"]]
  });
  res.json(users);
});

export default router;