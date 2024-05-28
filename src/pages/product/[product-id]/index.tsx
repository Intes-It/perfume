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

import { addProduct } from "@redux/slices/cart";
import { useDispatch } from "react-redux";

import ImageModal from "@components/image-modal";
import { useBestSallingProducts, useProductDetail } from "@hooks/useProduct";
import useUser from "@hooks/useUser";
import { useRouter } from "next/router";

import { showToast } from "@redux/slices/toast/toastSlice";
import { api } from "@utils/apiRoute";
import { POST } from "@utils/fetch";
import _ from "lodash";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

type optionType = {
  current_price?: number;
  id: number;
  name: string;
  price: number;
  weight?: number;
  color?: string;
};

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

  const { isAuthenticated } = useUser();
  const [tabs, setTabs] = useState(0);
  const [isError, setIsError] = useState({
    type: "",
    message: "",
  });
  const { product, isLoading } = useProductDetail({ id: productId });
  const { products } = useBestSallingProducts();

  const [packageSelected, setPackageSelected] = useState<optionType | null>(
    null
  );
  const [contenanceSelected, setContenanceSelected] =
    useState<optionType | null>(null);
  const [colorSelected, setColorSelected] = useState<optionType | null>(null);

  const [state, setState] = useState({
    isShowImageModal: false,
    quantity: 1,
    selectorImage: undefined,
  });

  const router = useRouter();

  const { isShowImageModal, quantity, selectorImage } = state;

  const breadCrumb = useMemo(() => {
    const listCategories = [];

    const category = product?.category;
    const subCategory = product?.subcategory;
    const sub_subcategory = product?.sub_subcategory;

    if (category)
      listCategories.push({
        name: category?.name?.toLowerCase(),
        route: `/product-categories/${category?.id}`,
      });
    if (subCategory)
      listCategories.push({
        name: subCategory?.name?.toLowerCase(),
        route: `/product-categories/${category?.id}/${subCategory?.id}`,
      });
    if (sub_subcategory)
      listCategories.push({
        name: sub_subcategory?.name?.toLowerCase(),
        route: `/product-categories/${category?.id}/${subCategory?.id}/${sub_subcategory?.id}`,
      });

    return listCategories;
  }, [product]);

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

  const sumChoice = useMemo(() => {
    return (
      (product?.current_price || product?.price) +
      (packageSelected?.price || 0) +
      (contenanceSelected?.price || 0) +
      (colorSelected?.price || 0)
    );
  }, [packageSelected, contenanceSelected, colorSelected, product]);

  const handleAddProduct = async (type?: string) => {
    if (
      (!packageSelected && product.package?.length > 0) ||
      (!contenanceSelected && product?.capacity?.length > 0) ||
      (!colorSelected && product?.color?.length > 0)
    ) {
      setIsError({
        type: "option",
        message: "Please select the attributes of the product.",
      });
      return;
    }

    if (quantity < 1) {
      setIsError({
        type: "option",
        message: "Please enter the quantity.",
      });
      return;
    }

    if (isError.type)
      setIsError({
        ...isError,
        type: "",
      });
    if (isAuthenticated) {
      //check exist product
      if (type === "CHECKOUT") router.push("/checkout");

      const payload = {
        data: [
          {
            product_id: product?.id,
            quantity: quantity,
            package: packageSelected?.id,
            color: colorSelected?.id,
            capacity: contenanceSelected?.id,
          },
        ],
      };
      try {
        const res = await POST(api.addProduct, payload);
        if (res?.status === 201 || res?.status === 200) {
          dispatch(
            addProduct({
              ...payload.data[0],
              ...product,
              package: packageSelected?.id,
              color: colorSelected?.id,
              capacity: contenanceSelected?.id,
            })
          );
          dispatch(showToast({ message: "Add successfully!", error: false }));
        } else {
          dispatch(
            showToast({ message: "Something went wrong!", error: true })
          );
        }
      } catch (error: any) {
        dispatch(showToast({ message: error?.data?.message, error: true }));
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
          <Image
            className="object-fill w-full h-full max-h-[700px] transition duration-100 hover:scale-125 "
            // src={product?.url_image}
            src={
              selectorImage === undefined
                ? product?.images?.length > 0 && product?.images[0]?.url
                : selectorImage
            }
            width={1000}
            height={1000}
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
          <span className="mb-4 text-[#383e42] text-[24px] font-semibold">
            {formatCurrency(sumChoice.toString())} €{" "}
          </span>

          {/* {_.isEmpty(product?.capacity) && (
            <div className="my-2">
              <span className="text-[#383e42] text-[24px] font-semibold">
                {formatCurrency(String(product?.price))} €
              </span>
            </div>
          )} */}
          {/* color */}
          <div className="my-3 ">
            {_.isEmpty(product?.color) ? null : (
              <span className="flex font-semibold mb-4 text-[#603813] ">
                Color :
                <span className="grid font-medium">{colorSelected?.name} </span>
              </span>
            )}
            <div className="flex gap-3 mt-4">
              {!_.isEmpty(product?.color) &&
                product.color?.map((item: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => {
                      setState((o) => ({
                        ...o,
                        selectorImage: item.image,
                      }));
                      setColorSelected(item);
                    }}
                    style={{
                      background: `${item.color}`,
                    }}
                    className={twMerge(
                      "mb-3 border p-2 text-white outline-none",
                      colorSelected?.id === item?.id && "border-black"
                    )}
                  >
                    {/* //  className={`mb-3 border p-2 text-white border-black bg-[#50d71e]`}>  */}
                    {item?.name}
                  </button>
                ))}
            </div>
          </div>
          {/* sub product */}
          <div className="flex gap-1 mt-4 mb-3 ">
            {!_.isEmpty(product?.capacity) && (
              <div
                role="tabpanel"
                className={` text-[#603813] transition-opacity duration-150 ease-linear `}
              >
                {contenanceSelected?.weight === 0 ? (
                  ""
                ) : (
                  <div>
                    <strong>Contenance</strong> :{contenanceSelected?.weight}g
                  </div>
                )}
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
                ? product.capacity?.map((item: any, index: number) => (
                    <li role="presentation" key={index}>
                      <button
                        // href={"#" + capacityName[index]}
                        className={`p-3 block border text-[#16px] leading-tight text-[#515151] font-semibold hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate ${
                          contenanceSelected === item?.id && "border-[#6A5950]"
                        } " `}
                        onClick={() => {
                          if (isError.type)
                            setIsError({
                              ...isError,
                              type: "",
                            });
                          setContenanceSelected(item);
                        }}
                      >
                        {item?.name}
                      </button>
                    </li>
                  ))
                : null}
            </ul>
          </div>

          {/* packaging */}
          <div className="flex gap-1 mt-4 mb-3 ">
            {!_.isEmpty(product?.package) && (
              <div
                role="tabpanel"
                className={`mb-4  text-[#603813]    transition-opacity duration-150 ease-linear `}
              >
                <strong>Packaging</strong> : {packageSelected?.name}
              </div>
            )}
          </div>
          <div>
            <ul
              className="flex flex-col flex-wrap gap-2 pl-0 list-none border-b-0 md:flex-row"
              id="tabs-tab"
              role="tablist"
            >
              {product?.package &&
                product.package?.map((item: any, index: number) => (
                  <li role="presentation" key={index}>
                    <button
                      // href={"#" + namePackaging[index]}
                      className={`p-3 block border text-[#16px] leading-tight text-[#515151] font-semibold hover:isolate focus:isolate hover:border-transparent hover:bg-neutral-100   ${
                        packageSelected?.id === item?.id
                          ? "border-[#6A5950]"
                          : ""
                      } `}
                      onClick={() => {
                        const selectorImage = item?.image;
                        setPackageSelected(item);
                        if (isError.type)
                          setIsError({
                            ...isError,
                            type: "",
                          });
                        setState((o) => ({
                          ...o,
                          selectorImage,
                        }));
                      }}
                      role="tab"
                    >
                      {item?.name}
                    </button>
                  </li>
                ))}
            </ul>
          </div>

          {/* add product to cart */}
          {isError.type && (
            <div className="mt-3 text-[#FF2626] font-semibold">
              {isError.message}
            </div>
          )}
          <div className="flex items-center gap-3 mt-6">
            <input
              value={quantity}
              onChange={(e: any) => {
                if (+e.target.value.charAt(0) === 0) {
                  e.target.value = e.target.value.substring(1);
                }
                const newValue = Number.parseInt(e.target.value) || 0;
                if (newValue > 0 && isError.type)
                  setIsError({ ...isError, type: "" });
                if (newValue <= 999) {
                  setState((pre) => ({
                    ...pre,
                    quantity: newValue,
                  }));
                }
              }}
              type="number"
              className="w-16 h-10 p-1 text-center border outline-none border-gray"
              min={0}
              max={999}
              placeholder={"1"}
            />
            <div className="flex gap-3">
              <button
                onClick={() => handleAddProduct()}
                className="ml-3 rounded-md p-5 bg-[#acd051] hover:bg-black text-white font-semibold"
              >
                Add to cart
              </button>
              <button
                className="rounded-md bg-[#603813] p-5  hover:bg-black text-white font-semibold"
                onClick={() => {
                  handleAddProduct("CHECKOUT");
                }}
              >
                Buy
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
