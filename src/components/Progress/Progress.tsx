import { IQuestion } from "@/models/game";
import styles from "./Proggres.module.css";
import React from "react";
import { convertToFormattedNumber } from "@/utils/convertToFormattedNumber";
import { Step } from "@/components/Step/Step";
import MuteIcon from "@/components/SvgIcons/MuteIcon";
import { useMuteToggle } from "@/hooks/useMuteToggle";

export function Progress({
  questions,
  currentQuestion,
}: {
  questions: Array<IQuestion>;
  currentQuestion: IQuestion;
}) {
  const { isMuted, handleToggleMute } = useMuteToggle();
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
      <button onClick={handleToggleMute}>
        <MuteIcon isMute={isMuted} />
      </button>
    </ul>
  );
}
