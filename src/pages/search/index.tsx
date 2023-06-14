import { Container } from '@components/container';
import { useAllCategory } from '@hooks/useCategory';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import NextLink from 'next/link';
import Parser from 'html-react-parser';
import { useFormik } from 'formik';

const index = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<any>();
  const { data } = useAllCategory();
  const formik = useFormik({
    initialValues: {
      searchValue: '',
    },
    onSubmit: (value) => {
  
      router.replace({ query: { result: value.searchValue } });
    },
  });

  const res = useMemo(() => {
    const query = router.query['result'];
    setSearchValue(query);
    return data?.product?.filter((item: any) =>
      item?.name?.toLowerCase().includes(String(searchValue)?.toLowerCase())
    );
  }, [router.query, data, searchValue]);



  return (
    <Container>
      {res?.length !== 0 ? (
        <div className="">
          {res?.map((item: any, index: number) => (
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
              France  E-mail contact@naturefeerique.fr Rester En Contact
              Service Client contact@naturefeerique.fr  Lun- Ven: 09:00 – 18:00 Vous
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
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-5 flex gap-3 ">
              <input
                id="searchValue"
                onChange={formik.handleChange}
                placeholder="Resercher"
                className="w-[200px]  p-2 rounded-md border  border-black"
              />
              <button
                type='submit'
                className="w-[100px]  p-2 rounded-md border  border-black">
                Resercher
              </button>
            </div>
          </form>
        </div>
      )}
    </Container>
  );
};

export default index;
