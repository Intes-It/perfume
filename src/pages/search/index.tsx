import { Container } from '@components/container';
import { useAllCategory } from '@hooks/useCategory';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import NextLink from 'next/link';
import Parser from 'html-react-parser';

const index = () => {
  const router = useRouter();
  const [searchValue, setsearchValue] = useState(router.query['result']);
  const { data } = useAllCategory();

  const filterProduct = useMemo(() => {
    console.log('render');
    return data?.product?.filter((item: any) =>
      item?.name?.toLowerCase().includes(String(searchValue)?.toLowerCase())
    );
  }, [router.query]);

  const search = () => {
    console.log(searchValue);
    router.push({
      pathname: '/search',
      query: {
        result: searchValue,
      },
    });
  };

  return (
    <Container>
      {filterProduct?.length !== 0 ? (
        <div className="">
          {filterProduct?.map((item: any, index: number) => (
            <div
              key={index}
              className="mx-auto relative flex flex-col  w-3/6 text-[16px] mb-2 bg-white">
              <NextLink href={`/product/${item?.id}`}>
                <img
                  className="w-[40vw] tablet:w-[32vw] mobile:w-[45vw] cursor-pointer mb-2"
                  // src={`${server_link}${product?.image}`}
                  src={item?.url_image}
                  alt="{title}"></img>
              </NextLink>
              <div className="text-[32px] text-left mb-5">{item?.name}</div>
              <div className="text-[#603813] mb-5">{Parser(item?.note?.Description || '')}</div>
              <div className="h-[1px] border-t-[1px] border-black"></div>
            </div>
          ))}
          <div className="mx-auto relative flex flex-col  w-3/6 text-[16px] mb-2 bg-white">
            <div className="text-[32px]">Contact</div>
            <div className="text-[#603813] text-[15px]">
              Contact Nature Féerique 61 Montée Des Amandiers, 26110 Saint-Maurice Sur Eygues,
              France Téléphone 07 81 55 41 55 E-mail contact@naturefeerique.fr Rester En Contact
              Service Client contact@naturefeerique.fr 07 81 55 41 55 Lun- Ven: 09:00 – 18:00 Vous
              Avez Des Questions?
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto relative flex flex-col  w-4/6 text-[16px] mb-2 bg-white">
          <div className="h-[10vw] bg-[#eeeeee]">
            <div className="mt-10 text-[32px] text-center">
              Résultats de recherche pour: {searchValue}
            </div>
          </div>
          <div className="mt-3">
            Désolé, mais rien ne correspond à vos termes de recherche. Veuillez réessayer avec des
            mots clés différents.
          </div>
          <div className="mt-5 ">
            <input
              onChange={(e) => setsearchValue(e.target.value)}
              placeholder="Resercher"
              className="w-[200px]  p-2 rounded-md border  border-black"
            />
            <button onClick={search} className="w-[100px]  p-2 rounded-md border  border-black">
              Resercher
            </button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default index;
