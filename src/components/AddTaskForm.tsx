import { useCallback, useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { motion } from "framer-motion";

const AddTaskForm = () => {
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!title.trim()) return;
      setTitle("");
    },
    [title]
  );

  const handleAdd = useCallback(() => {
    if (!title.trim()) {
      setErrMsg("*Content is missing!");
      return;
    }

    addTask(title);
  }, [title]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrMsg("");
    setTitle(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto mt-5">
      <div>
        <div className="flex items-center mb-4 border border-gray-300 rounded-lg p-3 shadow-sm">
          <input
            type="text"
            value={title}
            onChange={onChange}
            placeholder="Add a new task..."
            className="flex-grow outline-none p-2"
          />
          <button
            onClick={handleAdd}
            className="ml-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>
        {errMsg && (
          <motion.p
            className="text-xs px-3 text-red-500"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {errMsg}
          </motion.p>
        )}
      </div>
    </form>
  );
};

export default AddTaskForm;
