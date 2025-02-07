import styles from '@/styles/MainQuest.module.css';
import Link from 'next/link';
import Image from 'next/image';

const categories = [
  { name: 'manualidades', image: '/images/manualidades.png', label: 'Manualidades' },
  { name: 'viajes', image: '/images/viajes.png', label: 'Viajes' },
  { name: 'habilidades', image: '/images/habilidades.png', label: 'Habilidades' },
  { name: 'estudios', image: '/images/estudios.png', label: 'Estudios' },
  { name: 'deporte', image: '/images/deportes.png', label: 'Deportes' },
  { name: 'porque-si', image: '/images/porquesi.png', label: 'Porque Sí' },
];

export default function MainQuest() {
  return (
    <div className={styles.mainQuest}>
      <div className={styles.grid}>
        {categories.map((category) => (
          <div key={category.name} className={styles.gridItem}>
            <Link href={`/category/${category.name}`}>
              <Image src={category.image} width={400} height={400} alt={category.label} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
