import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useToast } from "../../hooks/use-toast";
import { CalendarDays } from "lucide-react";
import { api } from "~/utils/api";
import type { User } from "@prisma/client";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TaskModal({ isOpen, onClose }: TaskModalProps) {
  const { toast } = useToast();
  const { data = [] } = api.post.getAllUsers.useQuery();
  const users = data as User[];
  // const { data: projects = [] } = useProjects();
  const status = [
    { id: 1, name: "Todo", value: "TODO" },
    { id: 2, name: "In Progress", value: "IN_PROGRESS" },
    { id: 3, name: "Completed", value: "COMPLETED" },
  ];
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    dueDate: "",
    createdById: "unassigned",
    tags: "",
  });

  const createTaskMutation = api.post.createTask.useMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTaskMutation.mutate(
      {
        title: formData.title,
        description: formData.description,
        status: formData.status,
        priority: formData.priority,
        dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
        createdById: formData.createdById,
      },
      {
        onSuccess: () => {
          toast({
            title: "Task Created",
            description: "Your task has been created successfully.",
            variant: "default",
          });
          handleClose();
        },
        onError: (error: any) => {
          toast({
            title: "Error",
            description: error.message ?? "Failed to create task.",
            variant: "destructive",
          });
        },
      },
    );
  };

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
      dueDate: "",
      createdById: "unassigned",
      tags: "",
    });
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    console.log(`Field: ${field}, Value: ${value}`);
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="bg-white sm:max-w-[600px]"
        aria-describedby="task-form-description"
      >
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <p id="task-form-description" className="sr-only">
            Fill out the form below to create a new task with title,
            description, priority, due date, assignee, and project.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Task Title */}
          <div>
            <Label htmlFor="title">Task Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Enter task title..."
              required
            />
          </div>

          {/* Task Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe the task in detail..."
              rows={3}
            />
          </div>

          {/* Priority and Due Date Row */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => handleInputChange("priority", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>

                <SelectContent className="z-50 rounded-md border border-gray-200 bg-white shadow-md">
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <div className="relative">
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleInputChange("dueDate", e.target.value)}
                />
                <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              </div>
            </div>
          </div>

          {/* Assignee and Project Row */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="assignee">Assign To</Label>
              <Select
                value={formData.createdById}
                onValueChange={(value) =>
                  handleInputChange("createdById", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select team member..." />
                </SelectTrigger>
                <SelectContent className="z-50 rounded-md border border-gray-200 bg-white shadow-md">
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id.toString()}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="project">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleInputChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status..." />
                </SelectTrigger>
                <SelectContent className="z-50 rounded-md border border-gray-200 bg-white shadow-md">
                  {status.map((item) => (
                    <SelectItem key={item.id} value={item.value}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => handleInputChange("tags", e.target.value)}
              placeholder="design, frontend, urgent (comma separated)"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={createTaskMutation.isPending}>
              {createTaskMutation.isPending ? "Creating..." : "Create Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
