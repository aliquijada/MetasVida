import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GoalDetail from "@/components/GoalDetail";
import Navbar from "@/components/Navbar";

export default function GoalPage() {
  const router = useRouter();
  const [goalId, setGoalId] = useState(null);
  const [clientReady, setClientReady] = useState(false);

  // ✅ Evitar SSR: Solo ejecutar código cuando el cliente esté listo
  useEffect(() => {
    setClientReady(true);
  }, []);

  useEffect(() => {
    if (clientReady && router.isReady) {
      console.log("✅ Router está listo. query:", router.query);
      setGoalId(router.query.goalId);
    }
  }, [clientReady, router.isReady, router.query]);

  useEffect(() => {
    console.log("📌 Renderizando GoalPage, goalId actual:", goalId);
  }, [goalId]);

  // 🔥 Evita renderizar antes de que el cliente esté listo
  if (!clientReady || !goalId) {
    return <p>Cargando meta...</p>;
  }

  return (
    <>
      <Navbar />
      <GoalDetail goalId={goalId} />
    </>
  );
}
