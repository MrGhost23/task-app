import dateFormatter from "@/utils/dateFormatter";
import { calculateDaysDifference } from "@/utils/calculateDaysDifference";
import { TaskType } from "@/Types/TaskTypes";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineDateRange } from "react-icons/md";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/utils/hooks";
import { deleteTask } from "@/store/slices/tasksSlice";

interface Props {
  task: TaskType;
}

const Task: React.FC<Props> = ({ task }) => {
  const today = new Date().toISOString().split("T")[0];

  const dispatch = useAppDispatch();

  const remainingDays = calculateDaysDifference(today, task.dueDate);
  return (
    <div
      key={task.taskId}
      className={`group relative h-full bg-white ${
        task.isCompleted && "opacity-70 bg-green-200"
      } rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-200 ease-in-out p-4`}
    >
      <h2
        className={`text-xl font-bold ${
          task.isCompleted == true && "line-through"
        }`}
      >
        {task.isCompleted && (
          <IoMdCheckmarkCircleOutline
            className="absolute top-2 right-2 text-green-500"
            size={24}
          />
        )}
        {task.title}
      </h2>
      <p className="text-sm text-gray-500 capitalize">{task.category}</p>
      <p className="mt-2 text-gray-700">{task.description}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="flex items-center gap-2">
          <MdOutlineDateRange />
          {dateFormatter(task.dueDate)} ({remainingDays}d left)
        </span>
        <div className="flex gap-2">
          <Button className="bg-sky-500">Edit</Button>
          <Button
            className="bg-red-500"
            onClick={() => task.taskId && dispatch(deleteTask(task.taskId))}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Task;
