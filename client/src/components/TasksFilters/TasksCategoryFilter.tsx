import FilterType from "@/Types/FilterType";
type Props = {
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
};

const TasksCategoryFilter: React.FC<Props> = ({ setFilter }) => {
  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const category = event.target.value;
    if (category === "all") {
      setFilter({});
    } else {
      setFilter({ category });
    }
  };

  return (
    <select
      onChange={handleCategoryChange}
      className="w-full sm:w-fit border border-gray-300 rounded-md p-2 outline-none"
    >
      <option value="all" className="py-1">
        All
      </option>
      <option value="personal" className="py-1">
        Personal
      </option>
      <option value="work" className="py-1">
        Work
      </option>
      <option value="shopping" className="py-1">
        Shopping
      </option>
      <option value="others" className="py-1">
        Others
      </option>
    </select>
  );
};

export default TasksCategoryFilter;
