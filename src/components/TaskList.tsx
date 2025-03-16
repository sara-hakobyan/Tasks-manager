import { useCallback, useEffect, useState } from "react";
import { useTasks } from "../hooks/useTasks";
import TaskItem from "./TaskItem";
import { AnimatePresence, motion } from "framer-motion";

const TaskList = () => {
  const { tasks, loading, error, loadMore, isAllLoaded, fetchTaksk } =
    useTasks();
  const [tasksLimit, setTaksLimit] = useState(10);

  const header = ["Mark", "Title", "Status", "Action"];

  useEffect(() => {
    fetchTaksk();
  }, []);

  useEffect(() => {
    if (!tasks.length) {
      fetchTaksk();
    }
  }, [tasks]);

  const handleLoadMore = useCallback(() => {
    if (isAllLoaded) return;

    // const newLimit = tasksLimit + 10;
    // setTaksLimit(newLimit);
    loadMore();
  }, [tasksLimit, isAllLoaded]);

  if (loading)
    return <p className="text-center text-blue-500">Loading tasks...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-2 lg:p-6 max-w-xl mx-auto">
      <motion.table
        className="w-full border border-gray-300 rounded-lg shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <thead>
          <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            {header.map((h) => (
              <th className="p-2 lg:p-4 border-b">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {tasks.slice(0, tasksLimit).map((task, index) => (
              <TaskItem
                task={task}
                key={task.id}
                index={index}
                tasksLimit={tasksLimit}
              />
            ))}
          </AnimatePresence>
        </tbody>
      </motion.table>

      {!isAllLoaded && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskList;
