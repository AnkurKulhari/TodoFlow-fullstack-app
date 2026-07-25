import {
  CheckCircle2,
  ClipboardList,
  Clock3,
} from "lucide-react";

function Stats({ todos }) {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const pending = total - completed;

  const stats = [
    {
      title: "Total Tasks",
      value: total,
      subtitle: "All your tasks",
      icon: ClipboardList,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      valueColor: "text-slate-800",
      border: "border-blue-200",
    },
    {
      title: "Completed",
      value: completed,
      subtitle: "Great progress",
      icon: CheckCircle2,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      valueColor: "text-green-600",
      border: "border-green-200",
    },
    {
      title: "Pending",
      value: pending,
      subtitle: "Keep going",
      icon: Clock3,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-500",
      valueColor: "text-orange-500",
      border: "border-orange-200",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className={`bg-white rounded-2xl border ${stat.border} shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  {stat.title}
                </p>

                <h2 className={`text-4xl font-bold mt-3 ${stat.valueColor}`}>
                  {stat.value}
                </h2>

                <p className="text-gray-400 text-sm mt-2">
                  {stat.subtitle}
                </p>
              </div>

              <div
                className={`w-14 h-14 rounded-2xl ${stat.iconBg} flex items-center justify-center`}
              >
                <Icon
                  size={28}
                  className={stat.iconColor}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Stats;