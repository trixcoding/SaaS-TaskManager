"use client";

import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-2xl text-red-600">
          !
        </div>

        <h1 className="mt-6 text-3xl font-bold text-gray-800">
          Something went wrong
        </h1>

        <p className="mt-3 text-gray-500">
          We couldn&apos;t load this project.
          Please try again.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-lg bg-black px-5 py-2.5 text-sm text-white hover:bg-gray-800"
          >
            Try Again
          </button>
        </div>
      </div>
    </main>
  );
}