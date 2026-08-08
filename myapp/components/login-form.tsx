"use client";

import { useActionState } from "react";
import Link from "next/link";

import { loginAction } from "../actions/auth";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(
      loginAction,
          null
            );

              return (
                  <form
                        action={formAction}
                              className="w-full max-w-md space-y-5"
                                  >
                                        <div>
                                                <h1 className="text-3xl font-bold">
                                                          Login
                                                                  </h1>

                                                                          <p className="mt-2 text-gray-500">
                                                                                    Sign in to your account
                                                                                            </p>
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
                                                                                                                                                                                            placeholder="you@example.com"
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
                                                                                                                                                                                                                                                                                                                                                                            className="w-full rounded-lg bg-black px-4 py-3 text-white disabled:opacity-50"
                                                                                                                                                                                                                                                                                                                                                                                  >
                                                                                                                                                                                                                                                                                                                                                                                          {pending ? "Logging in..." : "Login"}
                                                                                                                                                                                                                                                                                                                                                                                                </button>

                                                                                                                                                                                                                                                                                                                                                                                                      <p className="text-center text-sm text-gray-500">
                                                                                                                                                                                                                                                                                                                                                                                                              Don't have an account?{" "}
                                                                                                                                                                                                                                                                                                                                                                                                                      <Link
                                                                                                                                                                                                                                                                                                                                                                                                                                href="/register"
                                                                                                                                                                                                                                                                                                                                                                                                                                          className="font-medium text-black underline"
                                                                                                                                                                                                                                                                                                                                                                                                                                                  >
                                                                                                                                                                                                                                                                                                                                                                                                                                                            Register
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </Link>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                          </p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                              </form>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                }