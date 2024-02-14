import { IQuestion } from "@/models/game";
import styles from "./Question.module.css";
import React, { useState } from "react";
import { AnswerSvgButton } from "@/components/Question/AnswerSvgButton";
import { REVEAL_CORRECT_ANSWER_HIGHLIGHT_DURATION } from "@/constants/time";
import { wait } from "@/utils/wait";

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

  const onAnswer = async (id: string) => {
    setSelectedAnswer(id);
    onAnswerClick(id);
    await wait(REVEAL_CORRECT_ANSWER_HIGHLIGHT_DURATION);

    if (correctAnswerIds.includes(id)) {
      setIsCorrect(true);
    } else {
      setIsWrong(true);
    }
  };

  return (
    <div className={styles.question__container}>
      <h2 className={styles.question__title}>{question}</h2>
      <div className={styles.question__answer__block}>
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
