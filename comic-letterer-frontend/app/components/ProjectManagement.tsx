"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import toast from "react-hot-toast";
import { FileUp, Plus } from "lucide-react";

export default function ProjectManagement() {
  const [formData, setFormData] = useState({
    title: "",
    client: "",
    startDate: "",
    deadline: "",
    totalPages: "",
    coverImage: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/projects", formData);
      toast.success("Proyecto creado exitosamente!");
      setFormData({
        title: "",
        client: "",
        startDate: "",
        deadline: "",
        totalPages: "",
        coverImage: "",
      });
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-2xl"
    >
      <div className="rounded-xl bg-white/10 backdrop-blur-sm p-6 border border-white/20">
        <div className="flex items-center gap-3 text-white mb-6">
          <Plus className="w-6 h-6" />
          <h2 className="text-2xl font-bangers">Añadir un nuevo proyecto</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-white text-xl">
                Título
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="bg-white/10 border-white/20 text-white"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="client" className="text-white text-xl">
                Cliente
              </Label>
              <Input
                id="client"
                value={formData.client}
                onChange={(e) =>
                  setFormData({ ...formData, client: e.target.value })
                }
                className="bg-white/10 border-white/20 text-white"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startDate" className="text-white text-xl">
                  Fecha de inicio
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  className="bg-white/10 border-white/20 text-white"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="deadline" className="text-white text-xl">
                  Fecha de entrega
                </Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) =>
                    setFormData({ ...formData, deadline: e.target.value })
                  }
                  className="bg-white/10 border-white/20 text-white"
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="totalPages" className="text-white text-xl">
                Páginas Totales
              </Label>
              <Input
                id="totalPages"
                type="number"
                value={formData.totalPages}
                onChange={(e) =>
                  setFormData({ ...formData, totalPages: e.target.value })
                }
                className="bg-white/10 border-white/20 text-white"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="coverImage" className="text-white text-xl">
                Imagen identificativa (opcional)
              </Label>
              <div className="flex gap-2">
                <Input
                  id="coverImage"
                  type="url"
                  value={formData.coverImage}
                  onChange={(e) =>
                    setFormData({ ...formData, coverImage: e.target.value })
                  }
                  className="bg-white/10 border-white/20 text-white placeholder-white flex-1"
                  placeholder="https://ejemplo.com/image.jpg"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="shrink-0 text-white"
                >
                  <FileUp className="h-4 w-4 text-white" />
                </Button>
              </div>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full text-white bg-white/40 text-xl"
            style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}
          >
            Añadir proyecto
          </Button>
        </form>
      </div>
    </motion.div>
  );
}
