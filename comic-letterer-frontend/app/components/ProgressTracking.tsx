"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
import { Check, Clock } from "lucide-react";

export default function ProgressTracking() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [completedPages, setCompletedPages] = useState<number>(0);
  const [tasks, setTasks] = useState([]);

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

  const handleUpdateProgress = async () => {
    try {
      const project = projects.find((p) => p._id === selectedProject);
      if (!project) return;

      await axios.patch(
        `http://localhost:5000/api/projects/${selectedProject}/progress`,
        {
          completedPages,
        }
      );

      toast.success("Progreso actualizado exitosamente");
      fetchProjects();
    } catch (error) {
      toast.error("Failed to update progress");
      console.error("Error updating progress:", error);
    }
  };

  const currentProject = projects.find((p) => p._id === selectedProject);
  const progress = currentProject
    ? (completedPages / currentProject.totalPages) * 100
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="rounded-xl bg-white/10 backdrop-blur-sm p-6 border border-white/20">
        <h2 className="text-2xl font-bangers text-white mb-6 flex items-center gap-2">
          <Clock className="w-6 h-6" />
          Actualizar el progreso del proyecto
        </h2>

        <div className="space-y-6">
          <div className="grid gap-4">
            <Label htmlFor="project" className="text-white text-xl">
              Seleccionar proyecto
            </Label>
            <Select value={selectedProject} onValueChange={handleProjectSelect}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project._id} value={project._id || ""}>
                    {project.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {currentProject && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-6"
            >
              <div className="grid gap-4">
                <Label htmlFor="completedPages" className="text-white">
                  Completed Pages
                </Label>
                <div className="flex gap-4">
                  <Input
                    id="completedPages"
                    type="number"
                    min="0"
                    max={currentProject.totalPages}
                    value={completedPages}
                    onChange={(e) => setCompletedPages(Number(e.target.value))}
                    className="bg-white/10 border-white/20 text-white"
                  />
                  <Button onClick={handleUpdateProgress} className="gap-2">
                    <Check className="w-4 h-4" />
                    Actualizar
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-white">
                  <span>Progress</span>
                  <span>{progress.toFixed(0)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                <p className="text-white/60 text-sm">
                  {currentProject.totalPages - completedPages} pages remaining
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-lg bg-white/5 p-4">
                  <p className="text-white/60 text-sm">Total Pages</p>
                  <p className="text-2xl font-bangers text-white">
                    {currentProject.totalPages}
                  </p>
                </div>
                <div className="rounded-lg bg-white/5 p-4">
                  <p className="text-white/60 text-sm">Completed</p>
                  <p className="text-2xl font-bangers text-white">
                    {completedPages}
                  </p>
                </div>
                <div className="rounded-lg bg-white/5 p-4">
                  <p className="text-white/60 text-sm">Remaining</p>
                  <p className="text-2xl font-bangers text-white">
                    {currentProject.totalPages - completedPages}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
