import { atom, selector } from 'recoil';
import { IQuestion } from '@/models/game';

export const reachedQuestion = atom<IQuestion>({
  key: 'reachedQuestion',
  default: undefined,
});

export const is1MillionReached = atom<boolean>({
  key: 'is1MillionReached',
  default: false,
});

export const isMuted = atom<boolean>({
  key: 'isMuted',
  default: false,
});

export const toggleMuteSelector = selector({
  key: 'toggleMuteSelector',
  get: ({ get }) => get(isMuted),
  set: ({ set }) => set(isMuted, (prev) => !prev),
});
