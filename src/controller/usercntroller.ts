import { Request, Response } from 'express';
import { findAll, findOne, createOne, updateOne, deleteOne } from '../helper/userHelper';
const table = 'employee';

export const getUsers = (req: Request, res: Response) => findAll(table, res);

export const getUserById = (req: Request, res: Response) => findOne(table, req.params.id, res);

export const createUser = (req: Request, res: Response) => createOne(table, req.body, res);

export const updateUser = (req: Request, res: Response) => updateOne(table, req.params.id, req.body, res);

export const deleteUser = (req: Request, res: Response) => deleteOne(table, req.params.id, res);
