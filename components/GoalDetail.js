import { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/GoalDetail.module.css"; // ✅ Importación corregida

const GoalDetails = ({ goalId }) => {
  const [goal, setGoal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!goalId) return;

    const fetchGoal = async () => {
      try {
        console.log(`🔍 Buscando meta con ID: ${goalId}`);
        const response = await axios.get(`/api/goals/${goalId}`);
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
  }, [goalId]);

  const formatDate = (dateString) => {
    if (!dateString) return "No definida";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Devuelve "YYYY-MM-DD"
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "PENDIENTE":
        return styles.statusPending;
      case "EN PROCESO":
        return styles.statusInProgress;
      case "COMPLETADO":
        return styles.statusCompleted;
      default:
        return "";
    }
  };

  if (loading) return <p className={styles.loading}>⏳ Cargando...</p>;
  if (error) return <p className={styles.error}>❌ {error}</p>;
  if (!goal) return <p className={styles.notFound}>⚠ No se encontró la meta.</p>;

  return (
    <div className={styles.notebook}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h1>{goal.Mision}</h1>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <p>
            <strong>Estado:</strong>{" "}
            <span className={getStatusClass(goal.Status_m)}>
              {goal.Status_m}
            </span>
          </p>
          <p><strong>País:</strong> {goal.Country || "No definido"}</p>
          <p><strong>Comentarios:</strong> {goal.Comments_m || "-"}</p>
          <p><strong>Fecha creación:</strong> {formatDate(goal.created_at)}</p>
         
          {goal.submissions && (
            <div>
              <h2>Hitos:</h2>
              <ul>
                {goal.submissions.map((sub) => (
                  <li key={sub.id} className={styles[`status-${sub.status_sm.toLowerCase()}`]}>
                    {sub.Submision_name} - Estado: {sub.status_sm}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.photoPlaceholder}>
            Foto
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <p>¡Vamos que se puede!</p>
      </div>
    </div>
  );
};

export default GoalDetails;
