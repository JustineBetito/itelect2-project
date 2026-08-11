import express from "express";
import { createTask, validateTask, mergeTaskUpdate } from "../src/utils.js";
import { fetchSampleUsers } from "../src/api.js";

const router = express.Router();

const rawTasks = [
  createTask({ title: "Finish GT3", dueDate: "2026-07-22" }),
  createTask({ title: "Finish GT4", dueDate: "2026-07-29" }),
  createTask({ title: "Finish GT5", dueDate: "2026-08-05" }),
];


const tasks = rawTasks.map((task, index) => ({
  ...task,
  id: index + 1,
}));

let nextId = tasks.length + 1; 


let cachedUsers = [];

export async function initUsersCache() {
  cachedUsers = await fetchSampleUsers();
  console.log(`Cached ${cachedUsers.length} sample users.`);
}


router.get("/tasks", (req, res) => {
  res.json(tasks);
});


router.get("/tasks/:id", (req, res, next) => {
  const taskId = Number(req.params.id);
  const task = tasks.find((t) => Number(t.id) === taskId);

  if (!task) {
    const err = new Error("Task not found");
    err.status = 404;
    return next(err);
  }

  res.json(task);
});


router.get("/users", (req, res) => {
  res.json(cachedUsers);
});


router.post("/tasks", (req, res, next) => {
  if (!validateTask(req.body)) {
    const err = new Error("title and dueDate required");
    err.status = 400;
    return next(err);
  }

  const newTask = {
    id: nextId++,
    completed: false,
    ...req.body,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});


router.put("/tasks/:id", (req, res, next) => {
  const taskId = Number(req.params.id);
  const index = tasks.findIndex((t) => Number(t.id) === taskId);

  if (index === -1) {
    const err = new Error("Task not found");
    err.status = 404;
    return next(err);
  }

  tasks[index] = mergeTaskUpdate(tasks[index], req.body);
  res.status(200).json(tasks[index]);
});


router.delete("/tasks/:id", (req, res, next) => {
  const taskId = Number(req.params.id);
  const index = tasks.findIndex((t) => Number(t.id) === taskId);

  if (index === -1) {
    const err = new Error("Task not found");
    err.status = 404;
    return next(err);
  }

  const [removed] = tasks.splice(index, 1);
  res.status(200).json({ message: "Deleted", task: removed });
});

export default router;