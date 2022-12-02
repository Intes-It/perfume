import { ReactNode } from "react";

interface Props {
  children?: ReactNode
  // any props that come into the component
}

export const Container = ({ children }:Props) => {
  return <div className="min-h-screen flex flex-col">{children}</div>;
};
