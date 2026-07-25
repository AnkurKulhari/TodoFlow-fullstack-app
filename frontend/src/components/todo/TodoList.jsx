import TodoCard from "./TodoCard";
import { AnimatePresence } from "framer-motion";
import { ClipboardList } from "lucide-react";

function TodoList({ todos, onTodoUpdated }) {
  if (todos.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 py-16 px-8 text-center">
        <div className="mx-auto w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
          <ClipboardList
            size={40}
            className="text-blue-600"
          />
        </div>

        <h2 className="mt-6 text-2xl font-bold text-slate-800">
          No tasks found
        </h2>

        <p className="mt-2 text-slate-500 max-w-sm mx-auto">
          Create your first task or adjust your search to see your todos here.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <AnimatePresence>
        {todos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onTodoUpdated={onTodoUpdated}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

export default TodoList;