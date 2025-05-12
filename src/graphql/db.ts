import * as mysql from 'mysql';
import * as dotenv from 'dotenv';

dotenv.config();

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

if (process.env.NODE_ENV !== 'test') {
  con.connect((err) => {
    if (err) {
      console.log('Connection error:', err);
    } else {
      console.log('Connected to MySQL database');
    }
  });
}

export default con;
