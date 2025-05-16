import { Response } from "express";
import { AppDataSource } from "../data-source";
import { Internship } from "../entities/internshipentities";
import { User } from "../entities/userentities";

const internshipRepo = AppDataSource.getRepository(Internship);
const userRepo = AppDataSource.getRepository(User);

export const getAllInternshipsHelper = async (res: Response) => {
  try {
    const internships = await internshipRepo.find({ relations: ["user"] });
    res.json(internships);
  } catch {
    res.status(500).json({ message: "Failed to fetch internships" });
  }
};

export const getInternshipByIdHelper = async (id: number, res: Response) => {
  try {
    const internship = await internshipRepo.findOne({ where: { id }, relations: ["user"] });
    // if (!internship) return res.status(404).json({ message: "Internship not found" });
    res.json(internship);
  } catch {
    res.status(500).json({ message: "Failed to fetch internship" });
  }
};

export const createInternshipHelper = async (data: any, res: Response) => {
  try {
    const { joined_date, completion_date, is_certified, mentor_name, userId } = data;

    const user = await userRepo.findOneBy({ id: userId });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const internship = internshipRepo.create({
      joined_date,
      completion_date,
      is_certified,
      mentor_name,
      user,
    });

    const savedInternship = await internshipRepo.save(internship);

    res.status(201).json({
      success: true,
      message: "Internship created successfully",
      data: savedInternship,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create internship",
      error,
    });
  }
};


export const updateInternshipHelper = async (id: number, data: any, res: Response) => {
  try {
    const internship = await internshipRepo.findOne({ where: { id }, relations: ["user"] });

    const { joined_date, completion_date, is_certified, mentor_name, userId } = data;

    if (userId) {
      const user = await userRepo.findOneBy({ id: userId });
      if (!user) return res.status(404).json({ message: "User not found" });
      internship!.user = user;
    }

    if (internship) {
      internship.joined_date = joined_date ?? internship.joined_date;
      internship.completion_date = completion_date ?? internship.completion_date;
      internship.is_certified = is_certified ?? internship.is_certified;
      internship.mentor_name = mentor_name ?? internship.mentor_name;

      const updated = await internshipRepo.save(internship);
      res.json(updated);
    } else {
      res.json({ message: "No internship found, but no error thrown." });
    }
  } catch {
    res.status(500).json({ message: "Failed to update internship" });
  }
};


export const deleteInternshipHelper = async (id: number, res: Response) => {
  try {
    const result = await internshipRepo.delete(id);
    // if (result.affected === 0) return res.status(404).json({ message: "Internship not found" });
    res.json({ message: "Internship deleted successfully" });
  } catch {
    res.status(500).json({ message: "Failed to delete internship" });
  }
};
