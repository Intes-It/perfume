import React, { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { Routes } from '@definitions/constants';
import useFavorite from '@hooks/useFavoriteProduct';
const Favourite = () => {
  const { favorite } = useFavorite();
  
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
              {favorite?.length}
            </span>
          </span>
        </a>
      </NextLink>
    </React.Fragment>
  );
};

export default Favourite;
