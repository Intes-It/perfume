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
      const exProduct = actions.payload;

      const existExProduct = state.products?.find(
        (item) =>
          item.product.id === exProduct.product.id &&
          item.packageName === exProduct.packageName &&
          item?.color === exProduct.color &&
          item?.capacity === exProduct.capacity
      );

      if (existExProduct) {
        existExProduct.quantity += Number.parseInt(exProduct.quantity);
      } else {
        state.products = [...state.products, exProduct];
      }
    },
    removeProduct: (state, actions) => {
      const exProduct = actions.payload;
      // console.log(exProduct);
      let products;
      if (exProduct.packageName && !exProduct.capacity)
        products = state.products?.filter(
          (item) =>
            item?.product?.id !== exProduct?.id &&
            item?.packageName !== exProduct.packageName
        );
      else if (exProduct.color)
        products = state.products?.filter(
          (item) =>
            item?.product?.id !== exProduct?.id &&
            item?.color !== exProduct.color
        );
      else if (exProduct.capacity) {
        products = state.products?.filter(
          (item) =>
            item?.product?.id !== exProduct?.id &&
            item?.packageName !== exProduct.packageName &&
            item?.capacity !== exProduct.capacity
        );
        // console.log(products);
      } else {
        products = state.products?.filter(
          (item) => item.product.id !== exProduct.product.id
        );
      }
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

export const { addProduct, removeProduct, updateFullCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
