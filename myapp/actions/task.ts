"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "../lib/prisma";
import { requireUser } from "../lib/auth";
import { taskSchema } from "../lib/validations";

export async function createTaskAction(
  _prevState: unknown,
    formData: FormData
    ) {
      const user = await requireUser();

        const projectId = formData.get("projectId");

          const result = taskSchema.safeParse({
              title: formData.get("title"),
                });

                  if (!result.success) {
                      return {
                            error: result.error.issues[0].message,
                                };
                                  }

                                    if (typeof projectId !== "string") {
                                        return {
                                              error: "Invalid project",
                                                  };
                                                    }

                                                      const project = await prisma.project.findFirst({
                                                          where: {
                                                                id: projectId,
                                                                      userId: user.id,
                                                                          },
                                                                            });

                                                                              if (!project) {
                                                                                  return {
                                                                                        error: "Project not found",
                                                                                            };
                                                                                              }

                                                                                                try {
                                                                                                    await prisma.task.create({
                                                                                                          data: {
                                                                                                                  title: result.data.title,
                                                                                                                          projectId,
                                                                                                                                },
                                                                                                                                    });
                                                                                                                                      } catch {
                                                                                                                                          return {
                                                                                                                                                error: "Could not create task",
                                                                                                                                                    };
                                                                                                                                                      }

                                                                                                                                                        revalidatePath(
                                                                                                                                                            `/dashboard/projects/${projectId}`
                                                                                                                                                              );

                                                                                                                                                                return {
                                                                                                                                                                    success: true,
                                                                                                                                                                      };
                                                                                                                                                                      }