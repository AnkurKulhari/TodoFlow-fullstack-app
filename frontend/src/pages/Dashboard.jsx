import { useEffect, useState } from "react";
import SearchBar from "../components/todo/SearchBar";
import api from "../api/axios";
import Navbar from "../components/layout/Navbar";
import Stats from "../components/todo/Stats";
import TodoList from "../components/todo/TodoList";
import TodoForm from "../components/todo/TodoForm";

function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchTodos();
    fetchUser();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await api.get("/todos");
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    const query = search.toLowerCase();

    return (
      todo.title.toLowerCase().includes(query) ||
      (todo.description || "").toLowerCase().includes(query)
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-slate-100">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

        <p className="mt-4 text-gray-600 text-lg">
          Loading your todos...
        </p>
      </div>
    );
  }

  const hour = new Date().getHours();

  let greeting = "Good Evening 🌙";

  if (hour < 12) {
    greeting = "Good Morning ☀️";
  } else if (hour < 18) {
    greeting = "Good Afternoon 🌤️";
  }

  const firstName = user?.full_name?.split(" ")[0] || "";

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800">
            {greeting}, {firstName}! 👋
          </h1>

          <p className="text-slate-500 mt-2">
            Ready to conquer your tasks today?
          </p>
        </div>

        <p className="text-gray-500 mb-8">
          Let's get things done today.
        </p>

        <Stats todos={todos} />

        <TodoForm onTodoAdded={fetchTodos} />

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <TodoList
          todos={filteredTodos}
          onTodoUpdated={fetchTodos}
        />
      </div>
    </div>
  );
}

export default Dashboard;