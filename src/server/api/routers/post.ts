import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  createTask: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        status: z.string(),
        priority: z.string(),
        dueDate: z.date().optional(),
        createdById: z.string(),
        assignees: z.array(z.string()).optional(),
        tags: z.array(z.string()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.task.create({
        data: {
          title: input.title,
          description: input.description ?? undefined,
          status: input.status,
          priority: input.priority,
          dueDate: input.dueDate ? input.dueDate.toISOString() : undefined,
          createdBy: { connect: { id: input.createdById } },
          assignees: {
            connect:
              input.assignees?.map((assignee) => ({ id: assignee })) ?? [],
          },
          tags: {
            connectOrCreate: input.tags?.map((tag) => ({
              where: { name: tag },
              create: { name: tag },
            })),
          },
        },
      });
    }),

  getAllTask: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.task.findMany({
      orderBy: { createdAt: "desc" },
    });

    return (post as []) ?? null;
  }),
  getAllUsers: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.user.findMany({});

    return (users as []) ?? null;
  }),
  getAllProjects: publicProcedure.query(async ({ ctx }) => {
    const projects = await ctx.db.project.findMany({});

    return (projects as []) ?? null;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  updateTask: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.task.update({
        where: { id: input.id },
        data: {
          status: input.status,
          updatedAt: new Date().toISOString(),
        },
      });
    }),
});
