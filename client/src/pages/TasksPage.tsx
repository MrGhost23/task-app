import { useEffect, useState } from "react";
import TaskForm from "@/components/TaskForm/TaskForm";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { fetchTasks } from "@/store/slices/tasksSlice";
import Tasks from "@/components/Tasks/Tasks";
import TasksStatusFilter from "@/components/TasksFilters/TasksStatusFilter";
import FilterType from "@/Types/FilterType";
import TasksSearchInput from "@/components/TasksFilters/TasksSearchInput";
import TasksCategoryFilter from "@/components/TasksFilters/TasksCategoryFilter";
import TasksSkeletons from "@/skeletons/TasksSkeletons";
import Modal from "@/components/ui/Modal";
import { FaPlus } from "react-icons/fa";

const TasksPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filter, setFilter] = useState<FilterType>({});

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTasks(filter));
  }, [dispatch, filter]);

  const { tasks, loading, error } = useAppSelector((state) => state.tasks);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="mt-24 w-full px-8 grid grid-cols-1 lg:grid-cols-3 lg:gap-10">
      <div className="hidden lg:block h-fit sticky top-[6.2rem]">
        <TaskForm />
      </div>
      <Button
        className="lg:hidden bg-sky-500 w-full my-8 flex flex-row gap-2"
        onClick={() => setIsModalOpen(true)}
      >
        <FaPlus />
        <span className="text-lg font-semibold">New Task</span>
      </Button>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <TaskForm setIsModalOpen={setIsModalOpen} />
      </Modal>

      <div className="col-span-2">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0">
          <h1 className="flex flex-row items-center gap-2 text-3xl font-bold">
            Tasks
            {tasks.length > 0 && (
              <span className="text-xl">({tasks.length})</span>
            )}
          </h1>
          <TasksStatusFilter filter={filter} setFilter={setFilter} />
        </div>
        <hr className="my-4" />
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
          <TasksSearchInput
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setFilter={setFilter}
          />
          <TasksCategoryFilter setFilter={setFilter} />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pb-8">
          {loading ? (
            <TasksSkeletons number={3} />
          ) : tasks.length === 0 ? (
            <p className="text-gray-800 font-medium">
              There're No Tasks To Show!
            </p>
          ) : (
            <Tasks tasks={tasks} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
