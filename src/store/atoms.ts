import { atom } from "recoil";
import { IQuestion } from "@/models/game";

export const reachedQuestion = atom<IQuestion>({
  key: "reachedQuestion",
  default: undefined,
});

export const is1MillionReached = atom<boolean>({
  key: "is1MillionReached",
  default: false,
});
