import { IQuestion } from "@/models/game";
import styles from "./Proggres.module.css";
import React from "react";
import { convertToFormattedNumber } from "@/utils/convertToFormattedNumber";
import { Step } from "@/components/Step/Step";

export function Progress({
  questions,
  currentQuestion,
}: {
  questions: Array<IQuestion>;
  currentQuestion: IQuestion;
}) {
  const reversedQuestions = [...questions].reverse();
  return (
    <ul className={styles.container}>
      {reversedQuestions.map((question) => (
        <Step
          isActive={question.id === currentQuestion.id}
          key={question.id}
          reward={convertToFormattedNumber(question.reward)}
        />
      ))}
    </ul>
  );
}
