import "../styles/globals.css";
import "antd/dist/antd.css";
import { MainContextProvider } from "../src/context/ContextProvider";

function MyApp({ Component, pageProps }) {
  return (
    <MainContextProvider>
      <Component {...pageProps} />
    </MainContextProvider>
  );
}

export default MyApp;
