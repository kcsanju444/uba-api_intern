import { Response } from 'express';
import con from '../graphql/db';
import {
  getAllEmployees,
  getEmployeeById,
  insertEmployee,
  updateEmployeeById,
  deleteEmployeeById,
} from '../graphql/query/employeeQueries';
export const findAll = async (_tableName: string, res: Response) => {
  con.query(getAllEmployees, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Server Error', error: err });
    }
    const message = results.length ? 'Items fetched' : 'No items found';
    res.status(200).json({ success: true, message, data: results });
  });
};

export const findOne = async (_tableName: string, id: string, res: Response) => {
  con.query(getEmployeeById, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Server Error', error: err });
    }
    res.status(200).json({ success: true, message: 'Item fetched', data: results[0] });
  });
};

export const createOne = async (_tableName: string, data: any, res: Response) => {
  const values = [
    data.name,
    data.email,
    data.password,
    data.position,
    data.department,
    data.address,
    data.salary,
    data.image
  ];

  con.query(insertEmployee, values, (err, result) => {
    if (err) {
      return res.status(400).json({ message: 'Error creating item', error: err });
    }
    res.status(201).json({ success: true, message: 'Item created', data: { id: result.insertId, ...data } });
  });
  
};

export const updateOne = async (_tableName: string, id: string, data: any, res: Response) => {
  const values = [
    data.name,
    data.email,
    data.password,
    data.position,
    data.department,
    data.address,
    data.salary,
    data.image || null 
  ];

 
  con.query(updateEmployeeById, [...values, id], (err, result) => {
    if (err) {
      return res.status(400).json({ message: 'Error updating item', error: err });
    }
    res.status(200).json({ success: true, message: 'Item updated', data: { id, ...data } });
  });
};


export const deleteOne = async (_tableName: string, id: string, res: Response) => {
  con.query(deleteEmployeeById, [id], (err, result) => {
    if (err) {
      return res.status(400).json({ message: 'Error deleting item', error: err });
    }
    res.status(204).json({ success: true, message: 'Item deleted' });
  });
};
