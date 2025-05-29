import * as mysql from 'mysql2'; // change from 'mysql' to 'mysql2'
import * as dotenv from 'dotenv';

dotenv.config();

const con = mysql.createConnection({
  host: process.env.DB2_HOST,
  user: process.env.DB2_USERNAME,
  password: process.env.DB2_PASSWORD,
  database: process.env.DB2_NAME,
  port: Number(process.env.DB2_PORT) || 3306,
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
