"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Task, UpdateTask, TaskStatus } from "~/packages/types";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { Textarea } from "./ui/Textarea";
import { RadioGroup, RadioGroupItem } from "./ui/RadioGroup"; // Assuming this component exists or needs creation

import { Plus, Loader2 } from "lucide-react"; // Import Loader2 icon

interface UpdateTaskFormProps {
  task: Task;
  onTaskUpdated: () => void;
}

export function UpdateTaskForm({ task, onTaskUpdated }: UpdateTaskFormProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [titleError, setTitleError] = useState<string | null>(null);

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description || "");
    setStatus(task.status);
  }, [task]);

  const validateForm = () => {
    let isValid = true;
    if (!title.trim()) {
      setTitleError("Title is required.");
      isValid = false;
    } else if (title.trim().length < 1) {
      setTitleError("Title must be at least 1 character long.");
      isValid = false;
    } else if (title.trim().length > 255) {
      setTitleError("Title cannot exceed 255 characters.");
      isValid = false;
    } else {
      setTitleError(null);
    }
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsError(false);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const updatedTask: UpdateTask = { title, description, status };
      await api.put(`/api/v1/tasks/${task.id}/`, updatedTask, true);
      setMessage("Task updated successfully!");
      setIsError(false);
      onTaskUpdated(); // Call the callback to notify parent and redirect
    } catch (error: any) {
      console.error("Failed to update task:", error);
      setMessage(`Failed to update task: ${error.message}`);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {message && (
          <div
            className={`p-3 rounded-md ${
              isError ? "bg-destructive/20 text-destructive" : "bg-green-100 text-green-700"
            }`}
          >
            {message}
          </div>
        )}
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (titleError) setTitleError(null);
            }}
            required
            disabled={loading}
          />
          {titleError && <p className="text-destructive text-sm mt-1">{titleError}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
          ></Textarea>
        </div>
        <div className="grid gap-2">
          <Label>Status</Label>
          <RadioGroup value={status} onValueChange={(value: TaskStatus) => setStatus(value)} disabled={loading}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pending" id="status-pending" />
              <Label htmlFor="status-pending">Pending</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="completed" id="status-completed" />
              <Label htmlFor="status-completed">Completed</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onTaskUpdated} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading || !!titleError}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Update Task"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}