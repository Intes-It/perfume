import { createSlice } from "@reduxjs/toolkit";
import { ExProduct, Product } from "@types";
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
      const existExProduct = state.products.find(
        (item) => item.product.id === exProduct.product.id
      );
      if (existExProduct) existExProduct.quantity += Number.parseInt(exProduct.quantity);
      else state.products = [...state.products, exProduct]; 
    },
    removeProduct: (state, actions) => {
      console.log("remove product");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => { 
      console.log('PURGE')
    });
}
});

export const { addProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
