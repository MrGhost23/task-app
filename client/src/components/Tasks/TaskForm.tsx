import { useAppDispatch } from "@/utils/hooks";
import { useTasks } from "@/utils/useTasks";
import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { createTask } from "../../store/slices/tasksSlice";

interface Task {
  title: string;
  description: string;
  dueDate: string;
  category: string;
}

const TaskForm = () => {
  const initialTaskState = {
    title: "",
    description: "",
    dueDate: "",
    category: "",
  };
  const [task, setTask] = useState<Task>(initialTaskState);

  const [isLoading, setIsLoading] = useState(false);

  const { fetchTasks } = useTasks();
  const dispatch = useAppDispatch();

  const TaskCreator = async (task: Task) => {
    try {
      await dispatch(createTask(task));
      setTask(initialTaskState);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setTask({
      ...task,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    if (task.title && task.description && task.dueDate && task.category) {
      TaskCreator(task);
    }
  };

  return (
    <div className="px-0 md:px-8 mb-4 lg:mb-0 pb-12 lg:pb-0">
      <h2 className="text-2xl font-bold mb-4">Create Task</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className="block font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={task.title}
            onChange={handleChange}
            name="title"
            className="border border-gray-300 rounded-md p-2 w-full outline-none focus:border-sky-500"
            placeholder="Enter task title"
          />
        </div>
        <div>
          <label htmlFor="category" className="block font-medium">
            Category
          </label>
          <select
            id="category"
            name="category"
            onChange={handleChange}
            value={task.category}
            className="border border-gray-300 rounded-md outline-none focus:border-sky-500 p-2 w-full"
          >
            <option value="">Select category</option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="shopping">Shopping</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="description" className="block font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            className="border resize-none border-gray-300 rounded-md p-2 w-full outline-none focus:border-sky-500"
            placeholder="Enter task description"
          ></textarea>
        </div>
        <div>
          <label htmlFor="dueDate" className="block font-medium">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            className="border border-gray-300 outline-none focus:border-sky-500 rounded-md p-2 w-full"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-sky-500 text-white rounded-md p-2 w-full"
        >
          Create
        </button>
      </form>
    </div>
  );
};
export default TaskForm;
