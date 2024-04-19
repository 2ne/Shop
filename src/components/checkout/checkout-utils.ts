// 'currentDate' allows for age calculations based on a specific date and defaults to the current date if not provided
export const calculateAge = (
  dob: Date | string,
  currentDate: Date = new Date()
): number => {
  // Convert the dob input to a Date object
  const birthDate = new Date(dob);

  // Calculate the difference in years between the currentDate and the birthDate
  const yearsDifference = currentDate.getFullYear() - birthDate.getFullYear();

  // Determine if the person's birthday has not been reached yet this year
  const isBirthdayNotReached =
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate());

  // Calculate the age, considering if the birthday has not been reached yet
  const age = isBirthdayNotReached ? yearsDifference - 1 : yearsDifference;

  return age;
};
