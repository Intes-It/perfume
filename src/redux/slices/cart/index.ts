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
      const existExProduct = state.products?.find(
        (item) => item.product.id === exProduct.product.id
      );
      if (existExProduct) existExProduct.quantity += Number.parseInt(exProduct.quantity);
      else state.products = [...state.products, exProduct]; 
    },
    removeProduct: (state, actions) => {
      const exProduct = actions.payload;
      const products = state.products?.filter(
        (item) => item.product.id !== exProduct.product.id
      ); 
        state.products = products;
    },
    updateFullCart: (state, actions) =>{
      const exProducts = actions.payload;
      state.products = exProducts;
    } 
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => { 
      console.log('PURGE')
    });
}
});

export const { addProduct, removeProduct, updateFullCart } = cartSlice.actions;
export default cartSlice.reducer;
