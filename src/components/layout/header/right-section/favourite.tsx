import { Routes } from "@definitions/constants";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setList } from "@redux/slices/favorite";
import { Product } from "@types";
import { api } from "@utils/apiRoute";
import { GET } from "@utils/fetch";
import { getCookie } from "cookies-next";
import NextLink from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Favourite = () => {
  const access_token = getCookie("access_token");

  const dispatch = useDispatch();

  const favoriteProducts = useSelector(
    (state: any) => state?.favorite?.list
  ) as Product[];

  const handleGetFavorite = async () => {
    if (!access_token) {
      dispatch(setList([]));
      return;
    }

    try {
      const res = await GET(api.get_favourite + "?page_size=1000");

      if (
        (res.status === 200 || res.status === 201) &&
        res.data?.results?.length > 0
      ) {
        const newData = res.data?.results?.map((item: any) => item?.product);
        dispatch(setList(newData));
      } else {
        dispatch(setList([]));
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    handleGetFavorite();
  }, [access_token]);

  return (
    <React.Fragment>
      <NextLink href={access_token ? Routes.favorite.route : "/my-account"}>
        <span className={"relative inline-block"}>
          <FontAwesomeIcon
            icon={faHeart}
            fontSize={"1.5rem"}
            className={"h-6"}
          />
          {favoriteProducts?.length > 0 && (
            <span
              className={
                "absolute top-badge  right-0 px-1 text-center h-3 text-xs font-bold leading-none text-red-100 transform bg-red-500 rounded-full"
              }
            >
              {favoriteProducts?.length}
            </span>
          )}
        </span>
      </NextLink>
    </React.Fragment>
  );
};

export default Favourite;
