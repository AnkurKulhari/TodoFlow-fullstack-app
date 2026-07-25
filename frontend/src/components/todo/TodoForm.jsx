import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";

function TodoForm({ onTodoAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    try {
      setLoading(true);

      await api.post("/todos", {
        title,
        description,
      });

      toast.success("Todo added!");

      setTitle("");
      setDescription("");

      onTodoAdded();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add todo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow p-6 mb-8"
    >
      <h2 className="text-xl font-semibold mb-4">
        Add New Todo
      </h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border rounded-lg p-3 mb-4"
      />

      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        className="w-full border rounded-lg p-3 mb-4"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Todo"}
      </button>
    </form>
  );
}

export default TodoForm;