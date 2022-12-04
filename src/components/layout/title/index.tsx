import { useRouter } from "next/router";
import * as React from "react";
import { useMemo } from "react";
import { VisibleTitleRoutes } from "src/constance";

const Title = () => {
  const router = useRouter();
  const title = useMemo(() => {
    const item = VisibleTitleRoutes.find(
      (item) => item?.route === router.pathname
    );
    return item?.title;
  }, [router.asPath]);

  return (
    <div>
      {title && (
        <div className="h-28 grid content-center text-center bg-[#eff7cf]">
          <h1 className="text-4xl mb-2">{title}</h1>
        </div>
      )}
    </div>
  );
};

export default Title;
