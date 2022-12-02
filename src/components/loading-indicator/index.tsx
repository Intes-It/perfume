import * as React from "react";
import { useIsFetching } from "react-query";
import styled from "styled-components";
import { border, color, layout, space, typography } from "styled-system";

const Title = styled.h1`
  font-size: 1.5em;
  color: palevioletred;
`;

const DivStyled = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9998;
  background-color: rgba(0, 0, 0, 0.4);
`; 

const LoadingIndicator =() => {
  const isFetching = useIsFetching();
  return isFetching ? (
    <>
      <DivStyled>
        <div className="w-24 h-24 border-l-4 border-blue-300 rounded-full animate-spin"></div>
      </DivStyled>
    </>
  ) : null;
};

export default LoadingIndicator;
