import db from "@/lib/db";

export default async function handler(req, res) {
  console.log("📌 API llamada con req.query:", req.query); // 🔍 Verifica si goalId está presente

  const { goalId } = req.query;

  if (!goalId) {
    console.error("❌ Error: Falta el ID de la meta.");
    return res.status(400).json({ error: "Falta el ID de la meta." });
  }

  try {
    const [goal] = await db.query("SELECT * FROM goals WHERE id = ?", [goalId]);

    if (!goal) {
      console.error("⚠️ Meta no encontrada en la base de datos:", goalId);
      return res.status(404).json({ error: "Meta no encontrada" });
    }

    console.log("✅ Meta encontrada:", goal);
    res.status(200).json(goal);
  } catch (error) {
    console.error("❌ Error en la API:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
