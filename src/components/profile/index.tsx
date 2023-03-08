import Footer from '@components/layout/footer';
import { POST } from '@utils/fetch';
import { instance } from '@utils/_axios';
import React from 'react';
import { Container } from '..';
import Delivery from './delivery';
import Order from './order';
import UserProfile from './user-profile';

const Tabs = [
  {
    id: 'profile-tab',
    header: 'Tableau de bord',
    href: '#profile--tab',
  },
  {
    id: 'orders-tab',
    header: 'Commandes',
    href: '#orders-tab',
  },
  {
    id: 'delivery-tab',
    header: 'Téléchargements',
    href: '#delivery-tab',
  },
  {
    id: 'adress-tab',
    header: 'Adresses',
    href: '#adress-tab',
  },
  {
    id: 'payment-tab',
    header: 'Moyens de paiment',
    href: '#payment-tab',
  },
  {
    id: 'detail-tab',
    header: 'Détails du compte',
    href: '#detail-tab',
  },
  {
    id: 'logout-tab',
    header: 'Déconnexion',
    href: '#logout-tab',
  },
];

const Profile = () => {
  const logOut = async () => {
    await instance.post('/api/user/logout').then((res: any) => {
      console.log(res);
      window.location.reload();
    });
  };
  return (
    <Container>
      <div className="m-5">
        <div className="grid grid-cols-7 items-start ">
          <ul
            className="mr-4 flex list-none flex-col flex-wrap pl-0 col-span-2"
            role="tablist"
            data-te-nav-ref>
            {Tabs?.map((item: any, index: number) => (
              <li role="presentation" key={index} className="flex-grow text-center">
                <a
                  href={item?.href}
                  data-te-toggle="pill"
                  data-te-target={item?.href}
                  data-te-nav-active={index === 0 ? true : undefined}
                  aria-controls={item?.href}
                  role="tab"
                  aria-selected={index === 0}
                  onClick={
                    item?.header === 'Déconnexion'
                      ? () => logOut()
                      : () => {
                          return;
                        }
                  }
                  className="my-[1px] min-w-[100px] block border-x-0 font-semibold rounded-md border-t-0 border-b-2 border-transparent px-7 pt-4 pb-3.5 text-sm  uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent bg-[#B2B2B0] hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:bg-[#603813] data-[te-nav-active]:text-white ">
                  {item?.header}
                </a>
              </li>
            ))}
          </ul>
          <div className="my-2 w-full col-span-5 mb-10">
            <div
              className="hidden opacity-0 opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
              id="profile-tab"
              role="tabpanel"
              data-te-tab-active>
              <UserProfile />
            </div>
            <div
              className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
              id="orders-tab"
              role="tabpanel">
              <Order />
            </div>
            <div
              className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
              id="delivery-tab"
              role="tabpanel">
              <Delivery />
            </div>
            <div
              className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
              id="adress-tab"
              role="tabpanel">
              adress-tab
            </div>
            <div
              className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
              id="payment-tab"
              role="tabpanel">
              payment-tab
            </div>
            <div
              className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
              id="detail-tab"
              role="tabpanel">
              detail-tab
            </div>
            <div
              className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
              id="logout-tab"
              role="tabpanel"></div>
          </div>
        </div>
      </div>
      <Footer />
    </Container>
  );
};

export default Profile;
