"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "../lib/prisma";
import { requireUser } from "../lib/auth";
import { projectSchema } from "../lib/validations";

export async function createProjectAction(
  _prevState: unknown,
    formData: FormData
    ) {
      const user = await requireUser();

        const result = projectSchema.safeParse({
            name: formData.get("name"),
              });

                if (!result.success) {
                    return {
                          error: result.error.issues[0].message,
                              };
                                }

                                  try {
                                      await prisma.project.create({
                                            data: {
                                                    name: result.data.name,
                                                            userId: user.id,
                                                                  },
                                                                      });
                                                                        } catch {
                                                                            return {
                                                                                  error: "Could not create project",
                                                                                      };
                                                                                        }

                                                                                          revalidatePath("/dashboard");

                                                                                            return {
                                                                                                success: true,
                                                                                                  };
                                                                                                  }