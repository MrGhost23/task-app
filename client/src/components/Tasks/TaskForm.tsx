const TaskForm = () => {
  return (
    <div className="px-8 mb-4 lg:mb-0 pb-12 lg:pb-0">
      <h2 className="text-2xl font-bold mb-4">Create Task</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
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
            className="border border-gray-300 outline-none focus:border-sky-500 rounded-md p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-sky-500 text-white rounded-md p-2 w-full"
        >
          Create
        </button>
      </form>
    </div>
  );
};
export default TaskForm;
