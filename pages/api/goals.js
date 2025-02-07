import mysql from 'mysql2/promise';

export default async function handler(req, res) {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    
    if (req.method === 'GET') {
        const [rows] = await connection.query('SELECT * FROM goals');
        res.status(200).json({ goals: rows });
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
