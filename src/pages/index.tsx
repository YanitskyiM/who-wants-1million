import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { Routes } from "@/constants/router";
import { HandResponsiveImage } from "@/components/HandResponsiveImage/HandResponsiveImage";

export default function Home() {
  const router = useRouter();

  function playGame() {
    return router.push(Routes.GAME);
  }

  return (
    <>
      <Head>
        <title>Who Wants to Be a Millionaire?</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="One Million" />
        <meta
          property="og:description"
          content="Who Wants to Be a Millionaire?"
        />
        <meta property="og:image" content="/open-graph.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.main__container}>
          <HandResponsiveImage />
          <div className={styles.main__container__content}>
            <h2 className={styles.main__container__content__title}>
              Who wants to be a millionaire?
            </h2>
            <button className="base" role="button" onClick={playGame}>
              Start
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
