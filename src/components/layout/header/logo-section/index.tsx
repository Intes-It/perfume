import * as React from "react";

const LogoSection = ({...props}) => {
  return (
    <div>
      <img {...props} src="/images/logo.png" alt="logo" />
    </div>
  );
};

export default LogoSection;
