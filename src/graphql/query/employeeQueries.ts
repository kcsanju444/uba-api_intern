
export const getAllEmployees = 'SELECT * FROM employee';

export const getEmployeeById = 'SELECT * FROM employee WHERE id = ?';

export const insertEmployee = `
  INSERT INTO employee 
    (name, email, password, position, department, address, salary, image) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`;

export const updateEmployeeById = `
  UPDATE employee SET 
    name = ?, 
    email = ?, 
    password = ?, 
    position = ?, 
    department = ?, 
    address = ?, 
    salary = ?, 
    image = ?
  WHERE id = ?
`;

<<<<<<< HEAD
export const deleteEmployeeById = 'DELETE FROM employee WHERE id = ?';
=======
export const deleteEmployeeById = 'DELETE FROM employee WHERE id = ?';
>>>>>>> 6255d23d529bd9c4947994d5f56a50ab2aaafac6
