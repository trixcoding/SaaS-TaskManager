import Link from "next/link";
import { redirect } from "next/navigation";

import { getCurrentUser } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

import LogoutButton from "../../components/logout-button";
import CreateProjectForm from "../../components/create-project-form";
import DeleteProjectButton from "../../components/delete-project-button";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const projects = await prisma.project.findMany({
    where: {
      userId: user.id,
    },
    include: {
      _count: {
        select: {
          tasks: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Mini SaaS
            </h1>

            <p className="text-sm text-gray-500">
              Welcome, {user.name}
            </p>
          </div>

          <LogoutButton />
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-8 px-6 py-10">

        {/* Dashboard Header */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900">
            Dashboard
          </h2>

          <p className="mt-2 text-gray-500">
            Manage your projects and tasks.
          </p>
        </section>

        {/* Create Project */}
        <section className="rounded-xl border bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Create Project
          </h2>

          <CreateProjectForm />
        </section>

        {/* Projects */}
        <section>
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Your Projects
          </h2>

          {projects.length === 0 ? (
            <div className="rounded-xl border bg-white p-10 text-center text-gray-500">
              No projects yet.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-xl border bg-white p-5 transition hover:-translate-y-1 hover:shadow-md"
                >
                  {/* Project Info */}
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {project.name}
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                      {project._count.tasks} tasks
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 flex items-center gap-3">
                    <Link
                      href={`/dashboard/projects/${project.id}`}
                      className="rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
                    >
                      Show Tasks
                    </Link>

                    <DeleteProjectButton
                      projectId={project.id}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}