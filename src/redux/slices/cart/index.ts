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

      const isDuplicate = products?.find((item: any) => {
        return item?.id === product?.id;
      });

      if (isDuplicate) {
        const newList = products.map((item) => {
          if (item.id === isDuplicate.id) item.quantity = product.quantity;

          return item;
        });

        state.products = [...newList];
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
