"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import type { Project } from "@/types/project";
import axios from "axios";
import { format } from "date-fns";
import { es } from "date-fns/locale"; // Importa la localización en español
import { Badge } from "@/components/ui/badge";

export default function ProjectCalendar() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

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

  const getDayProjects = (day: Date) => {
    return projects.filter((project) => {
      const deadline = new Date(project.deadline);
      return format(deadline, "yyyy-MM-dd") === format(day, "yyyy-MM-dd");
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-xl bg-white/10 backdrop-blur-sm p-6 border border-white/20">
          <h2 className="text-2xl font-bangers text-white mb-6">
            Fechas de entrega
          </h2>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border bg-white/10 text-white"
            modifiers={{
              deadline: projects.map((project) => new Date(project.deadline)),
            }}
            modifiersStyles={{
              deadline: {
                color: "white",
                backgroundColor: "rgba(239, 68, 68, 0.5)",
              },
            }}
          />
        </div>

        <div className="rounded-xl bg-white/10 backdrop-blur-sm p-6 border border-white/20">
          <h2 className="text-2xl font-bangers text-white mb-6">
            Fechas de entrega para el{" "}
            {format(selectedDate || new Date(), "d 'de' MMMM 'de' yyyy", {
              locale: es,
            })}
          </h2>
          <div className="space-y-4">
            {selectedDate &&
              getDayProjects(selectedDate).map((project) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 rounded-lg bg-white/5 border border-white/10 text-white"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bangers text-white">
                        {project.title}
                      </h3>
                      <p className="text-white/60 text-sm">{project.client}</p>
                    </div>
                    <Badge variant="destructive">
                      {format(new Date(project.deadline), "PP", { locale: es })}
                    </Badge>
                  </div>
                  <div className="mt-2">
                    <p className="text-white/80 text-sm">
                      {project.completedPages} de {project.totalPages} paginas
                      completadas
                    </p>
                  </div>
                </motion.div>
              ))}
            {selectedDate && getDayProjects(selectedDate).length === 0 && (
              <p className="text-white/60 text-center py-4">
                Nada que entregar para esta fecha.
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
