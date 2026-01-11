import React from "react";
import { Task } from "~/packages/types"; // Using path alias
import { TaskItem } from "./TaskItem"; // Import the new TaskItem component
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "./ui/Card";
import { Button } from "./ui/Button"; // Assuming a Button component

interface TaskListProps {
  tasks: Task[];
  onStatusChange: (taskId: number, newStatus: "pending" | "completed") => void;
  onTaskDeleted: (taskId: number) => void;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export function TaskList({ tasks, onStatusChange, onTaskDeleted, isLoading, error, onRetry }: TaskListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="h-6 bg-muted rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-muted rounded w-1/2 animate-pulse mt-1"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-muted rounded w-1/3 animate-pulse"></div>
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <div className="h-8 w-20 bg-muted rounded animate-pulse"></div>
              <div className="h-8 w-12 bg-muted rounded animate-pulse"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6 border border-destructive rounded-lg bg-destructive/10 text-destructive space-y-3">
        <p className="font-semibold text-lg">Error loading tasks!</p>
        <p className="text-sm">{error}</p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline" className="mt-4">
            Try Again
          </Button>
        )}
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <Card className="text-center p-6 space-y-3">
        <CardTitle>No tasks found.</CardTitle>
        <CardDescription>Start by creating a new task above!</CardDescription>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onStatusChange={onStatusChange}
          onTaskDeleted={onTaskDeleted}
        />
      ))}
    </div>
  );
}