import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const GoalDetail = () => {
  console.log("✅ Importando GoalDetail");

  const router = useRouter();
  const { id } = router.query;

  const [goal, setGoal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!router.isReady) return; // Espera a que los parámetros estén listos

    const fetchGoal = async () => {
      try {
        console.log(`🔍 Buscando meta con ID: ${id}`);
        const response = await axios.get(`/api/goals/${id}`); // API correctamente referenciada
        console.log("📡 Respuesta de la API:", response.data);
        setGoal(response.data);
      } catch (err) {
        console.error("❌ Error al obtener el goal:", err);
        setError("No se pudo cargar la meta");
      } finally {
        setLoading(false);
      }
    };

    fetchGoal();
  }, [router.isReady, id]);

  if (loading) return <p>⏳ Cargando...</p>;
  if (error) return <p>❌ {error}</p>;
  if (!goal) return <p>⚠ No se encontró la meta.</p>;

  return (
    <div>
      <h1>{goal.Mision}</h1>
      <p>Descripción: {goal.Comments_m || "Sin descripción"}</p>
      <p>Estado: {goal.Status_m}</p>
    </div>
  );
};

export default GoalDetail;
