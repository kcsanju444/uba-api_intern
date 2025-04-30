import mysql from 'mysql';

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employeedb"
});

con.connect(function(err) {
    if (err) {
        console.log("Connection error:", err);
    } else {
        console.log("Connected to MySQL database");
    }
});

export default con;
