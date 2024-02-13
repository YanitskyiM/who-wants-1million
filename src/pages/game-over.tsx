import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../styles/Over.module.css";
import { Routes } from "@/constants/router";
import { convertToFormattedNumber } from "@/utils/convertToFormattedNumber";
import { useRecoilValue } from "recoil";
import { reachedQuestion } from "../../store/atoms";

export default function GameOver() {
  const router = useRouter();
  const reachedQuestionValue = useRecoilValue(reachedQuestion);

  const finalReward = convertToFormattedNumber(
    reachedQuestionValue?.reward ?? 0,
  );

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
        <h2 className={styles.title}>${finalReward} earned</h2>
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
