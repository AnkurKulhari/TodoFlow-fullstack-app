import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";
import { motion } from "framer-motion";

function EditTodoModal({ todo, isOpen, onClose, onTodoUpdated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description || "");
    }
  }, [todo]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/todos/${todo.id}`, {
        title,
        description,
      });

      toast.success("Todo updated!");

      onTodoUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update todo");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-6"
      >
        <h2 className="text-2xl font-bold mb-4">Edit Todo</h2>

        <form onSubmit={handleSubmit}>
          <input
            className="w-full border rounded-lg p-3 mb-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />

          <textarea
            rows={4}
            className="w-full border rounded-lg p-3 mb-4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default EditTodoModal;