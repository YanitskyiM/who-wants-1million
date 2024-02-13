import styles from "@/components/Question/Question.module.css";
import React, { useMemo } from "react";

interface IAnswerSvgButtonProps {
  title: string;
  order: string;
  onClick: () => void;
  isSelected: boolean;
  isCorrect: boolean;
  isWrong: boolean;
  isDisabled: boolean;
}

export function AnswerSvgButton(props: IAnswerSvgButtonProps) {
  const { title, order, onClick, isSelected, isCorrect, isWrong, isDisabled } =
    props;

  const getPathClass = useMemo(() => {
    if (isCorrect) return styles.svg_button_correct;
    if (isWrong) return styles.svg_button_wrong;
    if (isSelected) return styles.svg_button_selected;
    return styles.svg_button_bg;
  }, [isCorrect, isWrong, isSelected]);

  return (
    <button disabled={isDisabled} onClick={onClick}>
      <svg
        width="389"
        height="72"
        className={styles.svg_button}
        viewBox="0 0 405 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path className={getPathClass} d="M388 36L405 36"></path>
        <path className={getPathClass} d="M0 36L17 36"></path>
        <path
          d="M38.7172 5.28344C40.8781 2.28016 44.3521 0.5 48.052 0.5H356.948C360.648 0.5 364.122 2.28016 366.283 5.28344L388.384 36L366.283 66.7166C364.122 69.7198 360.648 71.5 356.948 71.5H48.052C44.3521 71.5 40.8781 69.7198 38.7172 66.7166L16.616 36L38.7172 5.28344Z"
          className={getPathClass}
        ></path>
        <text
          x="56"
          y="44"
          fontFamily="Inter"
          fontSize="20"
          fontWeight={900}
          fill="#FF8B37"
        >
          {order}
        </text>
        <text x="84" y="44" fontFamily="Inter" fontSize="20" fill="black">
          {title}
        </text>
      </svg>
    </button>
  );
}
