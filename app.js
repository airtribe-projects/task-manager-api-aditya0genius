const express = require('express');
const fs = require('fs/promises');
const bodyParser = require('body-parser');
const path = require("path");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let tasks = {};
let nextId = 1;

const FILE_PATH = path.join(__dirname, "task.json");

// Load tasks from file
async function loadTasks() {
    try {
      const data = await fs.readFile(FILE_PATH, "utf-8");
      const parsed = JSON.parse(data);
      parsed.tasks.forEach((task) => {
        tasks[task.id] = task;
        if (task.id >= nextId) nextId = task.id + 1;
      });
    } catch (err) {
      console.error("Error loading tasks.json:", err.message);
    }
  }
  
  // Save tasks to file
  async function saveTasks() {
    const tasksArray = Object.values(tasks);
    const json = JSON.stringify({ tasks: tasksArray }, null, 2);
    await fs.writeFile(FILE_PATH, json, "utf-8");
  }
  
  loadTasks();
  
  // Validation middleware
  function validateTask(req, res, next) {
    const { title, description, completed } = req.body;
    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof completed !== "boolean"
    ) {
      return res.status(400).json({ error: "Invalid task data" });
    }
    next();
  }
  
  // GET all tasks
  app.get("/tasks", (req, res) => {
    res.json(Object.values(tasks));
  });
  
  // GET a single task
  app.get("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks[id];
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  });
  
  // POST a new task
  app.post("/tasks", async (req, res) => {
    const { title, description, completed } = req.body;
  
    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof completed !== "boolean"
    ) {
      return res.status(400).json({ error: "Invalid task data" });
    }
  
    const newTask = {
      id: nextId++,
      title,
      description,
      completed,
    };
    tasks[newTask.id] = newTask;
    await saveTasks();
    res.status(201).json(newTask);
  });
  
  // PUT update task
  app.put("/tasks/:id", validateTask, async (req, res) => {
    const id = parseInt(req.params.id);
    if (!tasks[id]) return res.status(404).json({ error: "Task not found" });
  
    const { title, description, completed } = req.body;
    tasks[id] = { id, title, description, completed };
    await saveTasks();
    res.json(tasks[id]);
  });
  
  // DELETE a task
  app.delete("/tasks/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (!tasks[id]) return res.status(404).json({ error: "Task not found" });
  
    delete tasks[id];
    await saveTasks();
    res.json({ message: `Task ${id} deleted successfully.` });
  });

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });

  module.exports = app;