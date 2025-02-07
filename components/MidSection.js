import styles from '@/styles/MidSection.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function MidSection() {
  return (
    <div>
      <div className={styles.threeColumnSection}>
        <div className={styles.columnBs}>
          <Link href="/main-quest">
            <Image src="/images/Metas_1-nobg.png" width={350} height={350} alt="Meta 1" className={styles.buttonImage} />
          </Link>
        </div>

        <div className={`${styles.column} ${styles.centerText}`}>
          <h2>¡Bienvenido a Mi Espacio de Metas! 🎯</h2>
          <br />
          <p>
            Hola y gracias por estar aquí. Este sitio es un lugar donde planeo registrar mis metas, 
            reflexionar sobre los avances y compartir lo que voy logrando a lo largo del camino. 
            No importa si se trata de grandes ambiciones o pequeños pasos, cada meta cuenta y tiene su historia.
          </p>
          <br />
          <p>
            Mi intención es que este espacio sea sencillo, auténtico y motivador, tanto para mí como para 
            quienes quieran seguir el viaje. Tal vez encuentres algo útil, o simplemente te inspires a trabajar 
            en tus propios objetivos.
          </p>
          <br />
          <h3>Sea como sea, bienvenido. Aquí empieza todo. 🚀</h3>
        </div>

        <div className={`${styles.column} ${styles.rightImage}`}>
          <Image src="/images/Myself-nobg.png" width={250} height={250} alt="Myself" />
        </div>
      </div>
    </div>
  );
}
