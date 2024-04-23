import { createSlice } from "@reduxjs/toolkit";
interface IToast {
  show: boolean;
  message: string;
}
const initialState: IToast = {
  show: false,
  message: "",
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state,actions) => {
      state.show = !state.show;
      state.message=actions.payload
    },
  },
});
export const { showToast } = toastSlice.actions;
export default toastSlice.reducer;
