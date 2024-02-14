import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { ConfettiWrapper } from "@/layout/Confetti/ConfettiWrapper";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ConfettiWrapper>
        <Component {...pageProps} />
      </ConfettiWrapper>
    </RecoilRoot>
  );
}
