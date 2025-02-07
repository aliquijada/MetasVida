import mysql from "mysql2/promise";

const db = mysql.createPool({
  uri: process.env.DATABASE_URL, // Usa la conexión directa de Railway
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default db;
