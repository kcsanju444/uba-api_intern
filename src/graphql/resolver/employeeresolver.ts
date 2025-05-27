// import con from '../../graphql/db';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import {
//   getAllEmployees,
//   getEmployeeById,
//   insertEmployee,
//   updateEmployeeById,
//   deleteEmployeeById,
// } from '../query/employeeQueries';

// const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

// const resolver = {
//   Query: {
//     employeeList() {
//       return new Promise((resolve, reject) => {
//         con.query(getAllEmployees, (err, result) => {
//           if (err) reject(new Error('Database error: ' + err.message));
//           else resolve(result);
//         });
//       });
//     },

//     employee(_: any, args: { id: number }) {
//       return new Promise((resolve, reject) => {
//         con.query(getEmployeeById, [args.id], (err, results) => {
//           if (err) reject(new Error('Database error: ' + err.message));
//           else resolve(results[0]);
//         });
//       });
//     },
//   },

//   Mutation: {
//     addEmployee: async (_: any, args: { input: any }) => {
//       const {
//         name, email, password, position, department, address, salary, image,
//       } = args.input;

//       const hashedPassword = await bcrypt.hash(password, 10);

//       return new Promise((resolve, reject) => {
//         con.query(
//           insertEmployee,
//           [name, email, hashedPassword, position, department, address, salary, image],
//           (err, results) => {
//             if (err) reject(new Error('Database error: ' + err.message));
//             else {
//               resolve({
//                 id: results.insertId,
//                 name,
//                 email,
//                 password: hashedPassword,
//                 position,
//                 department,
//                 address,
//                 salary,
//                 image,
//               });
//             }
//           }
//         );
//       });
//     },

//     updateEmployee: async (_: any, { id: employeeId, updates }: { id: string, updates: any }) => {
//       const {
//         name, email, password, position, department, address, salary, image,
//       } = updates;

//       const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

//       const passwordToUse = hashedPassword || null;

//       return new Promise((resolve, reject) => {
//         con.query(
//           updateEmployeeById,
//           [
//             name,
//             email,
//             passwordToUse,
//             position,
//             department,
//             address,
//             salary,
//             image,
//             employeeId,
//           ],
//           (err, result) => {
//             if (err) reject(new Error('Database error: ' + err.message));
//             else {
//               resolve({
//                 id: employeeId,
//                 name,
//                 email,
//                 password: hashedPassword || password, 
//                 position,
//                 department,
//                 address,
//                 salary,
//                 image,
//               });
//             }
//           }
//         );
//       });
//     },

//     deleteEmployee: (_: any, args: { id: string }) => {
//       return new Promise((resolve, reject) => {
//         const { id } = args;

//         con.query(deleteEmployeeById, [id], (err, result) => {
//           if (err) reject(new Error('Database error: ' + err.message));
//           else resolve(result.affectedRows > 0);
//         });
//       });
//     },

//     login: async (_: any, args: { email: string; password: string }) => {
//       const { email, password } = args;

//       return new Promise((resolve, reject) => {
//         con.query('SELECT * FROM employee WHERE email = ?', [email], async (err, results) => {
//           if (err) return reject(new Error('Database error: ' + err.message));
//           if (results.length === 0) return reject(new Error('User not found'));

//           const user = results[0];
//           const valid = await bcrypt.compare(password, user.password);

//           if (!valid) return reject(new Error('Invalid credentials'));

//           const token = jwt.sign(
//             { id: user.id, role: user.role || 'user' },
//             JWT_SECRET,
//             { expiresIn: '1h' }
//           );

//           resolve({ token });
//         });
//       });
//     },
//   },
// };

// export default resolver;
