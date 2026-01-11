"use client";

import React, { useState } from "react";

import { Task } from "~/packages/types";

import Link from "next/link";

import { api } from "@/lib/api";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/Card";

import { Button } from "./ui/Button";

import { cn } from "@/lib/utils";

import { Check, RotateCw, Edit, Trash2, Loader2 } from "lucide-react"; // Import Lucide icons



import { DeleteTaskConfirm } from "./DeleteTaskConfirm"; // Add this import



interface TaskItemProps {

  task: Task;

  onStatusChange: (taskId: number, newStatus: "pending" | "completed") => void;

  onTaskDeleted: (taskId: number) => void;

}



export function TaskItem({ task, onStatusChange, onTaskDeleted }: TaskItemProps) {

  const [loadingStatus, setLoadingStatus] = useState(false);

  const [error, setError] = useState<string | null>(null);



  const handleStatusToggle = async () => {

    setLoadingStatus(true);

    setError(null);

    const newStatus = task.status === "pending" ? "completed" : "pending";

    try {

      await api.put(`/api/v1/tasks/${task.id}/`, { status: newStatus }, true);

      onStatusChange(task.id, newStatus);

    } catch (err: any) {

      console.error("Failed to update task status:", err);

      setError(`Failed to update status: ${err.message}`);

    } finally {

      setLoadingStatus(false);

    }

  };



  return (

    <Card className={cn("flex flex-col shadow-md", task.status === "completed" && "opacity-70")}>

      <CardHeader>

        <CardTitle className={cn(task.status === "completed" && "line-through text-muted-foreground")}>

          <Link href={`/tasks/${task.id}/edit`} className="hover:underline">

            {task.title}

          </Link>

        </CardTitle>

        {task.description && (

          <CardDescription className={cn(task.status === "completed" && "line-through")}>

            {task.description}

          </CardDescription>

        )}

        {error && <p className="text-destructive text-sm mt-1">{error}</p>}

      </CardHeader>

      <CardContent className="flex-grow">

        <span

          className={cn(

            "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold",

            task.status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"

          )}

        >

          {task.status === "completed" ? "Completed" : "Pending"}

        </span>

      </CardContent>

      <CardFooter className="flex justify-end gap-2">

        <Button

          onClick={handleStatusToggle}

          disabled={loadingStatus}

          variant="outline"

          size="sm"

        >

          {loadingStatus ? (

            <Loader2 className="mr-2 h-4 w-4 animate-spin" />

          ) : task.status === "completed" ? (

            <RotateCw className="mr-2 h-4 w-4" />

          ) : (

            <Check className="mr-2 h-4 w-4" />

          )}

          {loadingStatus

            ? "Updating..."

            : task.status === "completed"

            ? "Mark Pending"

            : "Mark Complete"}

        </Button>

        <Button asChild variant="secondary" size="sm">

          <Link href={`/tasks/${task.id}/edit`}>

            <Edit className="mr-2 h-4 w-4" /> Edit

          </Link>

        </Button>

        <DeleteTaskConfirm

          taskId={task.id}

          taskTitle={task.title}

          onDeleteSuccess={onTaskDeleted}

        >

          <Button

            variant="destructive"

            size="sm"

          >

            <Trash2 className="mr-2 h-4 w-4" /> Delete

          </Button>

        </DeleteTaskConfirm>

      </CardFooter>

    </Card>

  );

}