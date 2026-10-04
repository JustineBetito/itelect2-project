import db from "../models/index.cjs";

const { Task } = db;

// GET /api/tasks
export async function getTasks(req, res) {
  const tasks = await Task.findAll();
  res.json(tasks);
}

// POST /api/tasks
export async function createTask(req, res) {
  const { title, dueDate, completed } = req.body;
  const currentUserId = req.user?.id || req.user?.userId;

  const task = await Task.create({
    title,
    dueDate,
    completed,
    userId: currentUserId
  });

  res.status(201).json(task);
}

// PUT /api/tasks/:id
export async function updateTask(req, res) {
  const { id } = req.params;
  const { title, dueDate, completed } = req.body;

  const task = await Task.findByPk(id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  await task.update({ title, dueDate, completed });
  res.json(task);
}

// DELETE /api/tasks/:id
export async function deleteTask(req, res) {
  const { id } = req.params;

  const task = await Task.findByPk(id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  await task.destroy();
  res.json({ message: "Task deleted successfully" });
}