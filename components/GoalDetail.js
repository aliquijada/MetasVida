import styles from "@/styles/GoalDetail.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router"; 


const formatDate = (dateString) => {
  if (!dateString || isNaN(new Date(dateString).getTime())) {
    return "Fecha inválida"; // Muestra un mensaje en lugar de romper la app
  }
  return new Date(dateString).toISOString().split("T")[0]; // Devuelve YYYY-MM-DD
};

const GoalDetail = () => {
  const router = useRouter();
  const { goal } = router.query;
  

  useEffect(() => {
    if (!goal) return;

    const fetchGoals = async () => {
      try {
        const response = await axios.get(`/api/goals/${goalId}`);

        const uniqueGoals = response.data.goals || [];
        console.log('uniqueGoals', uniqueGoals);

        setGoals(uniqueGoals);
        setCompletedGoals(
          uniqueGoals.filter((goal) => goal.Status_m === "COMPLETO").length
        );
      } catch (err) {
        console.error("Error al cargar los datos:", err);
        setError("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, [goal]);



  return (
    <div className={styles.notebook}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h1>{goal.Mision}</h1>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <p><strong>Estado:</strong> <span className={styles[`status-${goal.Status_m}`]}>{goal.Status_m}</span></p>
          <p><strong>País:</strong> {goal.Country || "No definido"}</p>
          <p><strong>Comentarios:</strong> {goal.comments_m || "-"}</p>
          <p><strong>Fecha creación:</strong> {formatDate(goal.created_at)}</p>

          {goal.submissions && (
            <div>
              <h2>Hitos:</h2>
              <ul className={styles.hitosList}>
                {goal.submissions.map((sub) => (
                  <li key={sub.id} className={`${styles.hitosListItem} ${styles[`status-${sub.status_sm.toLowerCase()}`]}`}>
                    {sub.Submision_name} - Estado: {sub.status_sm}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.photoPlaceholder}>Foto</div>
        </div>
      </div>
      <div className={styles.footer}>
        <p>¡Vamos que se puede!</p>
      </div>
    </div>
  );
};

export default GoalDetail;
