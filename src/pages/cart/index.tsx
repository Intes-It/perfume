import dynamic from "next/dynamic";
const NoSSR = dynamic(() => import("@components/cart-table") as any, {
  ssr: false,
}) as any;
const Cart = () => {
  return (
    <div className="max-w-[1200px] px-10 mx-auto py-10">
      <NoSSR />
    </div>
  );
};

export default Cart;
