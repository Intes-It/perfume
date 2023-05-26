import React, { useEffect, useMemo, useState } from "react";
import NextLink from "next/link";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatCurrency } from "@utils/formatNumber";
import { Container } from "@components/container";
import { BestSales } from "@components/best-sales";
import Rating from "@components/rating/rating";
import Parser from "html-react-parser";
import { Tabs } from "flowbite-react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
// import { Product } from "@types";

import { addProduct } from "@redux/slices/cart";
import { useDispatch, useSelector } from "react-redux";

import ImageModal from "@components/image-modal";
import { useProductDetail, useBestSallingProducts } from "@hooks/useProduct";
import { useRouter } from "next/router";
import useUser from "@hooks/useUser";
import { ExProduct } from "@types";
import useCart from "@hooks/useCart";
import { useAllCategory } from "@hooks/useCategory";
import _ from "lodash";

const { Group, Item } = Tabs;

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
  const { addProductToCart, addExistProductToCart, cart } = useCart();
  const [tabs, setTabs] = useState(0);
  const { product } = useProductDetail({ id: productId });
  const { products } = useBestSallingProducts();
  const { data } = useAllCategory();
  const [state, setState] = useState({
    isShowImageModal: false,
    quantity: 1,
    packagePrice: 0,
    contenancePrice: 0,
    packageName: "Recharge",
    contenance: undefined,
    color: undefined,
    selectorImage: undefined,
    packageChoice: 0,
    contenanceChoice: 0,
  });

  const router = useRouter();

  const {
    isShowImageModal,
    quantity,
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
      pre + curr.quantity * Number.parseFloat(curr?.product?.price || "0"),
    0
  );
  const totalProducts = localCart?.reduce(
    (pre, curr) => pre + curr.quantity,
    0
  );

  const breadCrumb = useMemo(() => {
    // console.log(product);
    let res = [{ name: "Accueil", route: "/" }];
    const groupRoute = product?.category?.name?.toLowerCase();
    const subGroupRoute = product?.subcategory?.name?.toLowerCase();
    if (groupRoute) {
      // const group = VisibleTitleRoutes?.find((item) => item?.route?.includes(groupRoute));
      res = [
        ...res,
        {
          name: product?.category?.name?.toLowerCase(),
          route: `\\product-categories\\${product?.category?.slug}`,
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

  const capacityName: any = ["one", "two"];
  // let capacityName: any = [];
  // if (product?.capacity) {
  //   capacityName = Object?.values(product?.capacity)?.reduce(
  //     (a: any[], item: any) => a.concat(item?.name || ''),
  //     []
  //   );
  //   capacityName.forEach((item: any, index: number) => {
  //     capacityName[index] = item.replace(/\s/g, '');
  //   });
  //   console.log(capacityName);
  // }
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

  const handleAddProduct = async () => {
    if (isAuthenticated) {
      //check exist product
      const existProduct = localCart?.find(
        (item: any) =>
          item?.product?.id === product?.id &&
          item?.packageName === packageName &&
          item?.color === color &&
          item?.capacity === contenance
      );
      let res;
      if (existProduct) {
        const data = {
          order_item_id: existProduct?.orderId,
          order_id: cart?.data?.cart?.id || null,
          amount: quantity,
          packaging: packageName === undefined ? null : packageName,
          color: color === undefined ? null : color,
          capacity: contenance === undefined ? null : contenance,
          total_amount: totalProducts + quantity,
          total_price:
            Number.parseFloat(existProduct?.product?.price || "0") * quantity +
            totalMoney,
        };
        res = await addExistProductToCart(data);
      } else {
        const data = {
          order_id: cart?.data?.cart?.id || null,
          product_id: product?.id,
          amount: quantity,
          packaging: packageName === undefined ? null : packageName,
          color: color === undefined ? null : color,
          capacity: contenance === undefined ? null : contenance,
          image: selectorImage,
          total_amount_cart: totalProducts + quantity,
          price: sumChoice,
          total_price_item: sumChoice || 0 * quantity,
          total_price_cart:
            Number.parseFloat(product?.price || "0") * quantity + totalMoney,
        };
        res = await addProductToCart(data);
      }
      if (res?.status === 201 || res?.status === 200) {
        dispatch(
          addProduct({
            product,
            quantity,
            orderId: res?.data?.data?.id,
            packageName: packageName,
            color: color,
            capacity: contenance,
            price: sumChoice,
            image:
              selectorImage === undefined ? product?.url_image : selectorImage,
          })
        );
      }
    } else {
      dispatch(
        addProduct({
          product,
          quantity,
          packageName: packageName,
          color: color,
          capacity: contenance,
          price: sumChoice,
          image:
            selectorImage === undefined ? product?.url_image : selectorImage,
        })
      );
    }
  };

  return (
    <Container>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6 md:mx-28 md:my-20 m-8">
        {/* product image */}
        <div className="overflow-clip relative">
          <img
            className="hover:scale-125 transition duration-100 w-full object-cover"
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
                    <span className="cursor-pointer text-[#603813] hover:text-[#777777]">
                      {item?.name}
                    </span>
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
          {
            _.isEmpty(product?.capacity) &&
            <div className="my-2">
              <span className="text-[#383e42] text-[24px] font-semibold">
                {formatCurrency(String(product?.price))} €
              </span>
            </div>
          }
          {/* color */}
          <div className="my-3">
            {_.isEmpty(product?.color) ? null : (
              <span className="grid mb-4 text-[#603813] font-semibold">
                Color : {color}{" "}
              </span>
            )}
            <div className="mt-4 flex gap-3">
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
                        }));
                      }}
                      style={{
                        background: `${item.color}`,
                      }}
                      className={`mb-3 border p-2 text-white border-black `}
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
          <div className="mt-4 mb-3 flex gap-1 ">
            {_.isEmpty(product?.capacity) ? null : (
              <div
                role="tabpanel"
                className={` text-[#603813] transition-opacity duration-150 ease-linear `}
              >
                Contenance : {contenance}
              </div>
            )}
          </div>
          <div className="">
            <ul
              className=" flex gap-2 list-none flex-col flex-wrap border-b-0 pl-0 md:flex-row"
              id="tabs-tab"
              role="tablist"
            >
              {product?.capacity
                ? Object.values(product.capacity)?.map(
                  (item: any, index: number) => (
                    <li role="presentation" key={index}>
                      <button
                        // href={"#" + capacityName[index]}
                        className={`p-3 block border text-[#16px] leading-tight text-[#515151] font-semibold hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate ${contenanceChoice === index && "border-[#6A5950]"
                          } "
                          
                          `}
                        // id={capacityName[index]}
                        // data-te-toggle="pill"
                        // data-te-nav-active={index === 0 ? true : undefined}
                        // data-te-target={"#" + capacityName[index]}
                        // aria-controls={"#" + capacityName[index]}
                        // aria-selected={index === 0}
                        onClick={() => {
                          const contenancePrice = parseFloat(item?.price);
                          const contenance = item?.name;

                          setState((o) => ({
                            ...o,
                            contenancePrice,
                            contenance,
                            contenanceChoice: index,
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
          <div className="mt-4 mb-3 flex gap-1 ">
            {_.isEmpty(product?.packaging) ? null : (
              <div
                // id={item?.newName}
                // id={namePackaging[index]}
                role="tabpanel"
                className={`mb-4  text-[#603813]    transition-opacity duration-150 ease-linear `}
              // data-te-tab-active={index === 0 ? true : false}
              >
                Packaging : {packageName}
              </div>
            )}
          </div>
          <div>
            <ul
              className=" flex gap-2 list-none flex-col flex-wrap border-b-0 pl-0 md:flex-row"
              id="tabs-tab"
              role="tablist"
            >
              {product?.packaging
                ? Object.values(product.packaging)?.map(
                  (item: any, index: number) => (
                    <li role="presentation" key={index}>
                      <button
                        // href={"#" + namePackaging[index]}
                        className={`p-3 block border text-[#16px] leading-tight text-[#515151] font-semibold hover:isolate focus:isolate hover:border-transparent hover:bg-neutral-100   ${packageChoice === index ? "border-[#6A5950]" : ""
                          } `}
                        id={namePackaging[index]}
                        onClick={() => {
                          const packagePrice = parseFloat(item?.price);
                          const packageName = item?.name;
                          const selectorImage = item?.image;
                          setState((o) => ({
                            ...o,
                            packagePrice,
                            packageName,
                            selectorImage,
                            packageChoice: index,
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
          {_.isEmpty(product?.packaging) ? null : (
            <span className="mb-4 text-[#383e42] text-[24px] font-semibold">
              {packagePrice === 0
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

          {/* add product to cart */}
          <div className="flex items-center gap-3">
            <input
              value={quantity}
              onChange={(e: any) => {
                setState((pre) => ({
                  ...pre,
                  quantity: Number.parseInt(e.target.value),
                }));
              }}
              type="number"
              className="border border-gray outline-none p-1 text-center w-14 h-10"
              min={1}
              placeholder={"1"}
            />
            <div className="flex gap-3">
              <button
                onClick={handleAddProduct}
                className="ml-3 rounded-md p-5 bg-[#acd051] hover:bg-black text-white font-semibold"
              >
                AJOUTER AU PANIER
              </button>
              <button
                className="rounded-md bg-[#603813] p-5  hover:bg-black text-white font-semibold"
                onClick={() => {
                  handleAddProduct();
                  router.push("/checkout");
                }}
              >
                ACHETER
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* description tabs */}

      <div className="mx-16">
        <ul className="mb-5 flex list-none flex-col flex-wrap border-b-0 pl-0 md:flex-row">
          {DescriptionTabs?.map((item, index) => (
            <li role="presentation" key={index}>
              <button
                className={`my-2 block  border-b-0 border-t-2 border-transparent px-7 pt-4 pb-3.5 text-[#16px] leading-tight text-[#515151] font-semibold hover:border-transparent hover:bg-neutral-100   ${tabs === index ? "border-t-[#6A5950]" : " "
                  }  `}
                id={item?.id}
                onClick={() => setTabs(index)}
              >
                {item?.header}
              </button>
            </li>
          ))}
        </ul>
        <div className="my-2 w-full">
          {DescriptionTabs.map(
            (item, index) =>
              tabs === index && (
                <div className=" opacity-100 transition-opacity duration-150 ease-linear ">
                  <span
                    className="text-[#603813] whitespace-pre-line"
                    key={index}
                  >
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
