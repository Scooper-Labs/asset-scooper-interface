export const checkDateRange = (lastVisit: string, weeks: number): boolean => {
  const lastVisitDate = new Date(lastVisit);
  const currentDate = new Date();
  const weekInMilliseconds = 7 * 24 * 60 * 60 * 1000; // 1 week in milliseconds

  // Calculate the date range
  const rangeStartDate = new Date(
    lastVisitDate.getTime() + weeks * weekInMilliseconds
  );

  // Check if the current date is greater than or equal to the range start date
  return currentDate >= rangeStartDate;
};
