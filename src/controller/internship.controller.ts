import { Request, Response } from "express";
import {
  getAllInternshipsHelper,
  getInternshipByIdHelper,
  createInternshipHelper,
  updateInternshipHelper,
  deleteInternshipHelper,
} from "../helper/internshipHelper";

export const getAllInternships = (req: Request, res: Response) => getAllInternshipsHelper(res);

export const getInternshipById = (req: Request, res: Response) =>
  getInternshipByIdHelper(parseInt(req.params.id), res);

export const createInternship = (req: Request, res: Response) =>
  createInternshipHelper(req.body, res);

export const updateInternship = (req: Request, res: Response) =>
  updateInternshipHelper(parseInt(req.params.id), req.body, res);

export const deleteInternship = (req: Request, res: Response) =>
  deleteInternshipHelper(parseInt(req.params.id), res);
