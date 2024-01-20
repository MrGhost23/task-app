import Task from "@/components/Tasks/Task";
import { TaskType } from "@/Types/TaskTypes";

type Props = {
  tasks: TaskType[];
};

const Tasks: React.FC<Props> = ({ tasks }) => {
  return tasks.map((task) => {
    return <Task key={task.taskId} task={task} />;
  });
};

export default Tasks;
