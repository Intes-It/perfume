import React, { useState } from "react";
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

import "@styles/styles.css";
import LoadingIndicator from "@components/loading-indicator";
import { Layout } from "@components";
import GlobalStyle from "@styles/globalStyles";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { persistStore } from "redux-persist";

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

function MyApp({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>): JSX.Element {
  const [state, setState] = useState({ queries: 0, mutations: 0 });
  const { queries, mutations } = state;
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";
  let queryCount = 0,
    mutationCount = 0;

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 3000, // 5 minutes
      },
      mutations: {
        onMutate: () => {
          mutationCount = mutationCount + 1;
          setState((pre) => ({ ...pre, mutations: mutationCount }));
        },
        onError: () => {
          console.log("error");
          // Nếu bạn muốn xử lý các lỗi xảy ra trong quá trình mutation
        },
        onSuccess: () => {
          console.log("onSuccess");
          // Nếu bạn muốn xử lý các thành công xảy ra trong quá trình mutation
        },
        onSettled: () => {
          mutationCount = mutationCount - 1;
          setState((pre) => ({ ...pre, mutations: mutationCount }));
        },
      },
    },
  });

  queryClient.getQueryCache().subscribe((event: any) => {
    if (event?.["action"]?.type === "fetch") {
      if (
        event.query.queryKey !== "get-profile" &&
        event.query.queryKey !== "get-cart" &&
        pathname !== "my-account" &&
        pathname !== "cart"
      ) {
        queryCount = queryCount + 1;
        setState((pre) => ({ ...pre, queries: queryCount }));
      }
    } else if (
      event?.["action"]?.type === "success" ||
      event?.["action"]?.type === "error"
    ) {
      queryCount = queryCount - 1;
      setState((pre) => ({ ...pre, queries: queryCount }));
    }
  });
  persistStore(store);
  return (
    <>
      {/* <Head>
       
      </Head> */}
      <div>
        <QueryClientProvider client={queryClient}>
          <GlobalStyle />
          {(queries > 0 || mutations > 0) && <LoadingIndicator />}
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
