import SoundId from '@/constants/sound';

function useSound(id: SoundId) {
  const isBrowser = typeof window !== 'undefined';

  if (!isBrowser) {
    return [() => {}, () => {}];
  }

  const sound = document.getElementById(id) as HTMLAudioElement | null;

  if (!sound) {
    throw new Error(`Sound with id ${id} not found`);
  }

  async function play() {
    if (sound) {
      sound.currentTime = 0;
      await sound.play();
    }
  }

  return [play, () => sound.pause()];
}

export default useSound;
