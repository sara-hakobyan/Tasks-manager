import React, { useState } from "react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import AddTaskForm from "../components/AddTaskForm";
import TaskList from "../components/TaskList";

export const Home = () => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="p-2 lg:p-6 max-w-xl mx-auto">
      <div className="text-center mb-6 relative">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <span className="text-4xl">📝</span>
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            Task Manager
          </span>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <Info size={20} color="orange" />
          </button>
        </h1>
        {showInfo && (
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 mt-2 p-2 bg-gray-800 text-white text-sm rounded shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            If you reload the page, all changes will be lost.
          </motion.div>
        )}
      </div>
      <AddTaskForm />
      <TaskList />
    </div>
  );
};
