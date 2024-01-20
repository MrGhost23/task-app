import FilterType from "@/Types/FilterType";

type Props = {
  filter: FilterType;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
};

const TasksStatusFilter: React.FC<Props> = ({ filter, setFilter }) => {
  const filters = [
    { id: 1, text: "all", value: undefined, onClickValue: {} },
    {
      id: 2,
      text: "uncompleted",
      value: false,
      onClickValue: { isCompleted: false },
    },
    {
      id: 3,
      text: "completed",
      value: true,
      onClickValue: { isCompleted: true },
    },
  ];

  return (
    <div className="flex items-center">
      {filters.map((f) => (
        <span
          key={f.id}
          onClick={() => setFilter(f.onClickValue)}
          className={`mr-4 font-bold capitalize border-b-2 cursor-pointer ${
            filter.isCompleted === f.value
              ? "border-b-sky-200 text-sky-500"
              : ""
          }`}
        >
          {f.text}
        </span>
      ))}
    </div>
  );
};

export default TasksStatusFilter;
