import { IQuestion } from '@/models/game';
import React from 'react';
import MuteIcon from '@/components/SvgIcons/MuteIcon';
import Step from '@/components/Step/Step';
import convertToFormattedNumber from '@/utils/convertToFormattedNumber';
import { useRecoilState } from 'recoil';
import { toggleMuteSelector } from '@/store/atoms';
import styles from './Proggres.module.css';

function Progress({
  questions,
  currentQuestion,
}: {
  questions: Array<IQuestion>;
  currentQuestion: IQuestion;
}) {
  const [isMutedValue, toggleMute] = useRecoilState(toggleMuteSelector);

  return (
    <ul className={styles.progress__container}>
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
      <button aria-label="toggle sound" type="button" onClick={() => toggleMute(isMutedValue)}>
        <MuteIcon isMute={isMutedValue} />
      </button>
    </ul>
  );
}

export default Progress;
