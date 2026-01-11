// "use client"; // Mark as Client Component

// import React, { useState, useEffect, useCallback } from "react";
// import { CreateTaskForm } from "@/components/CreateTaskForm";
// import { TaskList } from "@/components/TaskList";
// import { api } from "@/lib/api";
// import { Task } from "~/packages/types";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"; // Added CardHeader and CardTitle

// export default function TasksPage() {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchTasks = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const fetchedTasks = await api.get<Task[]>("/api/v1/tasks/", true); // `true` for authenticated
//       setTasks(fetchedTasks);
//     } catch (err: any) {
//       console.error("Failed to fetch tasks:", err);
//       setError(`Failed to fetch tasks: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchTasks();
//   }, [fetchTasks]);

//   // Function to refresh tasks after a new one is created
//   const handleTaskCreated = () => {
//     fetchTasks();
//   };

//   // Function to update task status in the local state
//   const handleTaskStatusChange = (
//     taskId: number,
//     newStatus: "pending" | "completed"
//   ) => {
//     setTasks((prevTasks) =>
//       prevTasks.map((task) =>
//         task.id === taskId ? { ...task, status: newStatus } : task
//       )
//     );
//   };

//   // Function to remove a task from the local state after deletion
//   const handleTaskDeleted = (deletedTaskId: number) => {
//     setTasks((prevTasks) => prevTasks.filter((task) => task.id !== deletedTaskId));
//   };

//   return (
//     <div className="container mx-auto py-8">
//       <h1 className="text-4xl font-bold mb-8">Your TaskFlow Dashboard</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {/* Create Task Form Section */}
//         <Card className="md:col-span-1 shadow-lg h-fit"> {/* h-fit to prevent card from expanding unnecessarily */}
//           <CardHeader>
//             <CardTitle>Create New Task</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <CreateTaskForm onTaskCreated={handleTaskCreated} />
//           </CardContent>
//         </Card>

//         {/* Task List Section */}
//         <div className="md:col-span-2">
//           <Card className="shadow-lg">
//             <CardHeader>
//               <CardTitle>Your Tasks</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <TaskList
//                 tasks={tasks}
//                 onStatusChange={handleTaskStatusChange}
//                 onTaskDeleted={handleTaskDeleted}
//                 isLoading={loading}
//                 error={error}
//                 onRetry={fetchTasks}
//               />
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import React from "react";
import { Task } from "~/packages/types";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/Dialog";

interface DeleteTaskConfirmProps {
  task: Task; // ✅ FIX: task prop added
  onConfirm: (deletedTaskId: number) => void;
  onCancel: () => void;
}

export default function DeleteTaskConfirm({
  task,
  onConfirm,
  onCancel,
}: DeleteTaskConfirmProps) {
  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>
        </DialogHeader>

        <p>
          Are you sure you want to delete{" "}
          <strong>{task.title}</strong>?
        </p>

        <DialogFooter className="flex gap-2 justify-end">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => onConfirm(task.id)}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
