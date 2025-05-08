import { Request, Response } from 'express';
import { findAll, findOne, createOne, updateOne, deleteOne } from '../helper/userHelper';
<<<<<<< HEAD
const table = 'employee';

export const getUsers = (req: Request, res: Response) => findAll(table, res);

export const getUserById = (req: Request, res: Response) => findOne(table, req.params.id, res);

export const createUser = (req: Request, res: Response) => createOne(table, req.body, res);

export const updateUser = (req: Request, res: Response) => updateOne(table, req.params.id, req.body, res);

=======

const table = 'employee';

export const getUsers = (req: Request, res: Response) => findAll(table, res);

export const getUserById = (req: Request, res: Response) => findOne(table, req.params.id, res);

export const createUser = (req: Request, res: Response) => createOne(table, req.body, res);

export const updateUser = (req: Request, res: Response) => updateOne(table, req.params.id, req.body, res);

>>>>>>> 6255d23d529bd9c4947994d5f56a50ab2aaafac6
export const deleteUser = (req: Request, res: Response) => deleteOne(table, req.params.id, res);
