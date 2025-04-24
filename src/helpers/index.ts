import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const SALT_ROUNDS = 10;  // You can adjust the number of salt rounds as needed

// Generate a random salt using bcrypt
export const random = async (): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return salt;
};

// Hash the password using bcrypt
export const authentication = async (salt: string, password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
