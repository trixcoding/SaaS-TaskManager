"use client";

import { useTransition } from "react";
import { deleteProjectAction } from "../actions/project";

type Props = {
  projectId: string;
};

export default function DeleteProjectButton({
  projectId,
}: Props) {
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    const formData = new FormData();

    formData.set("projectId", projectId);

    startTransition(async () => {
      await deleteProjectAction(formData);
    });
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={pending}
      className="text-xs text-red-600 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? "Deleting..." : "Delete Project"}
    </button>
  );
}