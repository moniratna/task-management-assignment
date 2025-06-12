import TaskItem from "./task-item";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { api } from "~/utils/api";
import type { Task, User } from "@prisma/client";

export default function TaskList() {
  const { data = [], isLoading } = api.post.getAllTask.useQuery();
  const tasks: Task[] = data as Task[];
  const { data: users = [] } = api.post.getAllUsers.useQuery();

  // limit tasks for dashboard
  const filteredTasks = tasks.slice(0, 6); // Show only recent 6 tasks

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="animate-pulse">
            <div className="h-6 w-32 rounded bg-gray-200"></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 rounded bg-gray-200"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Tasks</CardTitle>
          <div className="flex items-center space-x-2">
            <Link href="/tasks">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {filteredTasks.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-gray-500">No tasks found.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                assignee={users.find((u: User) => u.id === task.createdById)}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
