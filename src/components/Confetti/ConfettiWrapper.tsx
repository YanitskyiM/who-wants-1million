import React from 'react';
import Confetti from 'react-confetti';
import { useRecoilValue } from 'recoil';
import { useWindowSize } from 'react-use';
import { is1MillionReached, isMuted } from '@/store/atoms';
import SoundId from '@/constants/sound';

function ConfettiWrapper({ children }: { children: React.ReactNode }) {
  const is1MillionReachedValue = useRecoilValue(is1MillionReached);
  const isMutedValue = useRecoilValue(isMuted);
  const { width, height } = useWindowSize();

  return (
    <>
      {is1MillionReachedValue && <Confetti width={width} height={height} />}
      {children}
      <audio id={SoundId.BG_SOUND} loop muted={isMutedValue} src="/sound/bg_sound.mp3">
        <track kind="captions" />
      </audio>
      <audio id={SoundId.GAME_OVER} muted={isMutedValue} src="/sound/game_over.mp3">
        <track kind="captions" />
      </audio>
      <audio id={SoundId.CORRECT_ANSWER} muted={isMutedValue} src="/sound/correct_answer.mp3">
        <track kind="captions" />
      </audio>
    </>
  );
}

export default ConfettiWrapper;
