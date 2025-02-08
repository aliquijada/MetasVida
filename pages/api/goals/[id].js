import db from "../../../lib/db"; // ✅ Asegúrate de que esta importación es correcta

export default async function handler(req, res) {
  console.log("🌍 Entrando a API /api/goals/[id]");
  const { id } = req.query; // ✅ Correcta forma de obtener `id` en una API

  if (!id || isNaN(id)) {
    console.error("⚠️ ID no válido:", id);
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    console.log(`🔍 Buscando goal con ID: ${id}`);

    // Realiza la consulta a la base de datos
    const [rows] = await db.execute("SELECT * FROM goals WHERE id = ?", [id]);

    if (rows.length === 0) {
      console.error(`❌ No se encontró meta con ID ${id}`);
      return res.status(404).json({ error: "Meta no encontrada" });
    }

    console.log("✅ Meta encontrada:", rows[0]);
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("❌ Error en la base de datos:", error);
    res.status(500).json({ error: "Error en el servidor." });
  }
}
