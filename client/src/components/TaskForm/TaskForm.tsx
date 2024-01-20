import { useAppDispatch } from "@/utils/hooks";
import { useState } from "react";
import { createTask } from "../../store/slices/tasksSlice";
import { TaskType } from "@/Types/TaskTypes";
import { editTask } from "@/store/slices/tasksSlice";

type Props = {
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  taskToEdit?: TaskType;
};

const TaskForm: React.FC<Props> = ({ setIsModalOpen, taskToEdit }) => {
  const today = new Date().toISOString().split("T")[0];

  const emptyTask = {
    taskId: "",
    title: "",
    description: "",
    dueDate: "",
    category: "",
  };

  const [task, setTask] = useState<TaskType>(taskToEdit || emptyTask);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setTask({
      ...task!,
      [event.target.name]: event.target.value,
    });
  };

  const dispatch = useAppDispatch();

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      setError(null);

      if (task?.title && task?.description && task?.dueDate && task?.category) {
        if (taskToEdit) {
          await dispatch(editTask(task));
        } else {
          await dispatch(createTask(task));
        }
        if (setIsModalOpen) setIsModalOpen(false);

        setTask(emptyTask);
      } else {
        setError("Please fill all the required fields.");
      }
    } catch (error) {
      setError("An error occurred while creating the task.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">
        {taskToEdit ? "Edit Task" : "Create Task"}
      </h2>
      <form className="space-y-4" onSubmit={submitHandler}>
        <div>
          <label htmlFor="title" className="block font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={task?.title}
            onChange={handleChange}
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
            value={task?.category}
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
            value={task?.description}
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
            value={taskToEdit ? task?.dueDate?.split("T")[0] : task?.dueDate}
            min={today}
            onChange={handleChange}
            className="border border-gray-300 outline-none focus:border-sky-500 rounded-md p-2 w-full"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-sky-500 text-white rounded-md p-2 w-full"
        >
          {isLoading ? "Loading..." : taskToEdit ? "Save" : "Create"}
        </button>
        {error && <p className="text-sm text-red-600 text-center">{error}</p>}
      </form>
    </div>
  );
};
export default TaskForm;
