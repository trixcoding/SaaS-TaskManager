"use client";

import { useActionState } from "react";
import Link from "next/link";

import { registerAction } from "../actions/auth"; 
export default function RegisterForm() {
    const [state, formAction, pending] =
        useActionState(registerAction, null);

    return (
        <form
            action={formAction}
            className="w-full max-w-md space-y-5"
        >
            <div>
                <h1 className="text-3xl font-bold">
                    Create account
                </h1>

                <p className="mt-2 text-gray-500">
                    Start using Mini SaaS
                </p>
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">
                    Name
                </label>

                <input
                    name="name"
                    required
                    className="w-full rounded-lg border px-4 py-3"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">
                    Email
                </label>

                <input
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-lg border px-4 py-3"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">
                    Password
                </label>

                <input
                    name="password"
                    type="password"
                    required
                    minLength={8}
                    className="w-full rounded-lg border px-4 py-3"
                />
            </div>

            {state?.error && (
                <p className="text-sm text-red-600">
                    {state.error}
                </p>
            )}

            <button
                type="submit"
                disabled={pending}
                className="w-full rounded-lg bg-white px-4 py-3 text-blue-400 disabled:opacity-50"
            >
                {pending ? "Creating..." : "Create account"}
            </button>

            <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="font-medium text-blue-400 underline"
                >
                    Login
                </Link>
            </p>
        </form>
    );
}