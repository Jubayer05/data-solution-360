import 'draft-js/dist/Draft.css';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import 'quill/dist/quill.snow.css';
import { useEffect } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { AuthProvider } from '../src/context/auth/AuthContext';
import { MainContextProvider } from '../src/context/ContextProvider';
import { NotificationProvider } from '../src/context/NotificationContext';
import { StudentContextProvider } from '../src/context/StudentContext';
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
    <AuthProvider>
      <MainContextProvider>
        <UtilityContextProvider>
          <StudentContextProvider>
            <NotificationProvider>
              <Component {...pageProps} />
            </NotificationProvider>
          </StudentContextProvider>
        </UtilityContextProvider>
      </MainContextProvider>
    </AuthProvider>
  );
}

export default MyApp;
