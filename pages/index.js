import Head from "next/head";
import { HomeComp } from "../components";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Data Solution-360</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo/logo.jpg" />
      </Head>

      <main>
        <HomeComp />
      </main>
    </div>
  );
}
