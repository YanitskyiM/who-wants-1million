import React, { useState } from "react";
import gameData from "../mock/game.json";
import { IGame, IQuestion } from "@/models/game";
import styles from "@/styles/Game.module.css";
import { useRouter } from "next/router";
import { Routes } from "@/constants/router";
import { Question } from "@/components/Question/Question";
import { Progress } from "@/components/Progress/Progress";
import { reachedQuestion } from "../../store/atoms";
import { useSetRecoilState } from "recoil";

const gameQuestions: IQuestion[] = (gameData as IGame).questions;

export default function Game() {
  const router = useRouter();
  const setReachedQuestion = useSetRecoilState(reachedQuestion);
  const [currentQuestionOrder, setCurrentQuestionOrder] = useState<number>(1); // Start with the first question

  const questionMap: { [id: number]: IQuestion } = gameQuestions.reduce(
    (map: { [id: number]: IQuestion }, question: IQuestion) => {
      map[question.id] = question;
      return map;
    },
    {},
  );

  // useEffect(() => {
  //   const letsPlayAudio = document.getElementById("start");
  //
  //   letsPlayAudio && letsPlayAudio.play();
  // }, []);

  const currentQuestion = questionMap[currentQuestionOrder];

  const handleChangeQuestion = async (answerId: number) => {
    // const letsPlayAudio = document.getElementById("start");
    // const wrongAnswer = document.getElementById("wrong-answer");
    // const correctAnswer = document.getElementById("correct-answer");
    if (!currentQuestion.correctAnswerIds.includes(answerId)) {
      // letsPlayAudio && letsPlayAudio.pause();
      // wrongAnswer && wrongAnswer.play();
      setReachedQuestion(questionMap[currentQuestionOrder - 1]);
      return await router.push(Routes.GAME_OVER);
    }

    // letsPlayAudio && letsPlayAudio.pause();
    // correctAnswer && correctAnswer.play();
    // setTimeout(() => {
    //   letsPlayAudio && letsPlayAudio.play();
    // }, 3000);
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
