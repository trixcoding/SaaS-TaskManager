"use client";

import {
  useOptimistic,
  useTransition,
} from "react";

import {
  deleteTaskAction,
  toggleTaskAction,
} from "../actions/task";

type Props = {
  id: string;
  title: string;
  completed: boolean;
};

export default function TaskItem({
  id,
  title,
  completed,
}: Props) {
  const [pending, startTransition] =
    useTransition();

  const [optimisticCompleted, setOptimisticCompleted] =
    useOptimistic(completed);

  const [optimisticDeleted, setOptimisticDeleted] =
    useOptimistic(false);

  function toggle() {
    const formData = new FormData();

    formData.set("taskId", id);

    startTransition(async () => {
      setOptimisticCompleted(
        !optimisticCompleted
      );

      await toggleTaskAction(formData);
    });
  }

  function remove() {
    const formData = new FormData();

    formData.set("taskId", id);

    startTransition(async () => {
      setOptimisticDeleted(true);

      await deleteTaskAction(formData);
    });
  }

  if (optimisticDeleted) {
    return null;
  }

  return (
    <div
      className={`flex items-center justify-between rounded-lg border bg-white p-4 transition-opacity ${
        pending ? "opacity-60" : "opacity-100"
      }`}
    >
      <button
        type="button"
        onClick={toggle}
        disabled={pending}
        className="flex items-center gap-3"
      >
        <span
          className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${
            optimisticCompleted
              ? "border-black bg-black text-white"
              : "border-gray-300"
          }`}
        >
          {optimisticCompleted ? "✓" : ""}
        </span>

        <span
          className={
            optimisticCompleted
              ? "text-gray-400 line-through"
              : ""
          }
        >
          {title}
        </span>
      </button>

      <button
        type="button"
        onClick={remove}
        disabled={pending}
        className="text-sm text-red-600 disabled:opacity-50"
      >
        {pending ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}