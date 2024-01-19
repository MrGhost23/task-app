import { useEffect, useState } from "react";
import axios from "axios";
import { ApiError, ApiResponse, TaskType } from "@/Types/TaskTypes";
import Loading from "@/components/ui/loading";
import Task from "@/components/Tasks/Task";
import TaskForm from "@/components/Tasks/TaskForm";

const Tasks = () => {
  const localToken = localStorage.getItem("token");

  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response: ApiResponse = await axios.get(
          "http://localhost:5000/tasks/",
          {
            headers: {
              Authorization: `Bearer ${localToken}`,
            },
          }
        );
        if (response.error) {
          return;
        }
        setTasks(response.data);
        setLoading(false);
      } catch (error) {
        setError(error as ApiError);
        setLoading(false);
      }
    };
    fetchTasks();
  }, [localToken]);

  const handleEdit = (taskId: string) => {
    // Handle edit functionality
  };

  const handleDelete = (taskId: string) => {
    // Handle delete functionality
  };

  const handleComplete = (taskId: string) => {
    // Handle mark as completed functionality
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3">
      <TaskForm />
      <div className="px-8 col-span-2">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Tasks</h1>
          <div className="flex items-center">
            <span className="mr-4 text-sky-500 font-bold border-b-2 border-b-sky-200">
              UnCompleted
            </span>
            <span>Completed</span>
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search for tasks"
            className="border-b border-gray-300 rounded-md p-2 outline-none focus:border-sky-500 flex-grow mr-4"
          />
          <button className="bg-sky-500 text-white rounded-md p-2 flex items-center">
            <svg
              className="h-5 w-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            New Task
          </button>
        </div>
        {error && error.message && (
          <p className="text-red-500">{error.message}</p>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {loading ? (
            <>
              <Loading />
              <Loading />
            </>
          ) : (
            tasks.map((task) => {
              return <Task key={task._id} task={task} />;
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
