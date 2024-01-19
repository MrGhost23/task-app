export const calculateDaysDifference = (
  startDate: string,
  endDate: string
): number | string => {
  const start: Date = new Date(startDate);
  const end: Date = new Date(endDate);

  // Calculate the difference in milliseconds
  const differenceInMs: number = end.getTime() - start.getTime();

  // Calculate the number of days
  const daysDifference: number = Math.floor(
    differenceInMs / (1000 * 60 * 60 * 24)
  );

  return daysDifference;
};