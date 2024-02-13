import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../styles/Over.module.css";
import { Routes } from "@/constants/router";
import { convertToFormattedNumber } from "@/utils/convertToFormattedNumber";
import { useRecoilValue } from "recoil";
import { reachedQuestion } from "../../store/atoms";
import { useSound } from "@/hooks/useSound";
import { SOUND_ID } from "@/constants/sound";

export default function GameOver() {
  const router = useRouter();
  const reachedQuestionValue = useRecoilValue(reachedQuestion);

  const [_, pauseGameOverSound] = useSound(SOUND_ID.GAME_OVER);

  const finalReward = convertToFormattedNumber(
    reachedQuestionValue?.reward ?? 0,
  );

  function tryAgain() {
    pauseGameOverSound();
    return router.push(Routes.HOME);
  }

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
        <button className="base" role="link" onClick={tryAgain}>
          Try again
        </button>
      </div>
    </main>
  );
}
