import { IQuestion } from "@/models/game";
import styles from "./Question.module.css";
import React, { useState } from "react";
import { AnswerSvgButton } from "@/components/Question/AnswerSvgButton";

const REVEAL_CORRECT_ANSWER_DURATION = 1500;

export function Question({
  question: { answers, question, correctAnswerIds },
  onAnswerClick,
}: {
  question: IQuestion;
  onAnswerClick: (id: string) => void;
}) {
  const [selectedAnswer, setSelectedAnswer] = useState<null | string>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);

  const onAnswer = (id: string) => {
    setSelectedAnswer(id);
    onAnswerClick(id);
    setTimeout(() => {
      if (correctAnswerIds.includes(id)) {
        setIsCorrect(true);
      } else {
        setIsWrong(true);
      }
    }, REVEAL_CORRECT_ANSWER_DURATION);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.question_title}>{question}</h2>
      <div className={styles.answer_block}>
        {answers.map((answer) => (
          <AnswerSvgButton
            key={answer.id}
            order={answer.id}
            title={answer.text}
            onClick={() => onAnswer(answer.id)}
            isSelected={selectedAnswer === answer.id}
            isCorrect={isCorrect && selectedAnswer === answer.id}
            isWrong={isWrong && selectedAnswer === answer.id}
            isDisabled={selectedAnswer !== null}
          />
        ))}
      </div>
    </div>
  );
}
