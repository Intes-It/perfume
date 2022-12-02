import React, { useContext } from "react";

import { Container, Header, Main, Footer, Cards } from "@components";
import { ThemeContext } from "styled-components";


const Home: React.FC = () => {
  const theme = useContext(ThemeContext);
  console.log(theme.colors.background);
  return (
    <Container>
      <Header />
      <Main />
      <Cards />
      <Footer />
    </Container>
  );
};

export default Home;
