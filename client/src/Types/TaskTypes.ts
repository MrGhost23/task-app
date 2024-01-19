export interface TaskType {
    _id: string;
    title: string;
    description: string;
    dueDate: string;
    isCompleted: boolean;
    category: string;
    createdBy: string; 
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