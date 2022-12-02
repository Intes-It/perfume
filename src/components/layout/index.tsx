import * as React from "react";
import { ReactNode } from "react";

import NavBar from "./navbar";
import Header from "./header";
import Footer from "./footer";

interface Props {
  children?: ReactNode;
  // any props that come into the component
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <NavBar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
