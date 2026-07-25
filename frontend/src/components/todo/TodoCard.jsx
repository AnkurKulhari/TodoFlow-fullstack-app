import { useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { Trash2, Pencil } from "lucide-react";
import EditTodoModal from "./EditTodoModal";
import { motion } from "framer-motion";
import DeleteConfirmModal from "./DeleteConfirmModal";

function TodoCard({ todo, onTodoUpdated }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const toggleComplete = async () => {
    try {
      await api.patch(`/todos/${todo.id}/complete`, {
        completed: !todo.completed,
      });

      toast.success(
        !todo.completed
          ? "Todo completed!"
          : "Todo marked as pending!"
      );

      onTodoUpdated();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update todo");
    }
  };

  const deleteTodo = async () => {
    try {
      await api.delete(`/todos/${todo.id}`);

      toast.success("Todo deleted!");

      setIsDeleteOpen(false);
      onTodoUpdated();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete todo");
    }
  };

  return (
  <>
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 p-6 mb-5"
    >
      <div className="flex justify-between items-start">
        {/* Left Side */}
        <div className="flex-1">
          <button
            onClick={toggleComplete}
            className="flex items-center gap-3 text-left"
          >
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
                todo.completed
                  ? "bg-green-500 border-green-500"
                  : "border-gray-400"
              }`}
            >
              {todo.completed && (
                <span className="text-white text-xs font-bold">✓</span>
              )}
            </div>

            <h2
              className={`text-xl font-semibold ${
                todo.completed
                  ? "line-through text-gray-400"
                  : "text-gray-900"
              }`}
            >
              {todo.title}
            </h2>
          </button>

          {todo.description && (
            <p className="text-gray-600 mt-4 ml-8">
              {todo.description}
            </p>
          )}

          {todo.created_at && (
            <p className="text-sm text-gray-400 mt-4 ml-8">
              Created{" "}
              {new Date(todo.created_at).toLocaleDateString()}
            </p>
          )}
        </div>

        {/* Right Side */}
        <div className="flex flex-col items-end gap-4 ml-6">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              todo.completed
                ? "bg-green-100 text-green-700"
                : "bg-orange-100 text-orange-700"
            }`}
          >
            {todo.completed ? "Completed" : "Pending"}
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => setIsEditOpen(true)}
              className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition"
              title="Edit"
            >
              <Pencil size={18} />
            </button>

            <button
              onClick={() => setIsDeleteOpen(true)}
              className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition"
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>

    <EditTodoModal
      todo={todo}
      isOpen={isEditOpen}
      onClose={() => setIsEditOpen(false)}
      onTodoUpdated={onTodoUpdated}
    />
    <DeleteConfirmModal
      isOpen={isDeleteOpen}
      onClose={() => setIsDeleteOpen(false)}
      onConfirm={deleteTodo}
      todoTitle={todo.title}
    />
  </>
);
}

export default TodoCard;