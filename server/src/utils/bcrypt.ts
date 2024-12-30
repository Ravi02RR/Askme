import bcrypt from "bcryptjs";

export const createHash = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export const comparePassword = async (
  inputPassword: string,
  storedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(inputPassword, storedPassword);
};
