import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import con from '../../graphql/db'; // make sure this is your MySQL connection
import { generateToken } from '../utils/jwtutils';
import { RowDataPacket } from 'mysql2';

export const adminLogin = (req: Request, res: Response) => {
  const sql = 'SELECT * FROM admin WHERE email = ?';
  con.query(sql, [req.body.email], (err, results) => {
    if (err) return res.status(500).json({ loginStatus: false, error: err });

    const rows = results as RowDataPacket[];
    if (rows.length === 0) {
      return res.status(401).json({ loginStatus: false, error: 'Email not found' });
    }

    bcrypt.compare(req.body.password, rows[0].password, (err, match) => {
      if (err || !match) {
        return res.status(401).json({ loginStatus: false, error: 'Password mismatch' });
      }

      const user = {
        id: rows[0].id,
        email: rows[0].email,
        role: 'admin',
        roleId: rows[0].role_id
      };

      const token = generateToken(user);
      res.cookie('token', token).json({ loginStatus: true, id: user.id });
    });
  });
};
