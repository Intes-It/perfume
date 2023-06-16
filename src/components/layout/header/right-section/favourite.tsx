import React from 'react';
import NextLink from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { Routes } from '@definitions/constants';
import { useSelector } from 'react-redux';


const Favourite = () => {
  const count = useSelector((state: any) => state.persistedReducer?.favorite?.list?.length);
  return (
    <React.Fragment>
      <NextLink href={Routes.favorite.route}>
        <a>
          <span className={'relative inline-block'}>
            <FontAwesomeIcon icon={faHeart} fontSize={'1.5rem'} className={'w-10 h-10'} />
            <span
              className={
                'absolute top-badge  right-0 px-1 text-center h-3 text-xs font-bold leading-none text-red-100 transform bg-red-500 rounded-full'
              }>
              {count}
            </span>
          </span>
        </a>
      </NextLink>
    </React.Fragment>
  );
};

export default Favourite;
