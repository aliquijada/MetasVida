import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router"; // Importa useRouter de Next.js
import Image from "next/image";
import styles from "@/styles/GoalsTable.module.css";
import Card from "@/components/Card"; // Asegúrate de que la ruta sea correcta
import Link from 'next/link';

// Importación de imágenes de categorías
import manualidades from "@/public/images/Categorias/manualidades.png";
import viajes from "@/public/images/Categorias/viajes.png";
import habilidades from "@/public/images/Categorias/habilidades.png";
import porquesi from "@/public/images/Categorias/porquesi.png";
import deportes from "@/public/images/Categorias/deportes.png";
import estudios from "@/public/images/Categorias/estudios.png";

const ProgressBar = ({ completed, total }) => {
  const progress = total > 0 ? (completed / total) * 100 : 0;
  return (
    <div className={styles.progressBarContainer}>
      <div
        className={styles.progressBarFill}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

const GoalsTable = () => {
  const router = useRouter();

  const { categoryName } = router.query; // Obtiene la categoría desde la URL

  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [completedGoals, setCompletedGoals] = useState(0);

  const categoryImages = {
    manualidades,
    viajes,
    habilidades,
    "porque-si": porquesi,
    deporte: deportes,
    estudios,
  };

  useEffect(() => {
    if (!categoryName) return;

    const fetchGoals = async () => {
      try {
        const response = await axios.get(`/api/goals?category=${categoryName}`);
        const uniqueGoals = response.data.goals || [];

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
  }, [categoryName]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }


  return (
    <div>
      <div className={styles.categoryImageContainer}>
        {categoryImages[categoryName] ? (
          <Image
            src={categoryImages[categoryName]}
            alt={categoryName}
            width={400}
            height={250}
            className={styles.categoryImage}
          />
        ) : (
          <p>No hay imagen disponible para esta categoría.</p>
        )}
      </div>

      <div className={styles.upperBox}>
      <svg viewBox="0 0 500 100" className={styles.svgContainer}>
    {/* Definir la curva */}
    <path id="curve" d="M50,80 Q250,-40 450,80" fill="transparent" stroke="transparent" />

    {/* Texto que sigue la curva */}
    <text className={styles.svgText} textAnchor="middle">
      <textPath xlinkHref="#curve" startOffset="50%" dominantBaseline="middle">
        {categoryName || "Desconocida"}
      </textPath>
    </text>
  </svg>
        <div className={styles.progressContainer}>
          <span className={styles.progressLabel}>
            Misiones Completadas:{" "}
            <strong>{`${completedGoals}/${goals.length}`}</strong>
          </span>
          <ProgressBar completed={completedGoals} total={goals.length} />
        </div>
      </div>

      {goals.length > 0 ? (
        <div className={styles.cardList}>
          {goals.map((goal) => (
            <Link key={goal.id} href={`/goals/${goal.id}`} className={styles.cardLink}>
              <Card mision={goal} />
            </Link>
          ))}
        </div>
      ) : (
        <p>No hay metas disponibles para esta categoría.</p>
      )}
    </div>
  );
};

export default GoalsTable;
