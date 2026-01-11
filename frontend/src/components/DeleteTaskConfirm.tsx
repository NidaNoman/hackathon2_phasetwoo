"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/AlertDialog"; // Assuming AlertDialog components exist
import { Button } from "./ui/Button";
import { api } from "@/lib/api";

interface DeleteTaskConfirmProps {
  taskId: number;
  taskTitle: string;
  onDeleteSuccess: (taskId: number) => void;
  children: React.ReactNode; // To wrap the trigger button
}

export function DeleteTaskConfirm({
  taskId,
  taskTitle,
  onDeleteSuccess,
  children,
}: DeleteTaskConfirmProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/api/v1/tasks/${taskId}/`, true);
      onDeleteSuccess(taskId);
      setIsOpen(false); // Close dialog on success
    } catch (err: any) {
      console.error("Failed to delete task:", err);
      setError(`Failed to delete task: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your task:{" "}
            <span className="font-semibold text-foreground">{taskTitle}</span>.
            {error && <p className="text-destructive text-sm mt-2">{error}</p>}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={loading} className="bg-destructive hover:bg-destructive/90">
            {loading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}