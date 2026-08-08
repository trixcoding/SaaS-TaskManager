"use client";

import { useActionState } from "react";

import { createProjectAction } from "../actions/project"

export default function CreateProjectForm() {
  const [state, formAction, pending] =
      useActionState(createProjectAction, null);

        return (
            <form
                  action={formAction}
                        className="flex gap-1"
                            >
                                  <input
                                          name="name"
                                                  placeholder="Project name"
                                                          required
                                                                  className="flex-1 rounded-lg border px-2 py-3"
                                                                        />

                                                                              <button
                                                                                      type="submit"
                                                                                              disabled={pending}
                                                                                                      className="rounded-lg bg-blue-400 px-2 py-3 text-white disabled:opacity-50"
                                                                                                            >
                                                                                                                    {pending ? "Creating..." : "Create"}
                                                                                                                          </button>

                                                                                                                                {state?.error && (
                                                                                                                                        <p className="text-sm text-red-600">
                                                                                                                                                  {state.error}
                                                                                                                                                          </p>
                                                                                                                                                                )}
                                                                                                                                                                    </form>
                                                                                                                                                                      );
                                                                                                                                                                      }