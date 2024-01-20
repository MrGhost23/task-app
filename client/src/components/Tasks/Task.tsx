import dateFormatter from "@/utils/dateFormatter";
import { calculateDaysDifference } from "@/utils/calculateDaysDifference";
import { TaskType } from "@/Types/TaskTypes";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineDateRange } from "react-icons/md";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/utils/hooks";
import { deleteTask } from "@/store/slices/tasksSlice";
import TaskForm from "@/components/TaskForm/TaskForm";
import Modal from "@/components/ui/Modal";
import { useState } from "react";

interface Props {
  task: TaskType;
}

const Task: React.FC<Props> = ({ task }) => {
  const today = new Date().toISOString().split("T")[0];
  const remainingDays = calculateDaysDifference(today, task.dueDate);

  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
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
        <div className="mt-4 flex flex-col sm:flex-row flex-wrap justify-between sm:items-center gap-y-4">
          <span className="flex flex-row items-center gap-2">
            <MdOutlineDateRange className="shrink-0 text-lg" />
            <div className="flex flex-row flex-wrap items-center gap-1">
              {dateFormatter(task.dueDate)}
              <span className="text-sm break-keep">({remainingDays}d left)</span>
            </div>
          </span>
          <div className="flex flex-row flex-wrap sm:flex-nowrap gap-2">
            <Button className="bg-sky-500" onClick={() => setIsModalOpen(true)}>
              Edit
            </Button>
            <Button
              className="bg-red-500"
              onClick={() => task.taskId && dispatch(deleteTask(task.taskId))}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <TaskForm setIsModalOpen={setIsModalOpen} taskToEdit={task} />
      </Modal>
    </>
  );
};
export default Task;
