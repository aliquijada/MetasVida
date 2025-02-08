import styles from '@/styles/Card.module.css';
import Image from 'next/image';

// Importar imágenes desde `public/`
import notStartedImg from '@/public/images/notstarted.png';
import inProgressImg from '@/public/images/inprogress.png';
import completedImg from '@/public/images/completed.png';

const statusImages = {
  PENDIENTE: notStartedImg,
  EN_PROCESO: inProgressImg,
  COMPLETO: completedImg,
};

export default function Card({ mision }) {
  const name = mision.Mision;
  const status = mision.Status_m
  // Clases de estado dinámicas
  const statusClass = status === "COMPLETO" 
    ? styles.completed 
    : status === "EN_PROCESO" 
    ? styles.inProgress 
    : styles.pending;

  return (
    <div className={`${styles.card} ${statusClass}`} role="button" aria-label={`Ver detalles de ${name}`}>
      <div className={styles.imageContainer}>
        <Image src={statusImages[status]} width={100} height={100} alt={`Estado: ${status}`} />
      </div>
      <h3 className={styles.cardTitle}>{name}</h3>
      <p className={styles.text}>{status}</p>
    </div>
  );
}
