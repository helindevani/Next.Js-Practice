import Layout from "../components/layout/layout";
import "../styles/globals.css";
import { SessionProvider , Provider} from "next-auth/react";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
    </Provider>
  );
}

export default MyApp;
