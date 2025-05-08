import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

<<<<<<< HEAD
// Only connect if not in test environment
if (process.env.NODE_ENV !== 'test') {
  con.connect((err) => {
    if (err) {
      console.log('Connection error:', err);
    } else {
      console.log('Connected to MySQL database');
    }
  });
}
=======
con.connect((err) => {
  if (err) {
    console.log('Connection error:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});
>>>>>>> 6255d23d529bd9c4947994d5f56a50ab2aaafac6

export default con;
