import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold">
          Mini SaaS
        </h1>

        <p className="mt-4 text-gray-500">
          Simple project management SaaS
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/login"
            className="rounded-lg bg-black px-6 py-3 text-white"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-lg border px-6 py-3"
          >
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}