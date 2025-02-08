import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const GoalDetail = () => {
  console.log('entrando a GoalDetail');
  const router = useRouter();
  const [goal, setGoal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!router.isReady) return; // 🛑 Espera a que los parámetros estén listos

    const { id } = router.query; // Ahora id siempre tendrá valor cuando se ejecute
    if (!id) return;

    const fetchGoal = async () => {
      try {
        console.log(`Buscando meta con ID: ${id}`);
        const response = await axios.get(`/api/goals/${id}`);
        console.log("Respuesta de la API:", response.data);
        setGoal(response.data);
      } catch (err) {
        console.error("Error al obtener el goal:", err);
        setError("No se pudo cargar la meta");
      } finally {
        setLoading(false);
      }
    };

    fetchGoal();
  }, [router.isReady, router.query.id]); // Ahora espera a que router.isReady sea true

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (!goal) return <p>No se encontró la meta.</p>;

  return (
    <div>
      <h1>{goal.Mision}</h1> {/* Cambié 'name' por 'Mision' según tu API */}
      <p>Descripción: {goal.Comments_m || "Sin descripción"}</p>
      <p>Estado: {goal.Status_m}</p>
    </div>
  );
};
console.log("✅ Importando GoalDetail");
export default GoalDetail;
