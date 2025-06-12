import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { format, formatDistanceToNow } from "date-fns";

export default function Timeline() {
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["/api/timeline"],
  });

  const getEventColor = (type: string) => {
    switch (type) {
      case "task_completed":
        return "bg-green-500";
      case "project_created":
        return "bg-blue-500";
      default:
        return "bg-gray-400";
    }
  };

  const formatEventDate = (date: string | Date) => {
    try {
      const eventDate = new Date(date);
      const now = new Date();
      const diffInHours =
        (now.getTime() - eventDate.getTime()) / (1000 * 60 * 60);

      if (diffInHours < 24) {
        return formatDistanceToNow(eventDate, { addSuffix: true });
      } else {
        return format(eventDate, "MMM d, yyyy");
      }
    } catch {
      return "Unknown date";
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Project Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex animate-pulse items-start">
                <div className="mt-1.5 h-3 w-3 rounded-full bg-gray-200"></div>
                <div className="ml-4">
                  <div className="mb-1 h-4 w-32 rounded bg-gray-200"></div>
                  <div className="h-3 w-16 rounded bg-gray-200"></div>
                </div>
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
        <CardTitle>Project Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <p className="text-sm text-gray-500">No recent activity.</p>
        ) : (
          <div className="space-y-4">
            {events.slice(0, 5).map((event: any) => (
              <div key={event.id} className="flex items-start">
                <div className="flex-shrink-0">
                  <div
                    className={`h-3 w-3 ${getEventColor(event.type)} mt-1.5 rounded-full`}
                  />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">
                    {event.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatEventDate(event.date)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
