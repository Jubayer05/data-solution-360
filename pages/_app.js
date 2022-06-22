import "../styles/globals.css";
import "antd/dist/antd.css";
import { ContextProvider } from "../src/context/UtilitiesContext";
import { QuizContextProvider } from "../src/context/QuizContextStu";

function MyApp({ Component, pageProps }) {
  return (
    <QuizContextProvider>
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </QuizContextProvider>
  );
}

export default MyApp;
