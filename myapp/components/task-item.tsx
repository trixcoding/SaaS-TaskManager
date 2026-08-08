"use client";

import { useTransition } from "react";

import {
  deleteTaskAction,
  toggleTaskAction,
} from "../../actions/task";

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

  function toggle() {
    const formData = new FormData();

    formData.set("taskId", id);

    startTransition(async () => {
      await toggleTaskAction(formData);
    });
  }

  function remove() {
    const formData = new FormData();

    formData.set("taskId", id);

    startTransition(async () => {
      await deleteTaskAction(formData);
    });
  }

  return (
    <div className="flex items-center justify-between rounded-lg border bg-white p-4">
      <button
        onClick={toggle}
        disabled={pending}
        className="flex items-center gap-3"
      >
        <span
          className={`flex h-5 w-5 items-center justify-center rounded border ${
            completed ? "bg-black text-white" : ""
          }`}
        >
          {completed ? "✓" : ""}
        </span>

        <span
          className={
            completed
              ? "text-gray-400 line-through"
              : ""
          }
        >
          {title}
        </span>
      </button>

      <button
        onClick={remove}
        disabled={pending}
        className="text-sm text-red-600"
      >
        Delete
      </button>
    </div>
  );
}