import Link from "next/link";

const LogoSection = ({ ...props }) => {
  return (
    <div className="mx-auto cursor-pointer w-fit">
      <Link href={"/"} className="cursor-pointer">
        <img {...props} src="/images/logo.png" alt="logo" />
      </Link>
    </div>
  );
};

export default LogoSection;
