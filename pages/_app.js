import { MainContextProvider } from "../context/ContextProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <MainContextProvider>
      <Component {...pageProps} />
    </MainContextProvider>
  );
}

export default MyApp;
