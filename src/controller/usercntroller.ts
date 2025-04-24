import { Request, Response } from 'express';
import { User } from '../db/user';
import { findAll, findOne, createOne, updateOne, deleteOne } from '../helper/userHelper';

export const getUsers = (req: Request, res: Response) => findAll(User, res);

export const getUserById = (req: Request, res: Response) => findOne(User, req.params.id, res);

export const createUser = (req: Request, res: Response) => createOne(User, req.body, res);

export const updateUser = (req: Request, res: Response) => updateOne(User, req.params.id, req.body, res);

export const deleteUser = (req: Request, res: Response) => deleteOne(User, req.params.id, res);
