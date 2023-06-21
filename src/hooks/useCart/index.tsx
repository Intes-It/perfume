import { api } from "@utils/apiRoute";
import { GET, POST, DELETE, PUT } from "@utils/fetch";
import { useMutation, useQuery } from "react-query";

const useCart = () => {
  const cart = useQuery("get-cart", getCart);
  const addProductToCart = useMutation("add-product", addProduct);
  const addExistProductToCart = useMutation(
    "add-exist-product",
    addExistProduct
  );
  const removeProductToCart = useMutation("remove-product", removeProduct);

  //fetch data
  async function getCart() {
    return await GET(api.getCart);
  }

  //mutation
  async function addProduct(data: any) {
    return await POST(api.addProduct, data);
  }

  async function addExistProduct(data: any) {
    return await PUT(api.addProduct, data);
  }

  async function removeProduct(data: any) {
    return await DELETE(api.addProduct, data);
  }

  return {
    cart: cart.data,
    addProductToCart: addProductToCart.mutateAsync,
    addExistProductToCart: addExistProductToCart.mutateAsync,
    removeProductToCart: removeProductToCart.mutateAsync,
  };
};

export default useCart;
