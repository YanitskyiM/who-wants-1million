import React from "react";

export function Step({
  reward,
  isActive,
  isPassed,
}: {
  reward: string;
  isActive: boolean;
  isPassed: boolean;
}) {
  const getStrokeColor = (): string => {
    if (isActive) return "var(--orange-100)";
    if (isPassed) return "var(--black-40)";
    return "var(--black-100)";
  };

  const textStrokeColor = getStrokeColor();

  return (
    <li style={{ width: "100%" }}>
      <svg
        width="100%"
        viewBox="0 0 376 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M69 20H0"
          stroke={isActive ? "var(--orange-100)" : "var(--black-40)"}
        ></path>
        <path
          d="M376 20H307"
          stroke={isActive ? "var(--orange-100)" : "var(--black-40)"}
        ></path>
        <path
          d="M81.4526 4.63788C83.6376 2.01596 86.8742 0.5 90.2872 0.5H285.713C289.126 0.5 292.362 2.01597 294.547 4.63788L307.349 20L294.547 35.3621C292.362 37.984 289.126 39.5 285.713 39.5H90.2872C86.8742 39.5 83.6376 37.984 81.4526 35.3621L68.6509 20L81.4526 4.63788Z"
          fill="white"
          stroke={isActive ? "var(--orange-100)" : "var(--black-40)"}
        ></path>
        <text
          x="50%"
          y="50%"
          fontFamily="Inter"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="1.25rem"
          fontWeight={400}
          fill={textStrokeColor}
        >
          ${reward}
        </text>
      </svg>
    </li>
  );
}
