import { IoIosSearch } from "react-icons/io";
import FilterType from "@/Types/FilterType";

type Props = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
};

const TasksSearchInput: React.FC<Props> = ({
  searchQuery,
  setSearchQuery,
  setFilter,
}) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="w-full flex flex-col sm:flex-row gap-x-4 gap-y-2">
      <input
        type="text"
        placeholder="Search for tasks"
        value={searchQuery}
        onChange={handleSearchChange}
        className="grow border-b border-gray-300 rounded-md p-2 outline-none focus:border-sky-500"
      />

      <button
        className="bg-sky-500 text-white text-md gap-1 rounded-md font-medium p-2 flex items-center"
        onClick={() =>
          setFilter({
            title: searchQuery.length > 0 ? searchQuery : undefined,
          })
        }
      >
        <IoIosSearch />
        Search
      </button>
    </div>
  );
};

export default TasksSearchInput;
