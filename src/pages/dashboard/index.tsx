import StatsCards from "../../components/dashboard/stats-cards";
import TaskList from "../../components/tasks/task-list";
import TeamMembers from "../../components/dashboard/team-members";
import QuickActions from "../../components/dashboard/quick-actions";
import MainLayout from "~/components/layout/main-layout";

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-600">
              {
                "Welcome back! Here's what's happening with your projects today."
              }
            </p>
          </div>

          {/* Stats Overview */}
          <StatsCards />

          {/* Main Content Grid */}
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Task List - spans 2 columns on large screens */}
            <div className="lg:col-span-2">
              <TaskList />
            </div>

            {/* Right Sidebar */}
            <div className="space-y-8">
              {/* <Timeline /> */}
              <TeamMembers />
              <QuickActions />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
