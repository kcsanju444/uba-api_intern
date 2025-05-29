import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import con from '../../graphql/db';
import { generateToken } from '../utils/jwtutils';
import { RowDataPacket } from 'mysql2';

export const employeeLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const [rows] = await con.promise().query<RowDataPacket[]>('SELECT * FROM employee1 WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(401).json({ loginStatus: false, message: 'Invalid email or password' });
    }

    const employee = rows[0];
    const isMatch = await bcrypt.compare(password, employee.password);

    if (!isMatch) {
      return res.status(401).json({ loginStatus: false, message: 'Invalid email or password' });
    }

    const user = {
      id: employee.id,
      email: employee.email,
      role: 'employee',
      roleId: employee.role_id
    };

    const token = generateToken(user);
    res.cookie('token', token, { httpOnly: true });
    return res.json({ loginStatus: true, id: user.id });
  } catch (err) {
    console.error('Login Error:', err);
    return res.status(500).json({ loginStatus: false, message: 'Server error' });
  }
};
export const employeeRegister = (req: Request, res: Response) => {
  const { name, email, password, role_id } = req.body;

  const sql = 'INSERT INTO employee1 (name, email, password, role_id) VALUES (?, ?, ?, ?)';

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error("Hash Error:", err);
      return res.status(500).json({ Status: false, Error: 'Hashing Error' });
    }

    con.query(sql, [name, email, hash, role_id], (err, result) => {
      if (err) {
        console.error("Register Error:", err); // 👈 log exact MySQL error
        return res.status(500).json({ Status: false, Error: 'Insert Error' });
      }

      return res.json({ Status: true, Result: result });
    });
  });
};


export const getEmployeeDetail = async (req: Request, res: Response) => {
  try {
    const [rows] = await con.promise().query<RowDataPacket[]>('SELECT * FROM employee1 WHERE id = ?', [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ Status: false, message: 'Employee not found' });
    }

    return res.json({ Status: true, Result: rows[0] });
  } catch (err) {
    console.error('Get Detail Error:', err);
    return res.status(500).json({ Status: false, message: 'Server error' });
  }
};
