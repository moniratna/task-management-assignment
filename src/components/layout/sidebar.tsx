import { BarChart3, CheckSquare, Users, X, User } from "lucide-react";
import { Button } from "../../components/ui/button";
import { api } from "~/utils/api";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Task } from "@prisma/client";
import { signOut, useSession } from "next-auth/react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { data: sessionData } = useSession();
  const pathName = usePathname();
  const { data: tasks = [] } = api.post.getAllTask.useQuery();
  const { data: users = [] } = api.post.getAllUsers.useQuery();

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: BarChart3,
      current: pathName === "/" || pathName === "/dashboard",
    },
    {
      name: "Tasks",
      href: "/tasks",
      icon: CheckSquare,
      current: pathName === "/tasks",
      count: tasks.length,
    },

    {
      name: "Team",
      href: "/team",
      icon: Users,
      current: pathName === "/team",
      count: users.length,
    },
  ];

  const recentTasks = tasks.slice(0, 3);

  const getPriorityColor = (status: string) => {
    switch (status) {
      case "TODO":
        return "bg-green-500";
      case "completed":
        return "bg-blue-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-gray-200 bg-white transition-transform duration-300 ease-in-out md:relative md:z-0 md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"} `}
      >
        <div className="flex h-full flex-col">
          {/* Logo Section */}
          <div className="flex items-center justify-between px-4 py-5">
            <div className="flex items-center">
              <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
                <CheckSquare className="h-4 w-4 text-white" />
              </div>
              <span className="ml-3 text-xl font-semibold text-gray-900">
                TaskFlow
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.name} href={item.href}>
                  <div
                    className={`group flex cursor-pointer items-center rounded-md px-2 py-2 text-sm font-medium transition-colors ${
                      item.current
                        ? "bg-blue-500 text-white"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    } `}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                    {item.count !== undefined && (
                      <span
                        className={`ml-auto inline-block rounded-full px-2 py-0.5 text-xs ${
                          item.current
                            ? "bg-white text-black"
                            : "bg-primary text-black"
                        } `}
                      >
                        {item.count}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}

            {/* Recent Projects */}
            <div className="mt-8">
              <h3 className="px-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Recent Projects
              </h3>
              <div className="mt-2 space-y-1">
                {recentTasks.map((tasks: Task) => (
                  <Link key={tasks.id} href={`/projects/${tasks.id}`}>
                    <div className="group flex cursor-pointer items-center rounded-md px-2 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                      <div
                        className={`project-dot mr-3 ${getPriorityColor(tasks.status)}`}
                      />
                      <span className="truncate">{tasks.title}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* User Profile */}
          <div className="flex-shrink-0 border-t border-gray-200 p-4">
            <div className="group flex w-full cursor-pointer items-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-300">
                <User className="h-5 w-5 text-gray-600" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  {sessionData?.user?.name ||
                    sessionData?.user?.email ||
                    "User"}
                </p>
                <p
                  className="text-xs font-medium text-gray-500 group-hover:text-gray-700"
                  onClick={() => {
                    void signOut({ redirect: true, callbackUrl: "/" });
                    localStorage.clear();
                  }}
                >
                  Log out
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
