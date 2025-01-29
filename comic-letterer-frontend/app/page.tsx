"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dashboard from "./components/Dashboard";
import ProjectManagement from "./components/ProjectManagement";
import ProgressTracking from "./components/ProgressTracking";
import TasksAndCorrections from "./components/TasksAndCorrections";
import ProjectCalendar from "./components/ProjectCalendar";
import StyleGallery from "./components/StyleGallery";
import Metrics from "./components/Metrics";
import { WaveBackground } from "@/components/ui/wave-background";

export default function ComicLettererDashboard() {
  const [activeTab, setActiveTab] = useState("inicio"); 

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400">
      <WaveBackground className="absolute inset-0" />
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto p-4"
        >
          <header className="mb-8 text-center">
            <motion.h1
              className="text-9xl font-bangers mb-2 text-white drop-shadow-lg"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
            >
              Comic Letterer Dashboard
            </motion.h1>
            <p className="text-white/80 font-comic text-4xl">¡Organízate!</p>
          </header>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-8"
          >
            <TabsList className="grid w-full grid-cols-5 gap-2 bg-white/20 p-0 rounded-xl backdrop-blur-sm">
              {["Inicio", "Proyectos", "Progreso", "Tareas", "Calendario"].map(
                (tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab.toLowerCase()} // Esto genera valores como "inicio", "proyectos", etc.
                    className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-purple-800 text-white text-xl transition-all"
                  >
                    {tab}
                  </TabsTrigger>
                )
              )}
            </TabsList>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative z-10"
            >
              <TabsContent value="inicio">
                <Dashboard />
              </TabsContent>
              <TabsContent value="proyectos">
                <ProjectManagement />
              </TabsContent>
              <TabsContent value="progreso">
                <ProgressTracking />
              </TabsContent>
              <TabsContent value="tareas">
                <TasksAndCorrections />
              </TabsContent>
              <TabsContent value="calendario">
                <ProjectCalendar />
              </TabsContent>
              <TabsContent value="styles">
                <StyleGallery />
              </TabsContent>
              <TabsContent value="metrics">
                <Metrics />
              </TabsContent>
            </motion.div>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
