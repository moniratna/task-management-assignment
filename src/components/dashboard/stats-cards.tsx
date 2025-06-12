import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "../../components/ui/card";
import { CheckSquare, Clock, AlertTriangle, TrendingUp } from "lucide-react";
import { api } from "~/utils/api";
import { Task } from "@prisma/client";

export default function StatsCards() {
  type Stats = {
    totalTasks: number;
    completedTasks: number;
    inProgressTasks: number;
    overdueTasks: number;
  };

  const { data: tasks = [], isLoading } = api.post.getAllTask.useQuery();
  const inProgressTasks = tasks.filter(
    (task: Task) => task.status === "IN_PROGRESS",
  );
  const completedTasks = tasks.filter(
    (task: Task) => task.status === "COMPLETED",
  );
  const todoTasks = tasks.filter((task: Task) => task.status === "TODO");
  const cards = [
    {
      title: "Total Tasks",
      value: tasks?.length || 0,
      icon: CheckSquare,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Completed",
      value: completedTasks?.length || 0,
      icon: CheckSquare,
      color: "bg-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "In Progress",
      value: inProgressTasks?.length || 0,
      icon: Clock,
      color: "bg-yellow-500",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Todo",
      value: todoTasks?.length || 0,
      icon: AlertTriangle,
      color: "bg-red-500",
      bgColor: "bg-red-50",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="animate-pulse">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-lg bg-gray-200"></div>
                  <div className="ml-4">
                    <div className="mb-2 h-4 w-20 rounded bg-gray-200"></div>
                    <div className="h-6 w-12 rounded bg-gray-200"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div
                  className={`h-8 w-8 flex-shrink-0 ${card.bgColor} flex items-center justify-center rounded-lg`}
                >
                  <Icon
                    className={`h-4 w-4 ${card.color.replace("bg-", "text-")}`}
                  />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    {card.title}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {card.value}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
