import React, { useContext, useEffect } from "react";

import { Container, Header, Main, Footer, Cards } from "@components"; 
import { useTheme } from "next-themes";

const Home: React.FC = () => { 
  const {setTheme, systemTheme, theme} = useTheme();
  useEffect(()=>{
    // setTheme('light');
  },[]);
  
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
