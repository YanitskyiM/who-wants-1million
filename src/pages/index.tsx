import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { Routes } from "@/constants/router";
import Image from "next/image";

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
        <div className={styles.container}>
          <Image
            src="/images/Hand.png"
            width={624}
            height={367}
            alt="Picture of the author"
          />
          <div>
            <h2 className={styles.title}>Who wants to be a millionaire?</h2>
            <button className="base" role="button" onClick={playGame}>
              Start
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
