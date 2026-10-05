export const validateTask = (taskText) => {
  if (!taskText || taskText.trim() === '') {
    return false;
  }
  return true;
};