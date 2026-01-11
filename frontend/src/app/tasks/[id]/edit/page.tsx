"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Task } from "~/packages/types";
import { UpdateTaskForm } from "@/components/UpdateTaskForm"; // Assuming this component will be created
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

interface EditTaskPageProps {
  params: {
    id: string;
  };
}

export default function EditTaskPage({ params }: EditTaskPageProps) {
  const router = useRouter();
  const taskId = parseInt(params.id);
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isNaN(taskId)) {
      setError("Invalid Task ID.");
      setLoading(false);
      return;
    }

    const fetchTask = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedTask = await api.get<Task>(`/api/v1/tasks/${taskId}/`, true);
        setTask(fetchedTask);
      } catch (err: any) {
        console.error("Failed to fetch task:", err);
        setError(`Failed to load task: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [taskId]);

  const handleTaskUpdated = () => {
    router.push("/tasks"); // Redirect to tasks list after successful update
  };

  if (loading) {
    return (
      <Card className="shadow-lg p-6 text-center">
        <CardTitle>Loading Task...</CardTitle>
        <p className="text-muted-foreground mt-2">Please wait while we fetch the task details.</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="shadow-lg p-6 text-center border-destructive">
        <CardTitle className="text-destructive">Error</CardTitle>
        <p className="text-muted-foreground mt-2">{error}</p>
        <Button onClick={() => router.push("/tasks")} className="mt-4">Back to Tasks</Button>
      </Card>
    );
  }

  if (!task) {
    return (
      <Card className="shadow-lg p-6 text-center">
        <CardTitle>Task Not Found</CardTitle>
        <p className="text-muted-foreground mt-2">The task you are looking for does not exist.</p>
        <Button onClick={() => router.push("/tasks")} className="mt-4">Back to Tasks</Button>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Edit Task</CardTitle>
      </CardHeader>
      <CardContent>
        <UpdateTaskForm task={task} onTaskUpdated={handleTaskUpdated} />
      </CardContent>
    </Card>
  );
}