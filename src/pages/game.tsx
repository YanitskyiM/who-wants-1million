import React, { useEffect, useState } from "react";
import gameData from "../mock/game.json";
import { IGame, IQuestion } from "@/models/game";
import styles from "@/styles/Game.module.css";
import { useRouter } from "next/router";
import { Routes } from "@/constants/router";
import { Question } from "@/components/Question/Question";
import { Progress } from "@/components/Progress/Progress";
import { is1MillionReached, reachedQuestion } from "../../store/atoms";
import { useSetRecoilState } from "recoil";
import { SOUND_ID } from "@/constants/sound";
import { useSound } from "@/hooks/useSound";

const gameQuestions: IQuestion[] = (gameData as IGame).questions;

const questionMap: { [id: string]: IQuestion } = gameQuestions.reduce(
  (map: { [id: number]: IQuestion }, question: IQuestion) => {
    map[question.order] = question;
    return map;
  },
  {},
);

const REVEAL_CORRECT_ANSWER_DURATION = 1000;
const WRONG_ANSWER_SOUND_DURATION = 3000;
const CORRECT_ANSWER_SOUND_DURATION = 5000;

export default function Game() {
  const router = useRouter();

  const setReachedQuestion = useSetRecoilState(reachedQuestion);
  const setIs1MillionReachedValue = useSetRecoilState(is1MillionReached);

  const [currentQuestionOrder, setCurrentQuestionOrder] = useState<number>(5);

  const [playBgSound, pauseBgSound] = useSound(SOUND_ID.BG_SOUND);
  const [playGameOverSound] = useSound(SOUND_ID.GAME_OVER);
  const [playCorrectAnswerSound, pauseCorrectAnswerSound] = useSound(
    SOUND_ID.CORRECT_ANSWER,
  );

  useEffect(() => {
    playBgSound();

    return () => {
      pauseBgSound();
    };
  }, []);

  const currentQuestion = questionMap[currentQuestionOrder];
  const totalQuestions = gameQuestions.length;
  const isLastQuestion = currentQuestionOrder === totalQuestions;

  const handleChangeQuestion = async (answerId: string) => {
    const isAnswerCorrect = currentQuestion.correctAnswerIds.includes(answerId);

    if (!isAnswerCorrect) {
      setTimeout(() => {
        pauseBgSound();
        playGameOverSound();
        setTimeout(() => {
          setReachedQuestion(questionMap[currentQuestionOrder - 1]);
          router.push(Routes.GAME_OVER);
        }, WRONG_ANSWER_SOUND_DURATION);
      }, REVEAL_CORRECT_ANSWER_DURATION);
    } else {
      setTimeout(() => {
        pauseBgSound();
        playCorrectAnswerSound();
        if (isLastQuestion) {
          setIs1MillionReachedValue(true);
        }
        setTimeout(() => {
          pauseCorrectAnswerSound();
          playBgSound();
          if (isLastQuestion) {
            setReachedQuestion(questionMap[currentQuestionOrder]);
            router.push(Routes.GAME_OVER);
            return;
          }
          setCurrentQuestionOrder(currentQuestionOrder + 1);
        }, CORRECT_ANSWER_SOUND_DURATION);
      }, REVEAL_CORRECT_ANSWER_DURATION);
    }
  };

  if (!currentQuestion) {
    return <div>Question not found</div>;
  }

  return (
    <div className={styles.container}>
      <Question
        key={currentQuestionOrder}
        question={currentQuestion}
        onAnswerClick={handleChangeQuestion}
      />
      <Progress currentQuestion={currentQuestion} questions={gameQuestions} />
    </div>
  );
}
