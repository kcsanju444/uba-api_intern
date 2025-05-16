import { AppDataSource } from "../data-source";
import { User } from "../entities/userentities";

export const getAllUsers = async () => {
  const userRepository = AppDataSource.getRepository(User);
  return userRepository.find({ relations: ["internships"] });
};

export const getUserById = async (id: number) => {
  const userRepository = AppDataSource.getRepository(User);
  return userRepository.findOne({
    where: { id },
    relations: ["internships"],
  });
};

export const createUser = async (data: { name: string; email: string }) => {
  const userRepository = AppDataSource.getRepository(User);
  const newUser = userRepository.create(data);
  return userRepository.save(newUser);
};

export const updateUser = async (id: number, data: Partial<{ name: string; email: string }>) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id });
  if (!user) return null;

  Object.assign(user, data);
  return userRepository.save(user);
};

export const deleteUser = async (id: number) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id });
  if (!user) return null;

  await userRepository.remove(user);
  return user;
};
