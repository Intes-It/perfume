import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import NextLink from "next/link";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatCurrency } from "@utils/formatNumber";
import { Container } from "@components/container";
import { BestSales } from "@components/best-sales";
import Rating from "@components/rating/rating";

import { VisibleTitleRoutes } from "@definitions/constants";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
// import { Product } from "@types";
import ImageModal from "@components/image-modal";
import { useProductDetail, useBestSallingProducts } from "@hooks/useProduct";

const DescriptionTabs = [
  {
    id: "tab-descriptions-tab",
    header: "Description",
    href: "#tab-descriptions",
  },
  {
    id: "tab-features-tab",
    header: "Caractéristiques",
    href: "#tab-features",
  },
  {
    id: "tab-utilisation-tab",
    header: "Utilisation",
    href: "#tab-utilisation",
  },
  {
    id: "tab-composition-tab",
    header: "Composition",
    href: "#tab-composition",
  },
  {
    id: "tab-reviews-tab",
    header: "Avis",
    href: "#tab-reviews",
  },
];

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
  // const ProductDetail: React.FC = () => {
  const [state, setState] = useState({ isShowImageModal: false });

  const { isShowImageModal } = state;

  const { product } = useProductDetail({ id: productId });
  const { products } = useBestSallingProducts();

  const server_link = process.env.NEXT_PUBLIC_API_URL;

  const breadCrumb = useMemo(() => {
    let res = [{ name: "Accueil", route: "/" }];
    const groupRoute = product?.group;
    const subGroupRoute = product?.subGroup;
    if (groupRoute) {
      const group = VisibleTitleRoutes?.find((item) =>
        item?.route?.includes(groupRoute)
      );

      if (group) res = [...res, { name: group?.title, route: group?.route }];
    }
    if (subGroupRoute) {
      const subGroup = VisibleTitleRoutes?.find((item) =>
        item?.route?.includes(subGroupRoute)
      );
      if (subGroup)
        res = [...res, { name: subGroup?.title, route: subGroup?.route }];
    }
    return res;
  }, [product]);

  const setShowModal = (isOpen: boolean) => {
    setState((pre) => ({ ...pre, isShowImageModal: isOpen }));
  };

  return (
    <Container>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6 md:mx-28 md:my-20 m-8">
        {/* product image */}
        <div className="overflow-clip relative">
          <img
            className="hover:scale-125 transition duration-100 w-full object-cover"
            src={`${server_link}${product?.image}`}
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
            <Rating score={product?.score || 0} />
            <span>{`(${product?.evaluate || 0} avis client)`}</span>
          </div>
          <div className="my-2">
            <span className="text-[#383e42] text-[24px] font-semibold">{`${
              formatCurrency(String(product?.price))} €`}</span>
          </div>
          {/* sub product */}
          <div className="my-3">
            <span className="text-[#603813] font-semibold">
              Contenance: 60 perles
            </span>
          </div>
          {/* add product to cart */}
          <div className="flex items-center gap-3">
            <input
              type="number"
              className="border border-gray outline-none p-1 text-center w-14 h-10"
              min={1}
              placeholder={"1"}
            />
            <span className="text-center">OU</span>
            <div className="flex gap-3">
              <button className="ml-3 rounded-md p-5 bg-[#acd051] hover:bg-black text-white font-semibold">
                AJOUTER AU PANIER
              </button>
              <button className="rounded-md bg-[#603813] p-5  hover:bg-black text-white font-semibold">
                ACHETER
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* description tabs */}
      <div className="mx-16">
        <ul
          className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4"
          id="tabs-tab"
          role="tablist"
        >
          {DescriptionTabs?.map((item, index) => (
            <li className="nav-item" role="presentation" key={index}>
              <a
                href={item?.href}
                className={`nav-link block leading-tight font-semibold border-t-[3px]  border-transparent 
                px-6 py-3 my-2 ${
                  index === 0 ? "active" : ""
                } selection:border-black`}
                id={item?.id}
                data-bs-toggle="pill"
                data-bs-target={item?.href}
                role="tab"
                aria-selected="true"
              >
                {item?.header}
              </a>
            </li>
          ))}
        </ul>
        <div className="tab-content" id="tabs-tabContent">
          <div
            className="tab-pane fade show active"
            id="tab-descriptions"
            role="tabpanel"
            aria-labelledby="tab-descriptions-tab"
          >
            <span className="text-[#603813] whitespace-pre-line">
              {product?.description}
            </span>
          </div>
          <div
            className="tab-pane fade"
            id="tab-features"
            role="tabpanel"
            aria-labelledby="tab-features-tab"
          >
            No Data
          </div>
          <div
            className="tab-pane fade"
            id="tab-utilisation"
            role="tabpanel"
            aria-labelledby="tab-utilisation-tab"
          >
            No Data
          </div>
          <div
            className="tab-pane fade"
            id="tab-composition"
            role="tabpanel"
            aria-labelledby="tab-composition-tab"
          >
            No Data
          </div>
          <div
            className="tab-pane fade"
            id="tab-reviews"
            role="tabpanel"
            aria-labelledby="tab-reviews-tab"
          >
            Tab 5 content
          </div>
        </div>
      </div>

      {/* susggestions */}

      <div className="mx-10 my-10">
        <span className="mx-8 text-[26px] font-light my-2">Suggestions</span>
        <BestSales products={products} />
      </div>
      <ImageModal
        imgUrl={product?.image || ""}
        isShowModel={isShowImageModal}
        onClose={() => setShowModal(false)}
      />
    </Container>
  );
};

export default ProductDetail;
