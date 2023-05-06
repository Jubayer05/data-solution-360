import "../styles/globals.css";
import "antd/dist/antd.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MainContextProvider } from "../src/context/ContextProvider";
import { UtilityContextProvider } from "../src/context/UtilitiesContext";

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
