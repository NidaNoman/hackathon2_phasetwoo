"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { api } from "@/lib/api";
import { Task } from "~/packages/types";
import { DeleteTaskConfirm } from "@/components/DeleteTaskConfirm";
import Link from "next/link";

export default function TaskDetailPage() {
  const router = useRouter();
  const params = useParams();
  const taskId = params.id as string;

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const fetchTask = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedTask = await api.get<Task>(`/api/v1/tasks/${taskId}`, true);
      setTask(fetchedTask);
    } catch (err: any) {
      console.error("Failed to fetch task:", err);
      setError(`Failed to fetch task: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [taskId]);

  useEffect(() => {
    if (taskId) {
      fetchTask();
    }
  }, [taskId, fetchTask]);


  const handleTaskDeleted = (deletedTaskId: number) => {
    router.push("/tasks"); // Redirect to task list after deletion
  };


  if (loading) {
    return <div className="container mx-auto p-4">Loading task...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  }

  if (!task) {
    return <div className="container mx-auto p-4">Task not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Details</h1>
      <div className="p-4 border rounded-md shadow-sm">
        <h3 className="text-xl font-semibold">{task.title}</h3>
        {task.description && (
          <p className="text-gray-700 mt-2">{task.description}</p>
        )}
        <p
          className={`text-md font-medium mt-2 ${
            task.status === "completed" ? "text-green-600" : "text-yellow-600"
          }`}
        >
          Status: {task.status}
        </p>

        <div className="mt-4 flex space-x-2">
          <Link
            href={`/tasks/${task.id}/edit`}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700"
          >
            Edit
          </Link>
          <DeleteTaskConfirm
            taskId={task.id}
            taskTitle={task.title}
            onDeleteSuccess={handleTaskDeleted}
          >
            <button
              className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md shadow-sm hover:bg-red-700"
            >
              Delete
            </button>
          </DeleteTaskConfirm>
        </div>
      </div>
    </div>
  );
}
