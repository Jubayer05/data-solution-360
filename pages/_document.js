import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* NOTE: FONT 1 */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;600;700&family=Libre+Baskerville:ital@1&family=Noto+Sans+Bengali:wght@300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          ></link>

          {/* NOTE: FONT 2 */}
          <link
            href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Roboto+Slab:wght@100;200;300;400;500;600;700&display=swap"
            rel="stylesheet"
          ></link>

          {/* NOTE: FONT 3 */}
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          ></link>

          {/* NOTE: FONT 4 */}
          <link
            href="https://fonts.googleapis.com/css2?family=Dosis:wght@300;400;500;600;700&family=Hind+Siliguri:wght@300;400;500;600;700&family=Poppins:wght@100;200;300;400;500;600;700&display=swap"
            rel="stylesheet"
          ></link>

          {/* FAVICON ICON */}
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
