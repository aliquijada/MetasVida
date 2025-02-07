import styles from '@/styles/MainQuest.module.css';  // Importa los estilos de módulo
import Link from 'next/link';
import Image from 'next/image';


export default function TestComponent() {
    return <div className={styles.mainQuest}>
    <div className={styles.grid}>
      
      <div className={styles.gridItem}>
        <Link href="/manualidades">
          <Image src="/images/categorias/manualidades.png" width={200} height={200} alt="Manualidades" />
        </Link>
      </div>

      <div className={styles.gridItem}>
        <Link href="/viajes">
          <Image src="/images/categorias/viajes.png" width={200} height={200} alt="Viajes" />
        </Link>
      </div>

      <div className={styles.gridItem}>
        <Link href="/habilidades">
          <Image src="/images/categorias/habilidades.png" width={200} height={200} alt="Habilidades" />
        </Link>
      </div>

      <div className={styles.gridItem}>
        <Link href="/estudios">
          <Image src="/images/categorias/estudios.png" width={200} height={200} alt="Estudios" />
        </Link>
      </div>

      <div className={styles.gridItem}>
        <Link href="/deporte">
          <Image src="/images/categorias/deportes.png" width={200} height={200} alt="Deportes" />
        </Link>
      </div>

      <div className={styles.gridItem}>
        <Link href="/porquesi">
          <Image src="/images/categorias/porquesi.png" width={200} height={200} alt="Porque sí" />
        </Link>
      </div>

    </div>
  </div>;
  }
  