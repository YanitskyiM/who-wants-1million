import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../styles/Over.module.css";
import { Routes } from "@/constants/router";

function convertToFormattedNumber(amount: number): string {
  return parseFloat(amount.toString()).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export default function GameOver() {
  const router = useRouter();

  const totalScore = convertToFormattedNumber(1000);

  return (
    <main className={styles.main}>
      <Image
        src="/images/Hand.png"
        width={624}
        height={367}
        alt="Picture of the author"
      />
      <div>
        <h3 className={styles.subtitle}>Total score:</h3>
        <h2 className={styles.title}>${totalScore} earned</h2>
        <button
          className="base"
          role="link"
          onClick={() => router.push(Routes.GAME)}
        >
          Try again
        </button>
      </div>
    </main>
  );
}
