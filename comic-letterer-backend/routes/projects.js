const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const mongoose = require("mongoose");

// Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new project
router.post("/", async (req, res) => {
  const project = new Project(req.body);
  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Ruta para eliminar un proyecto
router.delete("/:id", async (req, res) => {
  try {
    console.log("Deleting project with ID:", req.params.id);

    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      console.log("Project not found");
      return res.status(404).json({ message: "Project not found" });
    }

    console.log("Project deleted successfully");
    res.json({ message: "Project deleted" });
  } catch (err) {
    console.error("Error deleting project:", err);
    res.status(500).json({ message: err.message });
  }
});
// Update project progress
router.patch("/:id/progress", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    project.completedPages = req.body.completedPages;
    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add a task
router.post("/:id/tasks", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    project.tasks.push(req.body);
    const updatedProject = await project.save();
    res.status(201).json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a task
router.patch("/:id/tasks/:taskId", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const task = project.tasks.id(req.params.taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (req.body.text) task.text = req.body.text;
    if (typeof req.body.completed !== "undefined")
      task.completed = req.body.completed;

    await project.save();
    res.json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a task
router.delete("/:id/tasks/:taskId", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    project.tasks.pull(req.params.taskId);
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
