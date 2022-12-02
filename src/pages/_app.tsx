import React, { useEffect } from "react";
import { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import { StyledThemeProvider } from "@definitions/styled-components";
import { QueryClient, QueryClientProvider, type DehydratedState } from "react-query";
import { Hydrate } from "react-query/hydration";
import { Provider } from "react-redux";
import store from "@redux/store"; 
import LoadingIndicator from "@components/loading-indicator";

function MyApp({ Component, pageProps }: AppProps<{ dehydratedState: DehydratedState }>): JSX.Element {
  const queryClient = new QueryClient();
  useEffect(
    ()=>{
      console.log("fetching:%o",queryClient.isFetching())
    },[queryClient.isFetching()]
  )
  return (
    <StyledThemeProvider>
      <QueryClientProvider client={queryClient}>
        <LoadingIndicator/>
        <Hydrate state={pageProps.dehydratedState}> 
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </Hydrate>
      </QueryClientProvider>
    </StyledThemeProvider>
  );
}

export default MyApp;
