import { useRouter } from 'next/router';
import GoalsTable from '@/components/GoalsTable';
import Navbar from '@/components/Navbar';

export default function CategoryPage() {
  const router = useRouter();
  const { categoryName } = router.query;

  // Mapear nombres de categorías con sus IDs
  const categoryMap = {
    manualidades: 5,
    viajes: 1,
    deporte: 4,
    habilidades: 2,
    'porque-si': 3,
    estudios: 6,
  };
  
  const categoryId = categoryMap[categoryName];
  console.log('categoryMap', categoryId);
  if (!categoryId) {
    return <p>Categoría no encontrada</p>;
  }

  return <>
  <Navbar />
  <GoalsTable categoryId={categoryId} />;
  </>
}
