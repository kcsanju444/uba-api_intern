import { Request, Response, NextFunction } from 'express';
import con from '../../graphql/db'; // your DB connection

export const checkPermission = (permission: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as any).user;
      const roleId = user?.role;

      if (!roleId) {
        return res.status(400).json({ message: 'Role not found in token' });
      }

      // Run your query safely
      const [result]: any = await con.promise().query(
        `SELECT p.name FROM permissions p 
         JOIN role_permissions rp ON p.id = rp.permission_id
         WHERE rp.role_id = ?`,
        [roleId]
      );

      const hasPermission = result.some((p: any) => p.name === permission);
      if (!hasPermission) {
        return res.status(403).json({ message: 'Permission denied' });
      }

      next();
    } catch (err) {
      console.error('Permission check failed:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };
