import mysql from 'mysql2/promise';

export default async function handler(req, res) {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    const [rows] = await connection.query('SHOW TABLES;');
    res.status(200).json({ tables: rows });
}
