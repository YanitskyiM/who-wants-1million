import { atom } from "recoil";
import { IQuestion } from "@/models/game";

export const reachedQuestion = atom<IQuestion>({
  key: "reachedQuestion",
  default: undefined,
});
