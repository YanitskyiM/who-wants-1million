import React, { useEffect, useState } from "react";
import gameData from "../mock/game.json";
import { IGame, IQuestion } from "@/models/game";
import styles from "@/styles/Game.module.css";
import { useRouter } from "next/router";
import { Routes } from "@/constants/router";
import { Question } from "@/components/Question/Question";
import { Progress } from "@/components/Progress/Progress";
import { reachedQuestion } from "../../store/atoms";
import { useSetRecoilState } from "recoil";
import { SOUND_ID } from "@/constants/sound";
import { useSound } from "@/hooks/useSound";

const gameQuestions: IQuestion[] = (gameData as IGame).questions;

export default function Game() {
  const router = useRouter();

  const setReachedQuestion = useSetRecoilState(reachedQuestion);

  const [currentQuestionOrder, setCurrentQuestionOrder] = useState<number>(1);

  const [playBgSound, pauseBgSound] = useSound(SOUND_ID.BG_SOUND);
  const [playGameOverSound] = useSound(SOUND_ID.GAME_OVER);
  const [playCorrectAnswerSound, pauseCorrectAnswerSound] = useSound(
    SOUND_ID.CORRECT_ANSWER,
  );

  const questionMap: { [id: string]: IQuestion } = gameQuestions.reduce(
    (map: { [id: number]: IQuestion }, question: IQuestion) => {
      map[question.questionOrder] = question;
      return map;
    },
    {},
  );

  useEffect(() => {
    playBgSound();

    return () => {
      pauseBgSound();
    };
  }, []);

  const currentQuestion = questionMap[currentQuestionOrder];

  const handleChangeQuestion = async (answerId: string) => {
    if (!currentQuestion.correctAnswerIds.includes(answerId)) {
      pauseBgSound();
      playGameOverSound();
      setReachedQuestion(questionMap[currentQuestionOrder - 1]);
      return await router.push(Routes.GAME_OVER);
    }

    pauseBgSound();
    playCorrectAnswerSound();
    setTimeout(() => {
      pauseCorrectAnswerSound();
      playBgSound();
    }, 5000);
    setCurrentQuestionOrder(currentQuestionOrder + 1);
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
