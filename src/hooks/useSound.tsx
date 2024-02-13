import { SOUND_ID } from "@/constants/sound";

export function useSound(id: SOUND_ID) {
  const isBrowser = typeof window !== "undefined";

  if (!isBrowser) {
    return [() => {}, () => {}];
  }

  const sound = document.getElementById(id) as HTMLAudioElement | null;

  if (!sound) {
    throw new Error(`Sound with id ${id} not found`);
  }

  async function fromBeginning() {
    if (sound) {
      sound.currentTime = 0;
      await sound.play();
    }
  }

  return [async () => await sound.play(), () => sound.pause(), fromBeginning];
}
