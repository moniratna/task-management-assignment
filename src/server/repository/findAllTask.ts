import type { Task } from "@prisma/client";
import prisma from "~/utils/prismaClient";
const findAllTask = async (): Promise<Task[]> => {
  try {
    const tasks = await prisma.task.findMany();
    return tasks;
  } catch (error: unknown) {
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred",
    );
  }
};
export default findAllTask;
