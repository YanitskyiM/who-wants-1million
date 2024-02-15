import React from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { is1MillionReached, reachedQuestion } from '@/store/atoms';
import useSound from '@/hooks/useSound';
import SoundId from '@/constants/sound';
import Routes from '@/constants/router';
import HandResponsiveImage from '@/components/HandResponsiveImage/HandResponsiveImage';
import convertToFormattedNumber from '@/utils/convertToFormattedNumber';
import useRedirectOnReload from '@/hooks/useRedirectOnReload';
import styles from '../styles/GameOver.module.css';

export default function GameOver() {
  const router = useRouter();
  const reachedQuestionValue = useRecoilValue(reachedQuestion);
  const setIs1MillionReachedValue = useSetRecoilState(is1MillionReached);

  useRedirectOnReload();

  const [, pauseGameOverSound] = useSound(SoundId.GAME_OVER);

  const finalReward = convertToFormattedNumber(
    reachedQuestionValue?.reward ?? 0,
  );

  function tryAgain() {
    pauseGameOverSound();
    setIs1MillionReachedValue(false);
    return router.push(Routes.HOME);
  }

  return (
    <main className={styles.gameOver__main}>
      <HandResponsiveImage />
      <div className={styles.gameOver__content}>
        <div>
          <h3 className={styles.gameOver__content__subtitle}>Total score:</h3>
          <h2 className={styles.gameOver__content__title}>
            $
            {finalReward}
            {' '}
            earned
          </h2>
        </div>
        <button className="base" type="button" onClick={tryAgain}>
          Try again
        </button>
      </div>
    </main>
  );
}
