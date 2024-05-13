import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const DynamicComponentWithNoSSR = dynamic(
  () => import("../../../components/confirm-pass/index") as any,
  { ssr: false }
) as any;
const ResetPassword = () => {
  const router = useRouter();
  const [tab, setTab] = useState(1);
  const { email } = router.query;

  return (
    <div className="">
      <div className="grid h-28 content-center text-center bg-[#eff7cf]">
        <h1 className="mb-2 text-4xl font-extrabold uppercase">My account</h1>
      </div>
      <div className="py-14 md:py-10 max-w-[1440px] px-3 mx-auto">
        {
          {
            1: (
              <DynamicComponentWithNoSSR
                changeTab={() => setTab(2)}
                email={email?.toString() || ""}
              />
            ),
            2: (
              <div className="flex flex-col min-h-[300px] justify-center gap-24">
                <div className="text-[#00D455] flex justify-center gap-2">
                  <svg
                    width="28"
                    height="21"
                    viewBox="0 0 28 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.91602 21.0007L0.416016 11.5007L2.79102 9.12565L9.91602 16.2506L25.2077 0.958984L27.5827 3.33398L9.91602 21.0007Z"
                      fill="#00D455"
                    />
                  </svg>
                  <div>Change password successfully. You can sign in now</div>
                </div>
                <Link href="/my-account">
                  <button className="bg-[#09C505] mx-auto  rounded-lg w-[320px] transition duration-300 ease-in-out h-12 gra3 flex items-center justify-center font-bold text-white cursor-pointer">
                    SIGN IN NOW
                  </button>
                </Link>
              </div>
            ),
          }[tab]
        }
      </div>
    </div>
  );
};

export default ResetPassword;
