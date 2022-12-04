import * as React from "react";
import { ReactNode } from "react";

import Navbar from "./navbar";
import Header from "./header";
import Footer from "./footer";
import Title from "./title";

interface Props {
  children?: ReactNode;
  // any props that come into the component
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      <Navbar />
      <Title />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
