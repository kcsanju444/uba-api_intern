
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
