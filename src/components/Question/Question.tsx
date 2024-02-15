import { IQuestion } from '@/models/game';
import React, { useState } from 'react';
import AnswerSvgButton from '@/components/Question/AnswerSvgButton';
import { REVEAL_CORRECT_ANSWER_HIGHLIGHT_DURATION } from '@/constants/time';
import wait from '@/utils/wait';
import { useRecoilValue } from 'recoil';
import { isGameOverTime } from '@/store/atoms';
import styles from './Question.module.css';

function Question({
  question: { answers, question, correctAnswerIds },
  onAnswerClick,
}: {
  question: IQuestion;
  onAnswerClick: (id: string) => void;
}) {
  const [selectedAnswer, setSelectedAnswer] = useState<null | string>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctAnswerId, setCorrectAnswerId] = useState<string[] | null>(null);
  const [isWrong, setIsWrong] = useState(false);
  const isGameOverTimeValue = useRecoilValue(isGameOverTime);

  const onAnswer = async (id: string) => {
    setSelectedAnswer(id);
    onAnswerClick(id);
    await wait(REVEAL_CORRECT_ANSWER_HIGHLIGHT_DURATION);

    if (correctAnswerIds.includes(id)) {
      setIsCorrect(true);
    } else {
      setIsWrong(true);
      setCorrectAnswerId(correctAnswerIds);
    }
  };

  return (
    <div className={styles.question__container}>
      <h2 className={styles.question__title}>{question}</h2>
      <div className={styles.question__answer__block}>
        {answers.map((answer, idx) => (
          <AnswerSvgButton
            key={answer.id}
            idx={idx}
            order={answer.id}
            title={answer.text}
            onClick={() => onAnswer(answer.id)}
            isSelected={selectedAnswer === answer.id}
            isCorrect={
              (isCorrect && selectedAnswer === answer.id)
              || Boolean(correctAnswerId?.includes(answer.id))
            }
            isWrong={(isWrong && selectedAnswer === answer.id) || isGameOverTimeValue}
            isDisabled={Boolean(selectedAnswer)}
          />
        ))}
      </div>
    </div>
  );
}

export default Question;
