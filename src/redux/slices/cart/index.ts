import { createSlice } from "@reduxjs/toolkit";
import { ExProduct } from "@types";

interface ICart {
  products: ExProduct[];
}
const initialState: ICart = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, actions) => {
      const product = actions.payload;
      const products = state.products;

      const indexProduct = products?.findIndex((item: any) => {
        return (
          item?.product_id === product?.product_id &&
          (item?.package?.id === product.package?.id || !product.package?.id) &&
          (item?.color?.id === product.color?.id || !product.color?.id) &&
          (item?.capacity?.id === product.capacity?.id || !product.capacity?.id)
        );
      });

      if (indexProduct > -1) {
        products[indexProduct].quantity += Number.parseInt(product.quantity);

        state.products = [...products];
      } else {
        state.products = [...products, product];
      }
    },
    updateProduct: (state, actions) => {
      const product = actions.payload;
      const currProduct = [...state.products];
      const newProducts = currProduct?.map((item) => {
        if (item.id && +item.id === +product.id) {
          return {
            ...item,
            ...product,
          };
        }

        return { ...item };
      });
      state.products = newProducts;
    },
    removeProduct: (state, actions) => {
      const exProduct = actions.payload;

      const products = state.products.filter(
        (item) => item.id !== exProduct?.id
      );
      if (products) state.products = products;
    },
    updateFullCart: (state, actions) => {
      const exProducts = actions.payload;
      state.products = exProducts;
    },
    clearCart: (state) => {
      state.products = [];
    },
  },
});

export const {
  addProduct,
  removeProduct,
  updateFullCart,
  clearCart,
  updateProduct,
} = cartSlice.actions;
export default cartSlice.reducer;
