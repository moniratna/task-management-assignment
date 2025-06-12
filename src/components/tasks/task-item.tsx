import { Checkbox } from "../../components/ui/checkbox";
import { Badge } from "../../components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { format } from "date-fns";
import { api } from "~/utils/api";

export default function TaskItem({ task, assignee }: any) {
  const updateTaskMutation = api.post.updateTask.useMutation();

  const handleToggleComplete = (checked: boolean, id: string) => {
    const newStatus = checked ? "COMPLETED" : "TODO";
    updateTaskMutation.mutate(
      {
        status: newStatus,
        id: id,
      },
      {
        onSuccess: () => {
          // refresh the task list after updating
          window.location.reload();
        },
      },
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-700 bg-green-50";
      case "in-progress":
        return "text-yellow-700 bg-yellow-50";
      case "todo":
        return "text-gray-700 bg-gray-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-700 bg-red-50";
      case "medium":
        return "text-blue-700 bg-blue-50";
      case "low":
        return "text-green-700 bg-green-50";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();
  };

  const formatDate = (date: string | Date | null) => {
    if (!date) return null;
    try {
      return format(new Date(date), "MMM d, yyyy");
    } catch {
      return null;
    }
  };

  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== "completed";

  return (
    <div className="p-6 transition-colors hover:bg-gray-50">
      <div className="flex items-center space-x-4">
        <Checkbox
          checked={task.status === "COMPLETED"}
          onCheckedChange={() => handleToggleComplete(true, task.id)}
          className="flex-shrink-0"
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4
                className={`text-sm font-medium text-gray-900 ${task.status === "COMPLETED" ? "line-through" : ""}`}
              >
                {task.title}
              </h4>
              {task.description && (
                <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                  {task.description}
                </p>
              )}

              <div className="mt-2 flex flex-wrap items-center gap-y-1 space-x-4">
                <Badge
                  className={`text-xs ${getPriorityColor(task.priority)}`}
                  variant="secondary"
                >
                  {task.priority.charAt(0).toUpperCase() +
                    task.priority.slice(1)}{" "}
                  Priority
                </Badge>

                {task.dueDate && (
                  <span
                    className={`text-xs ${isOverdue ? "font-medium text-red-600" : "text-gray-500"}`}
                  >
                    {isOverdue ? "Overdue: " : "Due: "}
                    {formatDate(task.dueDate)}
                  </span>
                )}

                {assignee && (
                  <div className="flex items-center">
                    <Avatar className="mr-2 h-5 w-5">
                      <AvatarImage
                        src={assignee.image ?? undefined}
                        alt={`${assignee.name}`}
                      />
                      <AvatarFallback className="text-xs">
                        {getInitials(assignee.name, "")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-gray-500">
                      {assignee.name}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="ml-4 flex-shrink-0">
              <Badge
                className={`text-xs ${getStatusColor(task.status)}`}
                variant="secondary"
              >
                {task.status === "IN_PROGRESS"
                  ? "In Progress"
                  : task.status === "COMPLETED"
                    ? "Completed"
                    : "To Do"}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
