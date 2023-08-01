export const verifyText = (input: string) => {
  let trimmed = input.trim();
  if (trimmed === "") {
    return false;
  }
  return true;
};
