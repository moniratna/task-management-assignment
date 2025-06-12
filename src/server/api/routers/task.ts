import type { Task } from "@prisma/client";
import findAllTask from "~/server/repository/findAllTask";

export const getTasks = async (): Promise<Task[]> => {
  const data = await findAllTask();
  return data;
};
