import Document, { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;600;700&family=Libre+Baskerville:ital@1&family=Noto+Sans+Bengali:wght@300;400;500;600;700;800;900&family=Oswald:wght@300;400;500;600;700&family=Roboto+Slab:wght@100;200;300;400;500;600;700&family=Montserrat:wght@300;400;500;600;700&family=Poppins:wght@100;200;300;400;500;600;700&family=Dosis:wght@300;400;500;600;700&family=Hind+Siliguri:wght@300;400;500;600;700&family=Jost:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />

          {/* FAVICON ICON */}
          <link
            rel="icon"
            type="image/png"
            sizes="26x16"
            href="/logo/fav.jpeg"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "p9bqiqfwhk");
            `,
            }}
          />
        </Head>
        <body>
          {/* Google Tag Manager */}
          <Script id="gtm-script" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MT2FVC5P');
            `}
          </Script>
          {/* End Google Tag Manager */}

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
