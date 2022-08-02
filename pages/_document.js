import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;600;700&family=Libre+Baskerville:ital@1&family=Noto+Sans+Bengali:wght@300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          ></link>
          <link
            rel="icon"
            type="image/png"
            sizes="26x16"
            href="/logo/logo-fav.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
