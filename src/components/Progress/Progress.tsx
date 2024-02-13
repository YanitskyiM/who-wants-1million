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

  return (
    <ul className={styles.container}>
      {questions
        .map((question) => (
          <Step
            key={question.id}
            isActive={question.id === currentQuestion.id}
            isPassed={question.order < currentQuestion.order}
            reward={convertToFormattedNumber(question.reward)}
          />
        ))
        .reverse()}
      <button onClick={handleToggleMute}>
        <MuteIcon isMute={isMuted} />
      </button>
    </ul>
  );
}
