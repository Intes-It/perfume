import { VisibleTitleRoutes } from "@definitions/constants";
import { useRouter } from "next/router";
import { useMemo } from "react";

const Title = () => {
  const router = useRouter();
  const title = useMemo(() => {
    const pathName = router.pathname
      .replace(
        "[product-group]",
        (router.query["product-group"] as string) || ""
      )
      .replace(
        "[product-subgroup]",
        (router.query["product-subgroup"] as string) || ""
      );

    const item = VisibleTitleRoutes.find((item) => item?.route === pathName);
    return item?.title;
  }, [router.asPath]);

  return (
    <div>
      {title && (
        <div className="h-28 grid content-center text-center bg-[#eff7cf]">
          <h1 className="mb-2 text-4xl font-bold uppercase">{title}</h1>
        </div>
      )}
    </div>
  );
};

export default Title;
