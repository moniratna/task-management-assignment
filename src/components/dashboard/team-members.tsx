import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { api } from "~/utils/api";
import type { User } from "@prisma/client";

export default function TeamMembers() {
  const { data = [], isLoading } = api.post.getAllUsers.useQuery();
  const users = data as User[];
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Team Members</CardTitle>
            <Button variant="ghost" size="sm">
              + Invite
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex animate-pulse items-center justify-between"
              >
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                  <div className="ml-3">
                    <div className="mb-1 h-4 w-20 rounded bg-gray-200"></div>
                    <div className="h-3 w-16 rounded bg-gray-200"></div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-gray-200"></div>
                  <div className="h-3 w-12 rounded bg-gray-200"></div>
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
        <div className="flex items-center justify-between">
          <CardTitle>Team Members</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {users.slice(0, 4).map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={user.image ?? undefined}
                    alt={`${user.name}`}
                  />
                  <AvatarFallback className="text-xs">
                    {getInitials(user.name ?? "", "")}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {user.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
