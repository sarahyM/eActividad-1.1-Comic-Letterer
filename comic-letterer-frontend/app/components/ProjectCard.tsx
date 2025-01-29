"use client";

import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import type { Project } from "@/types/project";
import { Calendar, Clock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "react-hot-toast";

interface ProjectCardProps {
  project: Project;
  onDelete: () => void;
}

export function ProjectCard({ project, onDelete }: ProjectCardProps) {
  const progress = (project.completedPages / project.totalPages) * 100;

const handleDelete = async () => {
  if (window.confirm("¿Está seguro de que desea eliminar este proyecto?")) {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/projects/${project._id}`
      );
      if (response.status === 200) {
        toast.success("Proyecto eliminado con éxito");
        onDelete();
      } else {
        toast.error("No se ha podido eliminar el proyecto");
      }
    } catch (error) {
      toast.error("No se ha podido eliminar el proyecto");
      console.error("Error eliminando el proyecto:", error);
    }
  }
};

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="group relative h-[400px] perspective-1000"
    >
      <motion.div
        className="relative h-full w-full duration-500 preserve-3d"
        whileHover={{ rotateY: 180 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 backface-hidden rounded-xl bg-gradient-to-br from-[#cdcdfc] via-[#fac2e0] to-[#cdcdfc] p-1 backdrop-blur-sm"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="h-full w-full rounded-lg bg-black/10 p-6 text-white">
            <div className="flex h-full flex-col">
              <div className="relative h-48 w-full overflow-hidden rounded-lg">
                <img
                  src={
                    project.coverImage ||
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5JiVEW4JWtWUMLcNm3iZ7U1Z6nDPtd.png"
                  }
                  alt={project.title}
                  className="h-full w-full object-cover transform transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <h3
                className="mt-4 text-2xl font-bangers tracking-wide"
                style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}
              >
                {project.title}
              </h3>
              <div className="mt-4 flex-1">
                <Progress value={progress} className="h-2 bg-white/20" />
                <p className="mt-2 text-lg">{progress.toFixed(0)}% Completado</p>
              </div>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 backface-hidden rounded-xl bg-gradient-to-br from-[#9a9ad1] via-[#f08bb0] to-[#9a9ad1] p-1 backdrop-blur-sm"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="h-full w-full rounded-lg bg-black/10 p-6 text-white">
            <h3 className="text-xl font-bangers tracking-wide mb-4">
              Detalles del proyecto
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-pink-300" />
                <div>
                  <p className="text-lg text-white/60">Fecha de entrega</p>
                  <p>{format(new Date(project.deadline), "PP")}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-300" />
                <div>
                  <p className="text-lg text-white/60">Paginas restantes</p>
                  <p>
                    {project.totalPages - project.completedPages} páginas
                  </p>
                </div>
              </div>
              <div>
                <p className="text-lg text-white/60 mb-1">Progreso</p>
                <p>
                  {project.completedPages} de {project.totalPages} páginas
                </p>
              </div>
              <div>
                <p className="text-lg text-white/60 mb-1">Cliente</p>
                <p>{project.client}</p>
              </div>
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
