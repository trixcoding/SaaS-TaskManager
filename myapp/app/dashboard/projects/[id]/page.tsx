import { notFound, redirect } from "next/navigation";
import Link from "next/link"; 
import { getCurrentUser } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";

import CreateTaskForm from "../../../../components/create-task-form";
import TaskItem from "../../../../components/task-item";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProjectPage({
  params,
}: Props) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const { id } = await params;

  const project = await prisma.project.findFirst({
    where: {
      id,
      userId: user.id,
    },
    include: {
      tasks: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl space-y-8 px-6 py-10">

        {/* Project Header */}
        <div>
          <p className="text-sm text-gray-400">
            Project
          </p>

          <h1 className="text-3xl  text-gray-500 font-bold">
            {project.name}
          </h1>
            <Link
    
                            className="rounded-lg border px-4 py-2  text-gray-500 text-4xl" 
                                  >
                                           →

                                                </Link>
        </div>

        {/* Create Task */}
        <section className="rounded-xl border bg-white p-6">
          <h2 className=" text-gray-500 mb-4 text-xl font-semibold">
            Create Task
          </h2>

          <CreateTaskForm
            projectId={project.id}
          />
        </section>

        {/* Tasks */}
        <section>
          <h2 className=" text-gray-500 mb-4 text-xl font-semibold">
            Tasks
          </h2>

          {project.tasks.length === 0 ? (
            <div className="rounded-xl border bg-white p-8 text-center text-gray-500">
              No tasks yet.
            </div>
          ) : (
            <div className="space-y-3">
              {project.tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  completed={task.completed}
                />
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}