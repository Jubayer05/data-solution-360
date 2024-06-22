// import 'antd/dist/reset.css';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import 'quill/dist/quill.snow.css';
import { useEffect } from 'react';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { MainContextProvider } from '../src/context/ContextProvider';
import { UtilityContextProvider } from '../src/context/UtilitiesContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const handleRouteChangeStart = () => NProgress.start();
    const handleRouteChangeComplete = () => NProgress.done();
    const handleRouteChangeError = () => NProgress.done();

    Router.events.on('routeChangeStart', handleRouteChangeStart);
    Router.events.on('routeChangeComplete', handleRouteChangeComplete);
    Router.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      Router.events.off('routeChangeStart', handleRouteChangeStart);
      Router.events.off('routeChangeComplete', handleRouteChangeComplete);
      Router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, []);

  return (
    // <ConfigProvider>
    // <Analytics>
    <MainContextProvider>
      <UtilityContextProvider>
        <Component {...pageProps} />
      </UtilityContextProvider>
    </MainContextProvider>
    // </Analytics>
    // </ConfigProvider>
  );
}

export default MyApp;
