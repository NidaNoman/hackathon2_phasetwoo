"use client";

import React, { useState } from "react";
import { api } from "@/lib/api";
import { CreateTask } from "~/packages/types"; // Using path alias
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { Textarea } from "./ui/Textarea"; // Assuming we'll create a Textarea component

import { Plus, Loader2 } from "lucide-react"; // Import Lucide icons

interface CreateTaskFormProps {
  onTaskCreated: () => void;
}

export function CreateTaskForm({ onTaskCreated }: CreateTaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [titleError, setTitleError] = useState<string | null>(null);

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
      const newTask: CreateTask = { title, description };
      await api.post("/api/v1/tasks/", newTask, true); // `true` for authenticated
      setMessage("Task created successfully!");
      setTitle("");
      setDescription("");
      onTaskCreated(); // Call the callback to notify parent
    } catch (error: any) {
      console.error("Failed to create task:", error);
      setMessage(`Failed to create task: ${error.message}`);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
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
            placeholder="e.g., Buy groceries"
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
            placeholder="Optional details about the task"
          ></Textarea>
        </div>
        <Button type="submit" disabled={loading || !!titleError}>
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Plus className="mr-2 h-4 w-4" />
          )}
          {loading ? "Creating..." : "Create Task"}
        </Button>
      </form>
    </div>
  );
}