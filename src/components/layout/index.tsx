import * as React from "react";
import { ReactNode,useMemo } from "react";
import '@utils/i18n'
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
       <meta charSet="utf8" />
        <link
            rel="shortcut icon"
            href="/images/icon.png"
            type="image/x-icon"
        />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>
          {title
            ? `${title}- Nature féerique`
            : "Nature Féerique - Créateur de cosmétiques naturels solides"}
        </title>
      </Head>
      <Header />
      <Navbar />
      <Title />
      {children}
      <Footer />
    </div>
  );
};
