import con from '../db';
import bcrypt from 'bcrypt';

const resolver = {
  Query: {
    employeeList() {
      return new Promise((resolve, reject) => {
        con.query('SELECT * FROM employee', (err, result) => {
          if (err) {
            reject(new Error('Database error: ' + err.message));
          } else {
            resolve(result);
          }
        });
      });
    },

    employee(_: any, args: { id: number }) {
      return new Promise((resolve, reject) => {
        con.query('SELECT * FROM employee WHERE id = ?', [args.id], (err, results) => {
          if (err) {
            reject(new Error('Database error: ' + err.message));
          } else {
            resolve(results[0]);
          }
        });
      });
    },
  },

  Mutation: {
    addEmployee: async (_: any, args: { input: any }) => {
      const {
        name,
        email,
        password,
        position,
        department,
        address,
        salary,
        image,
      } = args.input;

      const hashedPassword = await bcrypt.hash(password, 10);

      return new Promise((resolve, reject) => {
        con.query(
          'INSERT INTO employee (name, email, password, position, department, address, salary, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [name, email, hashedPassword, position, department, address, salary, image],
          (err, results) => {
            if (err) {
              reject(new Error('Database error: ' + err.message));
            } else {
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
        name,
        email,
        password,
        position,
        department,
        address,
        salary,
        image,
      } = updates;
    
      const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
    
      return new Promise((resolve, reject) => {
        con.query(
          `UPDATE employee SET 
             name = ?, 
             email = ?, 
             password = ?, 
             position = ?, 
             department = ?, 
             address = ?, 
             salary = ?, 
             image = ? 
           WHERE id = ?`,
          [
            name,
            email,
            hashedPassword || password,  
            position,
            department,
            address,
            salary,
            image,
            employeeId, // Use employeeId here
          ],
          (err, result) => {
            if (err) {
              reject(new Error('Database error: ' + err.message));
            } else {
              resolve({
                id: employeeId, // Use employeeId here
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

        con.query('DELETE FROM employee WHERE id = ?', [id], (err, result) => {
          if (err) {
            reject(new Error('Database error: ' + err.message));
          } else {
            if (result.affectedRows === 0) {
              reject(new Error('Employee not found'));
            } else {
              resolve({ message: `Employee with ID ${id} has been deleted.` });
            }
          }
        });
      });
    },
  },
};

export default resolver;
