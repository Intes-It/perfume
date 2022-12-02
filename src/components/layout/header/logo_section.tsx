import * as React from "react";

const LogoSection = ({ ...rest }) => {
  return (
    <div {...rest}>
      <img className="mx-auto h-28" src="/images/logo.png" alt="logo" />
    </div>
  );
};

export default LogoSection;
