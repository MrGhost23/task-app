import { useEffect, useState } from "react";
import Loading from "@/components/ui/loading";
import Task from "@/components/Tasks/Task";
import TaskForm from "@/components/Tasks/TaskForm";
import { useMediaQuery } from "react-responsive";
import { Button } from "@/components/ui/button";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import Modal from "react-modal";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { fetchTasks } from "@/store/slices/tasksSlice";

const Tasks = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const dispatch = useAppDispatch();

  const { tasks, loading, error } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)",
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("closeModal is being called");
    setIsModalOpen(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

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
      {isDesktopOrLaptop && (
        <div className="hidden lg:block">
          <TaskForm />
        </div>
      )}
      {!isDesktopOrLaptop && (
        <div className="flex justify-center items-center">
          <Button className="bg-sky-500 w-full mx-12 my-8" onClick={openModal}>
            <IoMdAdd className="text-xl" />
            <h2>Create Task</h2>
            <Modal
              isOpen={isModalOpen}
              onRequestClose={() => setIsModalOpen(false)}
              shouldCloseOnOverlayClick={true}
              shouldCloseOnEsc={true}
              shouldFocusAfterRender={true}
              shouldReturnFocusAfterClose={true}
              ariaHideApp={false}
              contentLabel="Task Modal"
            >
              <button onClick={closeModal} className="absolute right-4">
                <IoMdClose className="text-2xl" />
              </button>
              <TaskForm />
            </Modal>
          </Button>
        </div>
      )}

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
            value={searchQuery}
            onChange={handleSearchChange}
            className="border-b border-gray-300 rounded-md p-2 outline-none focus:border-sky-500 flex-grow mr-4"
          />
          <button className="bg-sky-500 text-white text-md gap-1 rounded-md font-medium p-2 flex items-center">
            <IoIosSearch />
            Search
          </button>
        </div>
        {error && error.message && (
          <p className="text-red-500">{error.message}</p>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pb-8">
          {loading ? (
            <>
              <Loading />
              <Loading />
            </>
          ) : (
            tasks.map((task) => {
              return <Task key={task.taskId} task={task} />;
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
