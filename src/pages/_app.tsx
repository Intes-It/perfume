import React, { useEffect } from "react";
import { AppProps } from "next/app";
import "tailwindcss/tailwind.css"; 
import { QueryClient, QueryClientProvider, type DehydratedState } from "react-query";
import { Hydrate } from "react-query/hydration";
import { Provider } from "react-redux";
import store from "@redux/store"; 
import LoadingIndicator from "@components/loading-indicator";
import Layout from "@components/layout"; 
import { ThemeProvider } from "next-themes";
import GlobalStyle from "@styles/globalStyles";

function MyApp({ Component, pageProps }: AppProps<{ dehydratedState: DehydratedState }>): JSX.Element {
  const queryClient = new QueryClient(); 
  return (
    <ThemeProvider attribute="class">
      <QueryClientProvider client={queryClient}>
        <GlobalStyle/>
        <LoadingIndicator/>
        <Hydrate state={pageProps.dehydratedState}> 
          <Provider store={store}>
            <Layout>
              <Component {...pageProps}/>
            </Layout>
          </Provider>
        </Hydrate>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;
