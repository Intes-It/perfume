import * as React from "react";
import { ReactNode, useMemo } from "react";

import Navbar from "./navbar";
import Header from "./header";
import Footer from "./footer";
import Title from "./title";
import Head from "next/head";
import { useRouter } from "next/router";
import { VisibleTitleRoutes } from "@definitions/constants";
interface Props {
  children?: ReactNode;
  // any props that come into the component
}

export const Layout = ({ children }: Props) => {
  const router = useRouter();
  const title = useMemo(() => {
    const pathName = router.pathname
      .replace(
        "[product-group]",
        (router.query["product-group"] as string) || ""
      )
      .replace(
        "[product-subgroup]",
        (router.query["product-subgroup"] as string) || ""
      );
    const item = VisibleTitleRoutes.find((item) => item?.route === pathName);
    return item?.title;
  }, [router.asPath]);

  return (
    <div>
      <Head>
        <title>{title}-Nature féerique</title>
      </Head>
      <Header />
      <Navbar />
      <Title />
      {children}
      <Footer />
    </div>
  );
};
