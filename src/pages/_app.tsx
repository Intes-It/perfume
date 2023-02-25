import React from "react";
import { AppProps } from "next/app";
import {
  QueryClient,
  QueryClientProvider,
  type DehydratedState,
} from "react-query";
import store from "@redux/store";
import "tailwindcss/tailwind.css";
import { Hydrate } from "react-query/hydration";
import { Provider } from "react-redux";
import Head from "next/head";
import '@styles/styles.css'
import LoadingIndicator from "@components/loading-indicator";
import { Layout } from "@components";
import GlobalStyle from "@styles/globalStyles";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Script from 'next/script'
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

function MyApp({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>): JSX.Element {
  const queryClient = new QueryClient();
  const persistor = persistStore(store)
  return (
    <>
      <Head>
        <meta charSet="utf8" />
        <link rel="icon" href="/images/icon.png" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Script src="https://cdn.jsdelivr.net/npm/tw-elements/dist/js/index.min.js" />
      <div>
        <QueryClientProvider client={queryClient}>
          <GlobalStyle />
          <LoadingIndicator />
          <Hydrate state={pageProps.dehydratedState}>
            <Provider store={store}>
              {/* <PersistGate loading={null} persistor={persistor}> */}
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              {/* </PersistGate> */}
            </Provider>
          </Hydrate>
        </QueryClientProvider>
      </div>
   </>
  );
}

export default MyApp;
