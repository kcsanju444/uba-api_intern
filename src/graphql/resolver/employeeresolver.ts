<<<<<<< HEAD
import con from '../../graphql/db';
=======
import con from '../db';
>>>>>>> 6255d23d529bd9c4947994d5f56a50ab2aaafac6
import bcrypt from 'bcrypt';
import {
  getAllEmployees,
  getEmployeeById,
  insertEmployee,
  updateEmployeeById,
  deleteEmployeeById,
} from '../query/employeeQueries';

const resolver = {
  Query: {
    employeeList() {
      return new Promise((resolve, reject) => {
        con.query(getAllEmployees, (err, result) => {
          if (err) reject(new Error('Database error: ' + err.message));
          else resolve(result);
        });
      });
    },

    employee(_: any, args: { id: number }) {
      return new Promise((resolve, reject) => {
        con.query(getEmployeeById, [args.id], (err, results) => {
          if (err) reject(new Error('Database error: ' + err.message));
          else resolve(results[0]);
        });
      });
    },
  },

  Mutation: {
    addEmployee: async (_: any, args: { input: any }) => {
      const {
        name, email, password, position, department, address, salary, image,
      } = args.input;

      const hashedPassword = await bcrypt.hash(password, 10);

      return new Promise((resolve, reject) => {
        con.query(
          insertEmployee,
          [name, email, hashedPassword, position, department, address, salary, image],
          (err, results) => {
            if (err) reject(new Error('Database error: ' + err.message));
            else {
              resolve({
                id: results.insertId,
                name,
                email,
                password: hashedPassword,
                position,
                department,
                address,
                salary,
                image,
              });
            }
          }
        );
      });
    },

    updateEmployee: async (_: any, { id: employeeId, updates }: { id: string, updates: any }) => {
      const {
        name, email, password, position, department, address, salary, image,
      } = updates;

      const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

      return new Promise((resolve, reject) => {
        con.query(
          updateEmployeeById,
          [
            name,
            email,
            hashedPassword || password,
            position,
            department,
            address,
            salary,
            image,
            employeeId,
          ],
          (err, result) => {
            if (err) reject(new Error('Database error: ' + err.message));
            else {
              resolve({
                id: employeeId,
                name,
                email,
                password: hashedPassword || password,
                position,
                department,
                address,
                salary,
                image,
              });
            }
          }
        );
      });
    },

    deleteEmployee: (_: any, args: { id: string }) => {
      return new Promise((resolve, reject) => {
        const { id } = args;

        con.query(deleteEmployeeById, [id], (err, result) => {
          if (err) reject(new Error('Database error: ' + err.message));
          else resolve(result.affectedRows > 0);
        });
      });
    },
  },
};

export default resolver;
