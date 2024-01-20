import dateFormatter from "@/utils/dateFormatter";
import { calculateDaysDifference } from "@/utils/calculateDaysDifference";
import { TaskType } from "@/Types/TaskTypes";

interface Props {
  task: TaskType;
}

const Task: React.FC<Props> = ({ task }) => {
  const today = new Date().toISOString().split("T")[0];

  const remainingDays = calculateDaysDifference(today, task.dueDate);
  return (
    <div
      key={task.taskId}
      className="group relative h-full bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition duration-200 ease-in-out p-4"
    >
      <h2 className="text-xl font-bold">{task.title}</h2>
      <p className="text-sm text-gray-500 capitalize">{task.category}</p>
      <p className="mt-2 text-gray-700">{task.description}</p>
      <div className="mt-4 flex justify-between items-center">
        <span>
          Due Date: {dateFormatter(task.dueDate)} ({remainingDays}d left)
        </span>
        <div>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </div>
    </div>
  );
};
export default Task;
