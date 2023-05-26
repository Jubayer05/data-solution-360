/* eslint-disable @next/next/no-page-custom-font */
import Head from "next/head";
import { HomeComp } from "../components";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Data Solution-360</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo/logo.jpg" />
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Head>

      <main>
        <HomeComp />
      </main>
    </div>
  );
}
