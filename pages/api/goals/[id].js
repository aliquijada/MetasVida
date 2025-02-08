import db from "../../../lib/db"; // Importa la conexión a la DB

export default async function handler(req, res) {
  console.log("Query recibido:", req.query); // Para depuración
  const { id } = req.query;

  // Validar el ID
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "Falta el ID de la meta o no es válido." });
  }

  try {
    // 🔎 Hacer la consulta a la base de datos con mysql2
    const [rows] = await db.query("SELECT * FROM goals WHERE id = ?", [id]);

    // 📌 Si no se encuentra ninguna meta con ese ID
    if (rows.length === 0) {
      return res.status(404).json({ error: "Meta no encontrada." });
    }

    res.status(200).json(rows[0]); // ✅ Enviar la primera meta encontrada
  } catch (error) {
    console.error("Error en la base de datos:", error);
    res.status(500).json({ error: "Error en el servidor." });
  }
}
