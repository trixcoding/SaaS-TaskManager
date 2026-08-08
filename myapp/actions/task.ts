"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "../lib/prisma";
import { requireUser } from "../lib/auth";
import { taskSchema } from "../lib/validations";

async function getAuthorizedProject(
  projectId: string,
  userId: string
) {
  return prisma.project.findFirst({
    where: {
      id: projectId,
      userId,
    },
  });
}

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

  const project = await getAuthorizedProject(
    projectId,
    user.id
  );

  if (!project) {
    return {
      error: "Project not found",
    };
  }

  await prisma.task.create({
    data: {
      title: result.data.title,
      projectId,
    },
  });

  revalidatePath(
    `/dashboard/projects/${projectId}`
  );

  return {
    success: true,
  };
}

export async function toggleTaskAction(
  formData: FormData
) {
  const user = await requireUser();

  const taskId = formData.get("taskId");

  if (typeof taskId !== "string") {
    return;
  }

  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      project: {
        userId: user.id,
      },
    },
  });

  if (!task) {
    return;
  }

  await prisma.task.update({
    where: {
      id: task.id,
    },
    data: {
      completed: !task.completed,
    },
  });

  revalidatePath(
    `/dashboard/projects/${task.projectId}`
  );
}

export async function updateTaskAction(
  _prevState: unknown,
  formData: FormData
) {
  const user = await requireUser();

  const taskId = formData.get("taskId");

  const result = taskSchema.safeParse({
    title: formData.get("title"),
  });

  if (!result.success) {
    return {
      error: result.error.issues[0].message,
    };
  }

  if (typeof taskId !== "string") {
    return {
      error: "Invalid task",
    };
  }

  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      project: {
        userId: user.id,
      },
    },
  });

  if (!task) {
    return {
      error: "Task not found",
    };
  }

  await prisma.task.update({
    where: {
      id: task.id,
    },
    data: {
      title: result.data.title,
    },
  });

  revalidatePath(
    `/dashboard/projects/${task.projectId}`
  );

  return {
    success: true,
  };
}

export async function deleteTaskAction(
  formData: FormData
) {
  const user = await requireUser();

  const taskId = formData.get("taskId");

  if (typeof taskId !== "string") {
    return;
  }

  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      project: {
        userId: user.id,
      },
    },
  });

  if (!task) {
    return;
  }

  await prisma.task.delete({
    where: {
      id: task.id,
    },
  });

  revalidatePath(
    `/dashboard/projects/${task.projectId}`
  );
}