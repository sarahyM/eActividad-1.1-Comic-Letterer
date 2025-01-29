"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Project } from "@/types/project";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Check, Edit2, Plus, Trash2 } from "lucide-react";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function TasksAndCorrections() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editedText, setEditedText] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/projects");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

const handleProjectSelect = (projectId: string) => {
  setSelectedProject(projectId);
  const project = projects.find((p) => p._id === projectId);
  if (project && project.tasks) {
    setTasks(
      project.tasks.map((task) => ({
        id: task._id, // Usa el _id del backend como id
        text: task.text,
        completed: task.completed,
      }))
    );
  }
};

const addTask = async () => {
  if (!newTask.trim() || !selectedProject) return;

  try {
    const response = await axios.post(
      `http://localhost:5000/api/projects/${selectedProject}/tasks`,
      {
        text: newTask,
        completed: false,
      }
    );

    // Usa el ID real del servidor
    setTasks([
      ...tasks,
      { id: response.data.id, text: newTask, completed: false },
    ]);
    setNewTask("");
    toast.success("Tarea añadida correctamente");
  } catch (error) {
    toast.error("Error al añadir tarea");
  }
};

  const toggleTask = async (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    try {
      await axios.patch(
        `http://localhost:5000/api/projects/${selectedProject}/tasks/${taskId}`,
        {
          completed: !task.completed,
        }
      );

      setTasks(
        tasks.map((t) =>
          t.id === taskId ? { ...t, completed: !t.completed } : t
        )
      );
    } catch (error) {
      toast.error("Error al actualizar la tarea");
    }
  };

  const startEditing = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setEditingTask(taskId);
      setEditedText(task.text);
    }
  };

const saveEdit = async (taskId: string) => {
  console.log("Updating task:", taskId, "in project:", selectedProject);

  try {
    await axios.patch(
      `http://localhost:5000/api/projects/${selectedProject}/tasks/${taskId}`,
      {
        text: editedText,
      }
    );

    setTasks(
      tasks.map((t) => (t.id === taskId ? { ...t, text: editedText } : t))
    );
    setEditingTask(null);
    toast.success("Tarea actualizada correctamente");
  } catch (error) {
    console.error("Error updating task:", error);
    toast.error("Failed to update task");
  }
};


  const deleteTask = async (taskId: string) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/projects/${selectedProject}/tasks/${taskId}`
      );
      setTasks(tasks.filter((t) => t.id !== taskId));
      toast.success("Tarea eliminada correctamente");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="rounded-xl bg-white/10 backdrop-blur-sm p-6 border border-white/20">
        <h2 className="text-2xl font-bangers text-white mb-6">
          Tareas y Correcciones
        </h2>

        <div className="space-y-6">
          <Select value={selectedProject} onValueChange={handleProjectSelect}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Seleccionar un proyecto" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project._id} value={project._id || ""}>
                  {project.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedProject && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-4"
            >
              <div className="flex gap-2">
                <Input
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Añadir nueva tarea o corrección"
                  className="bg-white/10 border-white/20 text-white placeholder-white"
                />
                <Button onClick={addTask} className="gap-2 text-white">
                  <Plus className="w-4 h-4 text-white" />
                  Añadir
                </Button>
              </div>

              <ul className="space-y-2">
                {tasks.map((task) => (
                  <motion.li
                    key={task.id || task._id} // Usa task._id si task.id no está definido
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 p-2 rounded-lg bg-white/5 group"
                  >
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id || task._id)}
                    />
                    {editingTask === task.id || editingTask === task._id ? (
                      <div className="flex-1 flex gap-2">
                        <Input
                          value={editedText}
                          onChange={(e) => setEditedText(e.target.value)}
                          className="bg-white/10 border-white/20 text-white"
                        />
                        <Button
                          onClick={() => saveEdit(task.id || task._id)}
                          size="sm"
                          className="bg-white/10 text-white hover:bg-green-300"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <label
                        className={`flex-1 text-white ${
                          task.completed ? "line-through opacity-50" : ""
                        }`}
                      >
                        {task.text}
                      </label>
                    )}
                    {editingTask !== task.id && editingTask !== task._id && (
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => startEditing(task.id || task._id)}
                          className="bg-white/10 text-white hover:bg-green-300"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteTask(task.id || task._id)}
                          className="bg-white/10 text-white hover:bg-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
