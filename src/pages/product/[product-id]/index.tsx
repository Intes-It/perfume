import { BestSales } from "@components/best-sales";
import { Container } from "@components/container";
import Rating from "@components/rating/rating";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatCurrency } from "@utils/formatNumber";
import Parser from "html-react-parser";
import NextLink from "next/link";
import React, { useMemo, useState } from "react";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";
// import { Product } from "@types";

import { addProduct, updateProduct } from "@redux/slices/cart";
import { useDispatch, useSelector } from "react-redux";

import ImageModal from "@components/image-modal";
import useCart from "@hooks/useCart";
import { useBestSallingProducts, useProductDetail } from "@hooks/useProduct";
import useUser from "@hooks/useUser";
import { ExProduct } from "@types";
import { useRouter } from "next/router";

import { api } from "@utils/apiRoute";
import { GET } from "@utils/fetch";
import _ from "lodash";
import useSWR from "swr";
import { twMerge } from "tailwind-merge";

export const getServerSideProps: GetServerSideProps<{
  productId: string;
}> = async (context: any) => {
  const productId = context.query["product-id"];
  if (productId)
    return {
      props: {
        productId,
      },
    };
  return {
    notFound: true,
  };
};

const ProductDetail: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ productId }) => {
  // redux
  const dispatch = useDispatch();
  const localCart = useSelector(
    (state: any) => state.persistedReducer?.cart?.products
  ) as ExProduct[];

  const { isAuthenticated } = useUser();
  const { addProductToCart, addExistProductToCart } = useCart();
  const [tabs, setTabs] = useState(0);
  const [isError, setIsError] = useState(false);
  const { product, isLoading } = useProductDetail({ id: productId });
  const { products } = useBestSallingProducts();
  const [state, setState] = useState({
    isShowImageModal: false,
    amount: 1,
    packagePrice: 0,
    contenancePrice: 0,
    packageName: "",
    contenance: "",
    color: undefined,
    selectorImage: undefined,
    packageChoice: undefined,
    contenanceChoice: undefined,
  });

  const router = useRouter();

  const {
    isShowImageModal,
    amount,
    packagePrice,
    packageName,
    contenance,
    contenancePrice,
    color,
    selectorImage,
    packageChoice,
    contenanceChoice,
  } = state;

  const totalMoney = localCart?.reduce(
    (pre, curr) =>
      pre + curr.amount * Number.parseFloat(curr?.product?.price || "0"),
    0
  );
  const totalProducts = localCart?.reduce((pre, curr) => pre + curr.amount, 0);
  async function getCart() {
    const res = await GET(api.getCart);
    return res.data;
  }

  const { data, mutate } = useSWR("get-server-cart", getCart);
  const cart = data?.cart;
  const breadCrumb = useMemo(() => {
    let res = [{ name: "Accueil", route: "/" }];
    const groupRoute = product?.category?.name?.toLowerCase();

    const subGroupRoute = product?.subcategory?.name?.toLowerCase();

    if (groupRoute) {
      // const group = VisibleTitleRoutes?.find((item) => item?.route?.includes(groupRoute));
      res = [
        ...res,
        {
          name: product?.category?.name?.toLowerCase(),
          route: `/product-categories/${product?.category?.slug?.toLowerCase()}`,
        },
      ];
    }
    if (subGroupRoute) {
      res = [
        ...res,
        {
          name: product?.subcategory?.name?.toLowerCase(),
          route: `\\product-categories\\${product?.category?.slug}\\${product?.subcategory?.slug}`,
        },
      ];
    }
    return res;
  }, [product]);

  let namePackaging: any = [];
  if (product?.packaging) {
    namePackaging = Object?.values(product?.packaging)?.reduce(
      (a: any[], item: any) => a.concat(item?.name || ""),
      []
    );
    namePackaging.forEach((item: any, index: number) => {
      namePackaging[index] = item.replace(/\s/g, "");
    });
  }

  const DescriptionTabs = [
    {
      id: "tab-descriptions-tab",
      header: "Description",
      content: Parser(product?.note?.Description || ""),
    },
    {
      id: "tab-features-tab",
      header: "Caractéristiques",
      content: Parser(product?.note?.Caractéristiques || ""),
    },
    {
      id: "tab-utilisation-tab",
      header: "Utilisation",
      content: Parser(product?.note?.Utilisation || ""),
    },
    {
      id: "tab-composition-tab",
      header: "Composition",
      content: Parser(product?.note?.Composition || ""),
    },
  ];
  const setShowModal = (isOpen: boolean) => {
    setState((pre) => ({ ...pre, isShowImageModal: isOpen }));
  };

  const sumChoice =
    parseFloat(String(packagePrice)) +
    parseFloat(String(product?.price)) +
    parseFloat(String(contenancePrice));

  const handleAddProduct = async (type?: string) => {
    if (
      (typeof packageChoice === "undefined" &&
        Object.values(product.packaging)?.length > 0) ||
      (typeof contenanceChoice === "undefined" &&
        Object.values(product?.capacity)?.length > 0) ||
      (typeof color === "undefined" &&
        Object.values(product?.color)?.length > 0) ||
      amount < 1
    ) {
      setIsError(true);
      return;
    }
    if (isError) setIsError(false);
    if (isAuthenticated) {
      //check exist product
      if (type === "CHECKOUT") router.push("/checkout");
      const existProduct = localCart?.find((item: any) => {
        return (
          item?.product?.id === product?.id &&
          (item?.packaging === packageName ||
            (!item.packaging && packageName === "")) &&
          (item?.color === color || (!item.color && !color)) &&
          (item?.capacity === contenance ||
            (!item?.capacity && contenance === ""))
        );
      });

      let res;

      if (existProduct) {
        const data = {
          order_item_id: existProduct?.id,
          order_id: cart?.id || null,
          amount: amount + existProduct.amount,
          packaging: packageName === undefined ? null : packageName,
          color: color === undefined ? null : color,
          capacity: contenance === undefined ? null : contenance,
          total_amount: totalProducts + amount,
          total_price:
            Number.parseFloat(existProduct?.product?.price || "0") * amount +
            totalMoney,
        };
        res = await addExistProductToCart(data);
      } else {
        const data = {
          order_id: cart?.id || null,
          product_id: product?.id,
          amount: amount,
          packaging: packageName === undefined ? null : packageName,
          color: color === undefined ? null : color,
          capacity: contenance === undefined ? null : contenance,
          image: selectorImage,
          total_amount_cart: totalProducts + amount,
          price: sumChoice,
          total_price_item: sumChoice || 0,
          total_price_cart:
            Number.parseFloat(product?.price || "0") * amount + totalMoney,
        };
        res = await addProductToCart(data);
      }
      if (res?.status === 201 || res?.status === 200) {
        await mutate("get-server-cart");
        if (existProduct) {
          dispatch(
            updateProduct({
              ...res?.data,
            })
          );
        } else {
          dispatch(
            addProduct({
              ...res?.data?.data,
            })
          );
        }
      }
    } else {
      router.push("/my-account");
    }
  };

  if (isLoading) {
    return <div className="min-h-[80vh]" />;
  }
  return (
    <Container>
      <div className="grid grid-cols-1 gap-6 m-8 md:grid-cols-2 md:mx-28 md:my-20">
        {/* product image */}
        <div className="relative overflow-clip">
          <img
            className="object-fill w-full h-full max-h-[700px] transition duration-100 hover:scale-125 "
            // src={product?.url_image}
            src={
              selectorImage === undefined ? product?.url_image : selectorImage
            }
            alt={product?.name}
          />
          <button className="absolute right-0 top-0 bg-white rounded-full w-[2.2rem] h-[2.2rem]">
            <FontAwesomeIcon
              onClick={() => setShowModal(true)}
              icon={faSearch}
              fontSize={"1.1rem"}
            />
          </button>
        </div>

        {/* product info */}
        <div className="">
          {/* breadcrumb */}
          <div className="flex">
            {breadCrumb?.map((item, index) => {
              return (
                <div className="flex" key={index}>
                  <NextLink href={item?.route}>
                    <a className="cursor-pointer capitalize text-[#603813] hover:text-[#777777]">
                      {item?.name}
                    </a>
                  </NextLink>
                  <span className="mx-2">{"/"}</span>
                </div>
              );
            })}
          </div>
          <div>
            <span className="text-[#383e42] text-[30px]">{product?.name}</span>
          </div>
          <div className="my-3">
            <span className="text-[#603913]">{product?.shortDescription}</span>
          </div>
          <div className="flex gap-2 my-2">
            <Rating score={product?.evaluate || 0} />
            <span>{`( 0 avis client)`}</span>
          </div>
          {_.isEmpty(product?.packaging) ? (
            <div className="my-2">
              <span className="text-[#383e42] text-[24px] font-semibold">
                {formatCurrency(String(product?.price))} €
              </span>
            </div>
          ) : (
            <span className="mb-4 text-[#383e42] text-[24px] font-semibold">
              {packagePrice === 0 && contenancePrice === 0
                ? formatCurrency(String(product?.price))
                : formatCurrency(
                    String(
                      parseFloat(String(contenancePrice)) +
                        parseFloat(String(packagePrice)) +
                        parseFloat(String(product?.price))
                    )
                  )}{" "}
              €{" "}
            </span>
          )}

          {/* {_.isEmpty(product?.capacity) && (
            <div className="my-2">
              <span className="text-[#383e42] text-[24px] font-semibold">
                {formatCurrency(String(product?.price))} €
              </span>
            </div>
          )} */}
          {/* color */}
          <div className="my-3">
            {_.isEmpty(product?.color) ? null : (
              <span className="grid mb-4 text-[#603813] font-semibold">
                Color : {color}{" "}
              </span>
            )}
            <div className="flex gap-3 mt-4">
              {product?.color
                ? Object.values(product.color)?.map(
                    (item: any, index: number) => (
                      <button
                        key={index}
                        onClick={() => {
                          const color = item?.name;
                          setState((o) => ({
                            ...o,
                            color,
                            selectorImage: item.image,
                          }));
                        }}
                        style={{
                          background: `${item.color}`,
                        }}
                        className={twMerge(
                          "mb-3 border p-2 text-white outline-none",
                          color === item?.name && "border-black"
                        )}
                      >
                        {/* //  className={`mb-3 border p-2 text-white border-black bg-[#50d71e]`}>  */}
                        {item?.name}
                      </button>
                    )
                  )
                : null}
            </div>
          </div>
          {/* sub product */}
          <div className="flex gap-1 mt-4 mb-3 ">
            {_.isEmpty(product?.capacity) ? (
              <div
                role="tabpanel"
                className={` text-[#603813] transition-opacity duration-150 ease-linear `}
              >
                {product?.weight === 0 ? (
                  ""
                ) : (
                  <div>
                    <strong>Contenance</strong> :{product?.weight}g
                  </div>
                )}
              </div>
            ) : (
              <div
                role="tabpanel"
                className={` text-[#603813] transition-opacity duration-150 ease-linear `}
              >
                <strong>Contenance</strong> :{contenance}
              </div>
            )}
          </div>
          <div className="">
            <ul
              className="flex flex-col flex-wrap gap-2 pl-0 list-none border-b-0 md:flex-row"
              id="tabs-tab"
              role="tablist"
            >
              {product?.capacity
                ? Object.values(product.capacity)?.map(
                    (item: any, index: number) => (
                      <li role="presentation" key={index}>
                        <button
                          // href={"#" + capacityName[index]}
                          className={`p-3 block border text-[#16px] leading-tight text-[#515151] font-semibold hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate ${
                            contenanceChoice === index && "border-[#6A5950]"
                          } "
                          
                          `}
                          onClick={() => {
                            const contenancePrice = parseFloat(item?.price);
                            const contenance = item?.name;
                            if (isError) setIsError(false);
                            setState((o) => ({
                              ...o,
                              contenancePrice,
                              contenance,
                              contenanceChoice: index as any,
                            }));
                          }}
                        >
                          {item?.name}
                        </button>
                      </li>
                    )
                  )
                : null}
            </ul>
          </div>

          {/* packaging */}
          <div className="flex gap-1 mt-4 mb-3 ">
            {_.isEmpty(product?.packaging) ? null : (
              <div
                role="tabpanel"
                className={`mb-4  text-[#603813]    transition-opacity duration-150 ease-linear `}
              >
                <strong>Packaging</strong> : {packageName}
              </div>
            )}
          </div>
          <div>
            <ul
              className="flex flex-col flex-wrap gap-2 pl-0 list-none border-b-0 md:flex-row"
              id="tabs-tab"
              role="tablist"
            >
              {product?.packaging
                ? Object.values(product.packaging)?.map(
                    (item: any, index: number) => (
                      <li role="presentation" key={index}>
                        <button
                          // href={"#" + namePackaging[index]}
                          className={`p-3 block border text-[#16px] leading-tight text-[#515151] font-semibold hover:isolate focus:isolate hover:border-transparent hover:bg-neutral-100   ${
                            packageChoice === index ? "border-[#6A5950]" : ""
                          } `}
                          id={namePackaging[index]}
                          onClick={() => {
                            const packagePrice = parseFloat(item?.price);
                            const packageName = item?.name;
                            const selectorImage = item?.image;
                            if (isError) setIsError(false);
                            setState((o) => ({
                              ...o,
                              packagePrice,
                              packageName,
                              selectorImage,
                              packageChoice: index as any,
                            }));
                          }}
                          role="tab"
                        >
                          {item?.name}
                        </button>
                      </li>
                    )
                  )
                : null}
            </ul>
          </div>

          {/* add product to cart */}
          {isError && (
            <div className="mt-3 text-[#FF2626] font-semibold">
              {amount < 1
                ? "Please enter the quantity "
                : "Please choose the properties"}
            </div>
          )}
          <div className="flex items-center gap-3 mt-6">
            <input
              value={amount}
              onChange={(e: any) => {
                if (+e.target.value.charAt(0) === 0) {
                  e.target.value = e.target.value.substring(1);
                }
                const newValue = Number.parseInt(e.target.value) || 0;
                if (newValue > 0 && isError) setIsError(false);
                if (newValue <= 999) {
                  setState((pre) => ({
                    ...pre,
                    amount: newValue,
                  }));
                }
              }}
              type="number"
              className="h-10 p-1 text-center border outline-none border-gray w-14"
              min={0}
              max={999}
              placeholder={"1"}
            />
            <div className="flex gap-3">
              <button
                onClick={() => handleAddProduct()}
                className="ml-3 rounded-md p-5 bg-[#acd051] hover:bg-black text-white font-semibold"
              >
                Add To Cart
              </button>
              <button
                className="rounded-md bg-[#603813] p-5  hover:bg-black text-white font-semibold"
                onClick={() => {
                  handleAddProduct("CHECKOUT");
                }}
              >
                BUY
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* description tabs */}

      <div className="mx-16">
        <ul className="flex flex-col flex-wrap pl-0 mb-5 list-none border-b-0 md:flex-row">
          {DescriptionTabs?.map((item, index) => (
            <li role="presentation" key={index}>
              <button
                className={`my-2 block  border-b-0 border-t-2 border-transparent px-7 pt-4 pb-3.5 text-[#16px] leading-tight text-[#515151] font-semibold hover:border-transparent hover:bg-neutral-100   ${
                  tabs === index ? "border-t-[#6A5950]" : " "
                }  `}
                id={item?.id}
                onClick={() => setTabs(index)}
              >
                {item?.header}
              </button>
            </li>
          ))}
        </ul>
        <div className="w-full my-2">
          {DescriptionTabs.map(
            (item, index) =>
              tabs === index && (
                <div
                  key={index}
                  className="transition-opacity duration-150 ease-linear opacity-100 "
                >
                  <span className="text-[#603813] whitespace-pre-line">
                    {item.content}
                  </span>
                </div>
              )
          )}
        </div>
      </div>

      {/* susggestions */}

      <div className="mx-10 my-10">
        <span className="mx-8 text-[26px] font-light my-2">Suggestions</span>
        <BestSales products={products} />
      </div>
      <ImageModal
        imgUrl={product?.url_image}
        isShowModel={isShowImageModal}
        onClose={() => setShowModal(false)}
      />
    </Container>
  );
};

export default ProductDetail;
