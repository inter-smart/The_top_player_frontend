const isExpired = (date) => {
  const currentDate = new Date();
  const endDate = new Date(date);
  return currentDate > endDate;
};
export default isExpired;