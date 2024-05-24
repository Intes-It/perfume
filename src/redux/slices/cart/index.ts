import { createSlice } from "@reduxjs/toolkit";
import { ExProduct } from "@types";
import { PURGE } from "redux-persist";

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

      const existProduct = products?.find((item: any) => {
        return (
          item?.product?.id === product?.id &&
          item?.packaging === product.packaging &&
          item?.color === product.color &&
          item?.capacity === product.capacity
        );
      });

      if (existProduct) {
        existProduct.quantity += Number.parseInt(product.quantity);
      } else {
        state.products = [...state.products, product];
      }
      state.products = [...state.products, product];
    },
    updateProduct: (state, actions) => {
      const product = actions.payload;
      const currProduct = [...state.products];
      const newProducts = currProduct?.map((item) => {
        if (item.id && +item.id === +product.id) {
          return {
            ...item,
            amount: product?.amount,
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
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      console.log("PURGE");
    });
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
