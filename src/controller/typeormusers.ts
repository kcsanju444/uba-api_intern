import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/userentities";

const userRepo = AppDataSource.getRepository(User);

export async function getUsers(req: Request, res: Response) {
  const users = await userRepo.find({ relations: ["internships"] });
  res.json(users);
}

export async function getUserById(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const user = await userRepo.findOne({ where: { id }, relations: ["internships"] });
  if (!user) return res.status(404).send("User not found");
  res.json(user);
}

export async function createUser(req: Request, res: Response) {
  const { name, email } = req.body;
  const user = userRepo.create({ name, email });
  await userRepo.save(user);
  res.status(201).json(user);
}

export async function updateUser(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  const user = await userRepo.findOneBy({ id });
  if (!user) return res.status(404).send("User not found");
  user.name = name;
  user.email = email;
  await userRepo.save(user);
  res.json(user);
}

export async function deleteUser(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const result = await userRepo.delete(id);
  if (result.affected === 0) return res.status(404).send("User not found");
  res.status(204).send();
}
