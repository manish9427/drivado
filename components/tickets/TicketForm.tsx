"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ticketSchema,
  type TicketFormValues,
} from "@/lib/validation/ticket";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  defaultValues?: Partial<TicketFormValues>;
  mode: "create" | "edit";
  ticketId?: string;
};

export function TicketForm({ defaultValues, mode, ticketId }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TicketFormValues>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "open",
      priority: 3,
      assignee: "",
      ...defaultValues,
    },
  });

  const onSubmit = async (values: TicketFormValues) => {
    try {
      setIsSubmitting(true);
      const res = await fetch(
        mode === "create" ? "/api/tickets" : `/api/tickets/${ticketId}`,
        {
          method: mode === "create" ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );
      if (!res.ok) throw new Error("Failed");

      const ticket = await res.json();
      router.push(`/tickets/${ticket.id}`);
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-lg border bg-white p-4"
    >
      <div>
        <label className="block text-xs font-medium text-gray-700">
          Title
        </label>
        <input
          {...register("title")}
          className="mt-1 w-full rounded border px-3 py-1.5 text-sm"
        />
        {errors.title && (
          <p className="mt-1 text-xs text-red-600">
            {errors.title.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700">
          Description
        </label>
        <textarea
          {...register("description")}
          className="mt-1 w-full rounded border px-3 py-1.5 text-sm"
          rows={4}
        />
        {errors.description && (
          <p className="mt-1 text-xs text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div>
          <label className="block text-xs font-medium text-gray-700">
            Status
          </label>
          <select
            {...register("status")}
            className="mt-1 w-full rounded border px-3 py-1.5 text-sm"
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
          {errors.status && (
            <p className="mt-1 text-xs text-red-600">
              {errors.status.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700">
            Priority (1–5)
          </label>
          <input
            type="number"
            min={1}
            max={5}
            {...register("priority", { valueAsNumber: true })}
            className="mt-1 w-full rounded border px-3 py-1.5 text-sm"
          />
          {errors.priority && (
            <p className="mt-1 text-xs text-red-600">
              {errors.priority.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700">
            Assignee (optional)
          </label>
          <input
            {...register("assignee")}
            className="mt-1 w-full rounded border px-3 py-1.5 text-sm"
          />
          {errors.assignee && (
            <p className="mt-1 text-xs text-red-600">
              {errors.assignee.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded border px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-black px-4 py-1.5 text-xs font-medium text-white disabled:opacity-60"
        >
          {mode === "create" ? "Create Ticket" : "Update Ticket"}
        </button>
      </div>
    </form>
  );
}
