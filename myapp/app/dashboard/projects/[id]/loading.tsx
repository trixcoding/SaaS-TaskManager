export default function Loading() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl space-y-8 px-6 py-10">

        {/* Project Header Skeleton */}
        <div>
          <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />

          <div className="mt-3 h-9 w-64 animate-pulse rounded bg-gray-200" />

          <div className="mt-4 h-4 w-36 animate-pulse rounded bg-gray-200" />
        </div>

        {/* Create Task Skeleton */}
        <section className="rounded-xl border bg-white p-6">
          <div className="mb-5 h-6 w-32 animate-pulse rounded bg-gray-200" />

          <div className="h-10 w-full animate-pulse rounded-lg bg-gray-200" />
        </section>

        {/* Tasks */}
        <section>
          <div className="mb-4 h-6 w-20 animate-pulse rounded bg-gray-200" />

          <div className="space-y-3">
            <TaskSkeleton />
            <TaskSkeleton />
            <TaskSkeleton />
          </div>
        </section>

      </div>
    </main>
  );
}

function TaskSkeleton() {
  return (
    <div className="flex items-center justify-between rounded-lg border bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="h-5 w-5 animate-pulse rounded border bg-gray-200" />

        <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="h-4 w-12 animate-pulse rounded bg-gray-200" />
    </div>
  );
}