const dateFormatter = (inputDate: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  const [year, month, day] = inputDate.split("-");
  const formattedDate: string = new Date(
    `${year}-${month}-${day}`
  ).toLocaleDateString("en-US", options);
  return formattedDate;
};

export default dateFormatter;
