import React from "react";
import Confetti from "react-confetti";
import { useRecoilValue } from "recoil";
import { useWindowSize } from "react-use";
import { is1MillionReached } from "@/store/atoms";

// todo: sound componemt, sound atom
// todo: create hsaMap and change src
// todo: based on recoil state play pause

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
