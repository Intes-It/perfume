import React from 'react';
import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider, type DehydratedState } from 'react-query';
import store from '@redux/store';
import 'tailwindcss/tailwind.css';
import { Hydrate } from 'react-query/hydration';
import { Provider } from 'react-redux';
import Head from 'next/head';
import '@styles/styles.css';
import LoadingIndicator from '@components/loading-indicator';
import { Layout } from '@components';
import GlobalStyle from '@styles/globalStyles';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { ThemeProvider } from 'next-themes';
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

function MyApp({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>): JSX.Element {
  const queryClient = new QueryClient();

  return (
    <div>
      <Head>
        <meta charSet="utf8" />
        <link rel="icon" href="/images/icon.png" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <script src="https://cdn.jsdelivr.net/npm/tw-elements/dist/js/index.min.js"></script>
      </Head>
      <div>
        <QueryClientProvider client={queryClient}>
          <GlobalStyle />
          <LoadingIndicator />
          <Hydrate state={pageProps.dehydratedState}>
            <Provider store={store}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </Provider>
          </Hydrate>
        </QueryClientProvider>
      </div>
    </div>
  );
}

export default MyApp;
