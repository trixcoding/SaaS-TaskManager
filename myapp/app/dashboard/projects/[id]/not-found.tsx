import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-semibold text-gray-700">
          Project Not Found
        </h2>

        <p className="mt-3 text-gray-500">
          The project you are looking for does not exist
          or you do not have access to it.
        </p>

        <Link
          href="/dashboard"
          className="mt-6 inline-block text-sm text-gray-500 hover:underline"
        >
          ← Back to Dashboard
        </Link>
      </div>
    </main>
  );
}