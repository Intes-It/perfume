import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
 
const API_URL =
  "https://official-joke-api.appspot.com/jokes/programming/random";

const Home = () => {
  const { data, refetch } = useQuery(
    "repoData",
    () => fetch(API_URL).then((res) => console.log(res)),
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    refetch();
  }, []);
  return (
    <>
      <h2>dsadas</h2>
    </>
  );
};

export default Home;
