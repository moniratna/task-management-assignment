import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Plus, Folder, BarChart3 } from "lucide-react";
import TaskModal from "../../components/tasks/task-modal";

export default function QuickActions() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const actions = [
    {
      title: "Create New Task",
      icon: Plus,
      color: "text-blue-600",
      action: () => setIsTaskModalOpen(true),
    },
  ];

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant="outline"
                className="h-auto w-full justify-start p-3 text-left"
                onClick={action.action}
              >
                <Icon className={`mr-3 h-4 w-4 ${action.color}`} />
                <span className="text-sm font-medium text-gray-900">
                  {action.title}
                </span>
              </Button>
            );
          })}
        </CardContent>
      </Card>

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
      />
    </>
  );
}
