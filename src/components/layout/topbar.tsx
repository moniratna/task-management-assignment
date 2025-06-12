import { useState } from "react";
import { Plus, Menu } from "lucide-react";
import { Button } from "../../components/ui/button";
import TaskModal from "../../components/tasks/task-modal";

interface TopBarProps {
  onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  return (
    <>
      <div className="relative z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="border-r border-gray-200 px-4 text-gray-500 md:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex flex-1 items-center justify-between px-4">
          <div className="flex flex-1"></div>

          {/* Right side buttons */}
          <div className="ml-4 flex items-center space-x-3">
            {/* Create Task Button */}
            <Button
              onClick={() => setIsTaskModalOpen(true)}
              className="flex items-center space-x-2 bg-blue-800 text-white hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New Task</span>
            </Button>
          </div>
        </div>
      </div>

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
      />
    </>
  );
}
