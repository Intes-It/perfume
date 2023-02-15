import { useRouter } from "next/router";
import * as React from "react";
import { useMemo } from "react";
import { VisibleTitleRoutes } from "@definitions/constants";

const Title = () => {
  const router = useRouter();
  const title = useMemo(() => {
    const pathName = router.pathname.replace('[product-group]', router.query['product-group'] as string || '')
                                    .replace('[product-subgroup]', router.query['product-subgroup'] as string || '')
    const item = VisibleTitleRoutes.find(
      (item) => item?.route === pathName
    );
    return item?.title;
  }, [router.asPath]);

  return (
    <div>
      {title && (
        <div className="h-28 grid content-center text-center bg-[#eff7cf]">
          <h1 className="text-4xl mb-2 font-bold">{title}</h1>
        </div>
      )}
    </div>
  );
};

export default Title;
