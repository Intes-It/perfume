import { api } from "@utils/apiRoute";
import { DELETE, GET, POST, PUT } from "@utils/fetch";
import { useMutation, useQuery } from "react-query";

const useCart = () => {
  const cart = useQuery("get-cart", getCart);
  const addProductToCart = useMutation("add-product", addProduct);
  const addExistProductToCart = useMutation(
    "add-exist-product",
    addExistProduct
  );
  const removeProductToCart = useMutation("remove-product", removeProduct);

  const updateProductToCart = useMutation("update-product", updateProduct);

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

  async function removeProduct(id: string) {
    return await DELETE(api.addProduct + id);
  }

  async function updateProduct(data: any) {
    return await PUT(api.changeProduct, data);
  }

  return {
    cart: cart.data,
    refresh: cart.refetch,
    isLoading: cart.isLoading,
    addProductToCart: addProductToCart.mutateAsync,
    addExistProductToCart: addExistProductToCart.mutateAsync,
    removeProductToCart: removeProductToCart.mutateAsync,
    updateProductToCart: updateProductToCart.mutateAsync,
  };
};

export default useCart;
