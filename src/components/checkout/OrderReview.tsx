import { ExProduct } from '@types';
import { formatCurrency } from '@utils/formatNumber';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const OrderReview = () => {
  const [state, setState] = useState({
    carte: true,
    paypal: false,
  });
  const { carte, paypal } = state;
  const products = useSelector(
    (state: any) => state.persistedReducer?.cart?.products
  ) as ExProduct[];
  const totalMoney = products?.reduce(
    (pre, curr) => pre + curr.quantity * Number.parseFloat(curr.product.price || '0'),
    0
  );
  console.log(products);

  return (
    <div className="bg-[#FBFBFB]">
      <div className="grid">
        <div className="border border-black">Order Review</div>
        <div className="grid grid-cols-2">
          <div className="border border-black">Produit</div>
          <div className="border border-black">Sous-total</div>
        </div>
        {products?.map((item: ExProduct) => (
          <div className="grid grid-cols-2">
            <div className="border border-black">
              {item.product.name} x {item.quantity}
            </div>
            <div className="border border-black">
              {formatCurrency(String(item.product.price))} €
            </div>
          </div>
        ))}
        <div className="grid grid-cols-2">
          <div className="border border-black">Sous-total</div>
          <div className="border border-black">{formatCurrency(String(totalMoney))} €</div>
        </div>
        <div className="grid grid-cols-2">
          <div className="border border-black">Expédition</div>
          <div className="border border-black"></div>
        </div>
        <div className="grid grid-cols-2">
          <div className="border border-black">Total</div>
          <div className="border border-black">{formatCurrency(String(totalMoney))} €</div>
        </div>
        <div className="flex mt-5 items-center">
          <input
            onClick={() => setState((o) => ({ ...o, carte: true, paypal: false }))}
            type="radio"
            checked={carte}
            id="remember"
            className="w-4 h-4 mr-2 "
          />
          <span className="text-black text-[22px] font-semibold">Carte Bancaire</span>
        </div>
        <div className="mt-5">
          {/* first form */}
          {carte ? (
            <div>
              <form>
                <div className="grid gap-3 bg-[#efefef] ">
                  <div className="flex flex-col mt-6 mr-6 ml-6">
                    <label className="font-semibold">
                      Numéro de carte <span className="text-red-500 text-[20px] ">*</span>
                    </label>
                    <input
                      placeholder="1234 1234 1234 1234"
                      required
                      type="text"
                      id="id"
                      className="h-[35px] mt-2 px-4 py-3 border border-gray-300 text-black"
                    />
                  </div>
                  <div className="grid grid-cols-2 mt-10 mb-10">
                    <div className="flex flex-col mr-6 ml-6">
                      <label className="font-semibold">
                        Date d’expiration <span className="text-red-500 text-[20px] ">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        id="id"
                        className="h-[35px] mt-2 px-4 py-3 border border-gray-300 text-black"
                      />
                    </div>
                    <div className="flex flex-col ml-6 mr-6">
                      <label className="font-semibold">
                        Cryptogramme visuel <span className="text-red-500 text-[20px] ">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        id="id"
                        className=" h-[35px] mt-2 px-4 py-3 border border-gray-300 text-black"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <div></div>
          )}
          {/* PayPal */}
          <div className="flex mt-5 items-center">
            <input
              checked={paypal}
              onClick={() => setState((o) => ({ ...o, carte: false, paypal: true }))}
              type="radio"
              id="remember"
              className="w-4 h-4 mr-2 "
            />
            <span className="text-black text-[22px] font-semibold">PayPal</span>
          </div>
          <div className="mt-7">
            {paypal ? <div className="grid bg-[#efefef]">Pay via PayPal.</div> : <div></div>}
          </div>
          <div className="mt-6 flex items-center">
            <input type="checkbox" id="remember" className="w-4 h-4  mr-2 " />
            <span className="text-black  font-semibold">
              Je voudrais recevoir des e-mails exclusifs avec des réductions et des informations sur
              le produit (facultatif)
            </span>
          </div>
          <div className="mt-6 flex items-center">
            <span className="text-black  font-semibold">
              Vos données personnelles seront utilisées pour le traitement de votre commande, vous
              accompagner au cours de votre visite du site web, et pour d’autres raisons décrites
              dans notre politique de confidentialité.
            </span>
          </div>
          <div className=" grid mt-2 flex items-center">
            <button className="h-[50px] rounded-md p-3 text-white hover:bg-black bg-[#603813] ">
              Commander
            </button>
          </div>
          <div className="flex float-right gap-3 mt-10 ">
            <button className="w-[90px] rounded-md p-3 border border-black  text-black hover:bg-black hover:text-white ">
              PRÉC
            </button>
            <button className="w-[90px] rounded-md p-3 border border-black text-black hover:bg-black hover:text-white ">
              SUIV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderReview;
