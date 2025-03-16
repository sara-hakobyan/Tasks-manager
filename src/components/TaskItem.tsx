import React from "react";
import { useTasks } from "../hooks/useTasks";
import { Task } from "../store/tasksSlice";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

const TaskItem = ({
  task,
  index,
  tasksLimit,
}: {
  task: Task;
  index: number;
  tasksLimit: number;
}) => {
  const { toggle, remove } = useTasks();

  return (
    <React.Fragment>
      <motion.tr
        key={task.id}
        className="border-t hover:bg-gray-100 transition duration-300"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{
          opacity: 0,
          x: -20,
          transition: { duration: 0.4, ease: "easeInOut" },
        }}
        transition={{
          delay:
            index >= tasksLimit - 10 ? (index - (tasksLimit - 10)) * 0.1 : 0,
          duration: 0.4,
          ease: "easeOut",
        }}
      >
        <td className="p-4 text-center">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggle(task.id)}
            className="w-5 h-5 cursor-pointer"
          />
        </td>
        <td
          className={`p-4 text-gray-700 font-medium ${
            task.completed ? "line-through !text-gray-400" : ""
          }`}
        >
          {task.title}
        </td>
        <td className="p-4">
          <span
            className={`w-3 h-3 inline-block rounded-full text-sm ${
              !task.completed ? "bg-yellow-500" : "bg-green-500"
            }`}
          >
            {task.completed}
          </span>
        </td>
        <td className="p-4">
          <motion.button
            onClick={() => remove(task.id)}
            className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Trash2 size={18} />
          </motion.button>
        </td>
      </motion.tr>
    </React.Fragment>
  );
};

export default TaskItem;
