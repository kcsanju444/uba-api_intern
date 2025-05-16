// src/controller/internshipController.ts

import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Internship } from "../entities/internshipentities";
import {User  } from "../entities/userentities";

export const getInternships = async (req: Request, res: Response) => {
  try {
    const internshipRepository = AppDataSource.getRepository(Internship);
    const internships = await internshipRepository.find({ relations: ["user"] });
    res.json(internships);
  } catch (error) {
    res.status(500).json({ message: "Error fetching internships", error });
  }
};
export const getUsers = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find({ relations: ["internships"] });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};
