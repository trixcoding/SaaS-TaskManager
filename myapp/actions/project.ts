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

  await prisma.project.create({
    data: {
      name: result.data.name,
      userId: user.id,
    },
  });

  revalidatePath("/dashboard");

  return {
    success: true,
  };
}

export async function updateProjectAction(
  _prevState: unknown,
  formData: FormData
) {
  const user = await requireUser();

  const projectId = formData.get("projectId");

  const result = projectSchema.safeParse({
    name: formData.get("name"),
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

  await prisma.project.update({
    where: {
      id: project.id,
    },
    data: {
      name: result.data.name,
    },
  });

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/projects/${project.id}`);

  return {
    success: true,
  };
}

export async function deleteProjectAction(
  formData: FormData
) {
  const user = await requireUser();

  const projectId = formData.get("projectId");

  if (typeof projectId !== "string") {
    return;
  }

  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      userId: user.id,
    },
  });

  if (!project) {
    return;
  }

  await prisma.project.delete({
    where: {
      id: project.id,
    },
  });

  revalidatePath("/dashboard");
}