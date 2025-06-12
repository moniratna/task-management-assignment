import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Mail, User, CheckSquare } from "lucide-react";
import { api } from "~/utils/api";
import type { Task, User as UserType } from "@prisma/client";
import MainLayout from "~/components/layout/main-layout";

export default function Team() {
  const { data = [], isLoading } = api.post.getAllUsers.useQuery();
  const users = data as UserType[];
  const { data: tasks = [] } = api.post.getAllTask.useQuery();
  const allTasks = tasks as Task[];

  const getUserTasksCount = (userId: string) => {
    return allTasks.filter((task) => task.createdById === userId).length;
  };

  const getUserCompletedTasksCount = (userId: string) => {
    return allTasks.filter(
      (task) => task.createdById === userId && task.status === "COMPLETED",
    ).length;
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="animate-pulse">
            <div className="mb-4 h-8 w-32 rounded bg-gray-200"></div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 rounded bg-gray-200"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          {/* Page Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Team</h1>
              <p className="mt-1 text-sm text-gray-600">
                Manage your team members and their assignments.
              </p>
            </div>
          </div>

          {/* Team Stats */}
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      Total Members
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {users.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => {
              const totalTasks = getUserTasksCount(user.id);
              const completedTasks = getUserCompletedTasksCount(user.id);

              return (
                <Card
                  key={user.id}
                  className="transition-shadow hover:shadow-lg"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={user.image ?? undefined}
                          alt={`${user.name}`}
                        />
                        <AvatarFallback>
                          {getInitials(user.name ?? "", "")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{user.name}</CardTitle>
                        <div className="mt-1 flex items-center space-x-2"></div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="mb-3 flex items-center text-sm text-gray-600">
                      <Mail className="mr-2 h-4 w-4" />
                      {user.email}
                    </div>

                    {/* Task Statistics */}
                    <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-3">
                      <div className="text-center">
                        <div className="mb-1 flex items-center justify-center">
                          <CheckSquare className="mr-1 h-4 w-4 text-gray-500" />
                        </div>
                        <p className="text-lg font-semibold text-gray-900">
                          {totalTasks}
                        </p>
                        <p className="text-xs text-gray-500">Total Tasks</p>
                      </div>
                      <div className="text-center">
                        <div className="mb-1 flex items-center justify-center">
                          <CheckSquare className="mr-1 h-4 w-4 text-green-500" />
                        </div>
                        <p className="text-lg font-semibold text-gray-900">
                          {completedTasks}
                        </p>
                        <p className="text-xs text-gray-500">Completed</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
