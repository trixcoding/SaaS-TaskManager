"use client";

import { useActionState } from "react";

import { createTaskAction } from "../actions/task";

type Props = {
  projectId: string;
  };

  export default function CreateTaskForm({
    projectId,
    }: Props) {
      const [state, formAction, pending] =
          useActionState(createTaskAction, null);

            return (
                <form
                      action={formAction}
                            className="flex gap-1"
                                >
                                      <input
                                              type="hidden"
                                                      name="projectId"
                                                              value={projectId}
                                                                    />

                                                                          <input
                                                                                  name="title"
                                                                                          placeholder="Task title"
                                                                                                  required
                                                                                                          className="flex-1  text-gray-500 rounded-lg border px-2 py-3"
                                                                                                                />

                                                                                                                      <button
                                                                                                                              type="submit"
                                                                                                                                      disabled={pending}
                                                                                                                                              className="rounded-lg bg-blue-400 px-4 py-3 text-white disabled:opacity-50"
                                                                                                                                                    >
                                                                                                                                                            {pending ? "Adding..." : "Add"}
                                                                                                                                                                  </button>

                                                                                                                                                                        {state?.error && (
                                                                                                                                                                                <p className="text-sm text-red-600">
                                                                                                                                                                                          {state.error}
                                                                                                                                                                                                  </p>
                                                                                                                                                                                                        )}
                                                                                                                                                                                                            </form>
                                                                                                                                                                                                              );
                                                                                                                                                                                                              }