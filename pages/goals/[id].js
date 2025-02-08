import { useRouter } from "next/router";
import GoalDetails from "@/components/GoalDetail";

const GoalDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return <p>⏳ Cargando...</p>;

  return <GoalDetails goalId={id} />;
};

export default GoalDetailPage;
