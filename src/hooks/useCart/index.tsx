import { updateFullCart } from "@redux/slices/cart";
import { api } from "@utils/apiRoute";
import { DELETE, GET, POST, PUT } from "@utils/fetch";
import { getCookie } from "cookies-next";
import { useMutation, useQuery } from "react-query";
import { useDispatch } from "react-redux";

const useCart = () => {
  const cart = useQuery("get-cart", getCart);
  const addProductToCart = useMutation("add-product", addProduct);

  const removeProductToCart = useMutation("remove-product", removeProduct);

  const updateProductToCart = useMutation("update-product", updateProduct);
  const dispatch = useDispatch();
  //fetch data
  async function getCart() {
    if (!getCookie("refresh_token")) {
      return;
    }
    const res = await GET(api.getCart);
    if (res.status === 200) dispatch(updateFullCart(res.data?.results));
    return res;
  }

  //mutation
  async function addProduct(data: any) {
    return await POST(api.addProduct, data);
  }

  async function removeProduct(id: string) {
    return await DELETE(api.removeProduct + `?ids=${id}`);
  }

  async function updateProduct(data: any) {
    return await PUT(api.updateProduct, data);
  }

  return {
    cart: cart.data,
    refresh: cart.refetch,
    isLoading: cart.isLoading,
    addProductToCart: addProductToCart.mutateAsync,
    removeProductToCart: removeProductToCart.mutateAsync,
    updateProductToCart: updateProductToCart.mutateAsync,
  };
};

export default useCart;
