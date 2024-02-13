import { Html, Head, Main, NextScript } from "next/document";
import { SOUND_ID } from "@/constants/sound";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <audio id={SOUND_ID.BG_SOUND} loop={true} src="/sound/bg_sound.mp3" />
        <audio id={SOUND_ID.GAME_OVER} src="/sound/game_over.mp3" />
        <audio id={SOUND_ID.CORRECT_ANSWER} src="/sound/correct_answer.mp3" />
      </body>
    </Html>
  );
}
