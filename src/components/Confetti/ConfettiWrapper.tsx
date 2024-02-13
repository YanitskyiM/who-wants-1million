import React from "react";
import Confetti from "react-confetti";
import { useRecoilValue } from "recoil";
import { is1MillionReached } from "../../../store/atoms";
import { useWindowSize } from "react-use";

export function ConfettiWrapper({ children }: { children: React.ReactNode }) {
  const is1MillionReachedValue = useRecoilValue(is1MillionReached);
  const { width, height } = useWindowSize();

  return (
    <>
      {is1MillionReachedValue && <Confetti width={width} height={height} />}
      {children}
    </>
  );
}
