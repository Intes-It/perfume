import React, { useMemo, useState } from 'react';
import NextLink from 'next/link';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatCurrency } from '@utils/formatNumber';
import { Container } from '@components/container';
import { BestSales } from '@components/best-sales';
import Rating from '@components/rating/rating';

import { VisibleTitleRoutes } from '@definitions/constants';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
// import { Product } from "@types";

import { addProduct } from '@redux/slices/cart';
import { useDispatch } from 'react-redux';

import ImageModal from '@components/image-modal';
import { useProductDetail, useBestSallingProducts } from '@hooks/useProduct';
import { useRouter } from 'next/router';

const DescriptionTabs = [
  {
    id: 'tab-descriptions-tab',
    header: 'Description',
    href: '#tab-descriptions',
  },
  {
    id: 'tab-features-tab',
    header: 'Caractéristiques',
    href: '#tab-features',
  },
  {
    id: 'tab-utilisation-tab',
    header: 'Utilisation',
    href: '#tab-utilisation',
  },
  {
    id: 'tab-composition-tab',
    header: 'Composition',
    href: '#tab-composition',
  },
 
];

export const getServerSideProps: GetServerSideProps<{
  productId: string;
}> = async (context: any) => {
  const productId = context.query['product-id'];
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

const ProductDetail: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  productId,
}) => {
  // redux
  const dispatch = useDispatch();

  const [state, setState] = useState({
    isShowImageModal: false,
    quantity: 1,
  });

  const router = useRouter();

  const { isShowImageModal, quantity } = state;

  const { product } = useProductDetail({ id: productId });
  const { products } = useBestSallingProducts();

  const server_link = process.env.NEXT_PUBLIC_API_URL;

  const breadCrumb = useMemo(() => {
    console.log(product);
    let res = [{ name: 'Accueil', route: '/' }];
    const groupRoute = product?.category?.name?.toLowerCase();
    const subGroupRoute = product?.subcategory?.name?.toLowerCase();
    if (groupRoute) {
      // const group = VisibleTitleRoutes?.find((item) => item?.route?.includes(groupRoute));
      res = [
        ...res,
        {
          name: product?.category?.name?.toLowerCase(),
          route: product?.id?.toString(),
        },
      ];
    }
    if (subGroupRoute) {
      res = [
        ...res,
        {
          name: product?.subcategory?.name?.toLowerCase(),
          route: product?.id?.toString(),
        },
      ];
    }
    return res;
  }, [product]);

  const setShowModal = (isOpen: boolean) => {
    setState((pre) => ({ ...pre, isShowImageModal: isOpen }));
  };

  const handleAddProduct = () => {
    dispatch(addProduct({ product, quantity }));
    console.log(quantity);
  };

  return (
    <Container>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6 md:mx-28 md:my-20 m-8">
        {/* product image */}
        <div className="overflow-clip relative">
          <img
            className="hover:scale-125 transition duration-100 w-full object-cover"
            // src={`${server_link}${product?.image}`}
            src={product?.url_image}
            alt={product?.name}
          />
          <button className="absolute right-0 top-0 bg-white rounded-full w-[2.2rem] h-[2.2rem]">
            <FontAwesomeIcon
              onClick={() => setShowModal(true)}
              icon={faSearch}
              fontSize={'1.1rem'}
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
                  <span className="mx-2">{'/'}</span>
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
          <div className="my-2">
            <span className="text-[#383e42] text-[24px] font-semibold">
              {formatCurrency(String(product?.price))} €
            </span>
          </div>
          {/* sub product */}
          <div className="my-3">
            <span className="text-[#603813] font-semibold">Contenance: 60 perles</span>
          </div>
          {/* add product to cart */}
          <div className="flex items-center gap-3">
            <input
              value={quantity}
              onChange={(e: any) => {
                setState((pre) => ({ ...pre, quantity: Number.parseInt(e.target.value) }));
              }}
              type="number"
              className="border border-gray outline-none p-1 text-center w-14 h-10"
              min={1}
              placeholder={'1'}
            />
            <div className="flex gap-3">
              <button
                onClick={handleAddProduct}
                className="ml-3 rounded-md p-5 bg-[#acd051] hover:bg-black text-white font-semibold">
                AJOUTER AU PANIER
              </button>
              <button
                className="rounded-md bg-[#603813] p-5  hover:bg-black text-white font-semibold"
                onClick={() => {
                  handleAddProduct();
                  router.push('/checkout');
                }}>
                ACHETER
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* description tabs */}
      <div className="mx-16">
        <ul
          className="mb-5 flex list-none flex-col flex-wrap border-b-0 pl-0 md:flex-row"
          id="tabs-tab"
          role="tablist"
          data-te-nav-ref>
          {DescriptionTabs?.map((item, index) => (
            <li role="presentation" key={index}>
              <a
                href={item?.href}
                className="my-2 block border-x-0 border-b-0 border-t-2 border-transparent px-7 pt-4 pb-3.5 text-[#16px] leading-tight text-[#515151] font-semibold hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-[#6A5950] "
                id={item?.id}
                data-te-toggle="pill"
                data-te-nav-active={index === 0 ? true : undefined}
                data-te-target={item?.href}
                aria-controls={item?.href}
                aria-selected={index === 0}
                role="tab">
                {item?.header}
              </a>
            </li>
          ))}
        </ul>
        <div className="my-2 w-full">
          <div
            className="hidden opacity-0 opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
            id="tab-descriptions"
            role="tabpanel">
            <span className="text-[#603813] whitespace-pre-line">
              {product?.note?.Description || ''}
            </span>
          </div>
          <div
            className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
            id="tab-features"
            role="tabpanel">
            {product?.note?.Caractéristiques || ''}
          </div>
          <div
            className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
            id="tab-utilisation"
            role="tabpanel">
            {product?.note?.Utilisation || ''}
          </div>
          <div
            className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
            id="tab-composition"
            role="tabpanel">
            {product?.note?.Composition || ''}
          </div>
          <div
            className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
            id="tab-reviews"
            role="tabpanel">
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
        imgUrl={`${server_link}${product?.image || ''}`}
        isShowModel={isShowImageModal}
        onClose={() => setShowModal(false)}
      />
    </Container>
  );
};

export default ProductDetail;
