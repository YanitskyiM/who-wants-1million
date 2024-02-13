import React, { useState } from "react";
import gameData from "../mock/game.json";
import { IGame, IQuestion } from "@/models/game";
import styles from "@/styles/Game.module.css";
import { useRouter } from "next/router";
import { Routes } from "@/constants/router";

const gameQuestions: IQuestion[] = (gameData as IGame).questions;

export default function Game() {
  const router = useRouter();
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

function Progress({
  questions,
  currentQuestion,
}: {
  questions: Array<IQuestion>;
  currentQuestion: IQuestion;
}) {
  return (
    <div>
      {questions.map((question) => (
        <div
          key={question.id}
          className={`${styles.progress_item} ${
            currentQuestion.id === question.id ? styles.active_progress : ""
          }`}
        >
          {question.reward} $
        </div>
      ))}
    </div>
  );
}

function Question({
  question: { answers, question },
  onAnswerClick,
}: {
  question: IQuestion;
  onAnswerClick: (id: number) => void;
}) {
  return (
    <div>
      <h2 className={styles.question_title}>{question}</h2>
      <div className={styles.answer_block}>
        {answers.map((answer) => (
          <button
            className={styles.answer_item}
            key={answer.id}
            onClick={() => onAnswerClick(answer.id)}
          >
            {answer.text}
          </button>
        ))}
      </div>
    </div>
  );
}
