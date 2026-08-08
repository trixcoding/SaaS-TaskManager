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
  const [
    togglePending,
    startToggleTransition,
  ] = useTransition();

  const [
    deletePending,
    startDeleteTransition,
  ] = useTransition();

  const [
    optimisticCompleted,
    setOptimisticCompleted,
  ] = useOptimistic(completed);

  const [
    optimisticDeleted,
    setOptimisticDeleted,
  ] = useOptimistic(false);

  function toggle() {
    const formData = new FormData();
    formData.set("taskId", id);

    startToggleTransition(async () => {
      setOptimisticCompleted(
        !optimisticCompleted
      );

      await toggleTaskAction(formData);
    });
  }

  function remove() {
    const formData = new FormData();
    formData.set("taskId", id);

    startDeleteTransition(async () => {
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
        deletePending
          ? "opacity-50"
          : "opacity-100"
      }`}
    >
      {/* Task */}
      <button
        type="button"
        onClick={toggle}
        disabled={
          togglePending || deletePending
        }
        className="flex items-center gap-3"
      >
        <span
          className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${
            optimisticCompleted
              ? "border-blue bg-blue-600 text-white"
              : "border-gray-300"
          }`}
        >
          {optimisticCompleted ? "✓" : ""}
        </span>

        <span
          className={
            optimisticCompleted
              ? "text-blue-400 line-through"
              : "text-gray-400"
          }
        >
          {title}
        </span>
      </button>

      {/* Delete */}
      <button
        type="button"
        onClick={remove}
        disabled={
          togglePending || deletePending
        }
        className="text-sm text-red-600 disabled:opacity-50"
      >
        {deletePending
          ? "Deleting..."
          : "Delete"}
      </button>
    </div>
  );
}