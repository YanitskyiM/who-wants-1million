import styles from "../styles/Game.module.css";
import { useRouter } from "next/router";
import { Routes } from "@/constants/router";

export default function GameOver() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      Game over
      <button onClick={() => router.push(Routes.GAME)}>try again</button>
    </div>
  );
}
