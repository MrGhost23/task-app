import TaskSkeleton from "@/skeletons/TaskSkeleton";

type Props = {
  number: number;
};

const TasksSkeletons: React.FC<Props> = ({ number }) => {
  return (
    <>
      {Array.from({ length: number }).map((_, index) => (
        <TaskSkeleton key={index} />
      ))}
    </>
  );
};

export default TasksSkeletons;
