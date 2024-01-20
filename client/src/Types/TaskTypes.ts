import { Key } from "react";

export interface TaskType {
  taskId: string | Key | null | undefined;
  title: string;
  description: string;
  dueDate: string;
  category: string;
  isCompleted?: boolean;
  createdBy?: string;
}

export interface ApiResponse {
  data: TaskType[];
  error?: string;
}

export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
}
