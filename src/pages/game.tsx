import React, { useState } from 'react';
import { IGame, IQuestion } from '@/models/game';
import styles from '@/styles/Game.module.css';
import { useRouter } from 'next/router';
import Question from '@/components/Question/Question';
import Progress from '@/components/Progress/Progress';
import {
  is1MillionReached,
  isGameOverTime,
  reachedQuestion,
} from '@/store/atoms';
import { useSetRecoilState } from 'recoil';
import useSound from '@/hooks/useSound';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { useMount } from 'react-use';
import BurgerMenuIcon from '@/components/SvgIcons/BurgerMenuIcon';
import { CloseIcon } from '@/components/SvgIcons/CloseIcon';
import {
  CORRECT_ANSWER_SOUND_DURATION,
  FIRST_QUESTION_ORDER,
  REVEAL_CORRECT_ANSWER_DURATION,
  TIME_OVER_DURATION_IN_SECONDS,
  WRONG_ANSWER_SOUND_DURATION,
} from '@/constants/game';
import wait from '@/utils/wait';
import useResponsiveDrawer from '@/hooks/useResponsiveDrawer';
import SoundId from '@/constants/sound';
import Routes from '@/constants/router';
import useRedirectOnReload from '@/hooks/useRedirectOnReload';
import useRedirectAfterTimeout from '@/hooks/useRedirectAfterTimeout';
import gameData from '../mock/game.json';

const gameQuestions: IQuestion[] = (gameData as IGame).questions;

const questionMap: { [id: string]: IQuestion } = gameQuestions.reduce(
  (map: { [id: number]: IQuestion }, question: IQuestion) => ({
    ...map,
    [question.order.toString()]: question,
  }),
  {},
);

export default function Game() {
  const router = useRouter();

  const [currentQuestionOrder, setCurrentQuestionOrder] = useState(FIRST_QUESTION_ORDER);

  const setReachedQuestion = useSetRecoilState(reachedQuestion);
  const setIs1MillionReachedValue = useSetRecoilState(is1MillionReached);
  const setIsGameOverTime = useSetRecoilState(isGameOverTime);

  const [playBgSound, pauseBgSound] = useSound(SoundId.BG_SOUND);
  const [playGameOverSound] = useSound(SoundId.GAME_OVER);
  const [playCorrectAnswerSound, pauseCorrectAnswerSound] = useSound(
    SoundId.CORRECT_ANSWER,
  );

  const { isMobile, isOpen, toggleDrawer } = useResponsiveDrawer();

  const currentQuestion = questionMap[currentQuestionOrder];
  const totalQuestions = gameQuestions.length;
  const isLastQuestion = currentQuestionOrder === totalQuestions;

  async function gameOver(isTimeOver = true) {
    await wait(REVEAL_CORRECT_ANSWER_DURATION);
    if (isTimeOver) {
      setIsGameOverTime(true);
    }
    pauseBgSound();
    playGameOverSound();

    await wait(WRONG_ANSWER_SOUND_DURATION);
    setReachedQuestion(questionMap[currentQuestionOrder - 1]);

    await router.push(Routes.GAME_OVER);
  }

  const { startTimer, resetTimer, pauseTimer } = useRedirectAfterTimeout(
    gameOver,
    TIME_OVER_DURATION_IN_SECONDS,
  );

  useRedirectOnReload();

  useMount(() => {
    playBgSound();
    startTimer();
  });

  const handleChangeQuestion = async (answerId: string) => {
    pauseTimer();

    const isAnswerCorrect = currentQuestion.correctAnswerIds.includes(answerId);

    if (!isAnswerCorrect) {
      await gameOver(false);
    } else {
      await wait(REVEAL_CORRECT_ANSWER_DURATION);
      pauseBgSound();
      playCorrectAnswerSound();

      if (isLastQuestion) {
        setIs1MillionReachedValue(true);
      }

      await wait(CORRECT_ANSWER_SOUND_DURATION);
      pauseCorrectAnswerSound();
      playBgSound();

      if (isLastQuestion) {
        setReachedQuestion(questionMap[currentQuestionOrder]);
        pauseBgSound();
        await router.push(Routes.GAME_OVER);
        return;
      }
      resetTimer();
      setCurrentQuestionOrder(currentQuestionOrder + 1);
    }
  };

  if (!currentQuestion) {
    return <div>Question not found</div>;
  }

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.burger__button_box}
        onClick={toggleDrawer}
      >
        {isOpen ? <CloseIcon /> : <BurgerMenuIcon />}
      </button>
      <Question
        key={currentQuestionOrder}
        question={currentQuestion}
        onAnswerClick={handleChangeQuestion}
      />
      <Drawer
        size={isMobile ? '100%' : '25%'}
        enableOverlay={false}
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
      >
        <Progress currentQuestion={currentQuestion} questions={gameQuestions} />
      </Drawer>
    </div>
  );
}
