"use client"

import { motion } from "framer-motion"
import { ProjectCard } from "./ProjectCard"
import { useEffect, useState } from "react"
import axios from "axios"
import type { Project } from "@/types/project"
import { RocketIcon } from "lucide-react"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/projects")
        setProjects(response.data)
      } catch (error) {
        console.error("Error fetching projects:", error)
      }
    }

    fetchProjects()
  }, [])

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl bg-white/10 backdrop-blur-sm p-6 border border-white/20"
      >
        <div className="flex items-center gap-3 text-white mb-6">
          <RocketIcon className="w-6 h-6" />
          <h2 className="text-2xl font-bangers">Proyectos Activos</h2>
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.length === 0 ? (
            <p className="text-white/60 col-span-full text-center text-xl py-8">No se encontraron proyectos.</p>
          ) : (
            projects.map((project) => (
              <motion.div key={project._id} variants={item}>
                <ProjectCard
                  project={project}
                  onDelete={() => {
                    setProjects(projects.filter((p) => p._id !== project._id))
                  }}
                />
              </motion.div>
            ))
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}

