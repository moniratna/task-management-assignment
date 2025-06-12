import { useState } from "react";
import TaskModal from "../../components/tasks/task-modal";
import TaskItem from "../../components/tasks/task-item";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Input } from "../../components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Plus, Search } from "lucide-react";
import { api } from "~/utils/api";
import type { Task, User } from "@prisma/client";
import MainLayout from "~/components/layout/main-layout";

export default function Tasks() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [assigneeFilter, setAssigneeFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data = [], isLoading } = api.post.getAllTask.useQuery();
  const tasks = data as Task[];
  const { data: userData = [] } = api.post.getAllUsers.useQuery();
  const users = userData as User[];

  // Filter tasks based on current filters
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;
    const matchesAssignee =
      assigneeFilter === "all" ||
      task.createdById?.toString() === assigneeFilter;
    const matchesSearch =
      searchQuery === "" ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch && matchesAssignee;
  });

  const getStatusCounts = () => {
    return {
      all: tasks.length,
      todo: tasks.filter((t) => t.status === "TODO").length,
      "in-progress": tasks.filter((t) => t.status === "IN_PROGRESS").length,
      completed: tasks.filter((t) => t.status === "COMPLETED").length,
    };
  };

  const statusCounts = getStatusCounts();

  if (isLoading) {
    return (
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="animate-pulse">
            <div className="mb-4 h-8 w-32 rounded bg-gray-200"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 rounded bg-gray-200"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <MainLayout>
        <div className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            {/* Page Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Manage and track all your tasks in one place.
                </p>
              </div>
            </div>

            {/* Filters and Search */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4 sm:flex-row">
                  {/* Search */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                    <Input
                      placeholder="Search tasks..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Status Filter */}
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        All Tasks ({statusCounts.all})
                      </SelectItem>
                      <SelectItem value="TODO">
                        To Do ({statusCounts.todo})
                      </SelectItem>
                      <SelectItem value="IN_PROGRESS">
                        In Progress ({statusCounts["in-progress"]})
                      </SelectItem>
                      <SelectItem value="COMPLETED">
                        Completed ({statusCounts.completed})
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Assignee Filter */}
                  <Select
                    value={assigneeFilter}
                    onValueChange={setAssigneeFilter}
                  >
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Filter by assignee" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Assignees</SelectItem>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id.toString()}>
                          {user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Tasks List */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {filteredTasks.length}{" "}
                  {filteredTasks.length === 1 ? "Task" : "Tasks"}
                  {statusFilter !== "all" &&
                    ` (${statusFilter.replace("-", " ")})`}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {filteredTasks.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-gray-500">
                      No tasks found matching your criteria.
                    </p>
                    <Button
                      onClick={() => setIsTaskModalOpen(true)}
                      className="mt-4"
                      variant="outline"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Create your first task
                    </Button>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {filteredTasks.map((task) => (
                      <TaskItem
                        key={task.id}
                        task={task}
                        assignee={users.find((u) => u.id === task.createdById)}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <TaskModal
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
        />
      </MainLayout>
    </>
  );
}
