import 'antd/dist/antd.css';
import 'quill/dist/quill.snow.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { MainContextProvider } from '../src/context/ContextProvider';
import { UtilityContextProvider } from '../src/context/UtilitiesContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <MainContextProvider>
      <UtilityContextProvider>
        <Component {...pageProps} />
      </UtilityContextProvider>
    </MainContextProvider>
  );
}

export default MyApp;
