import { createSlice } from "@reduxjs/toolkit";
interface IToast {
  show: boolean;
  message: string;
  error?: boolean;
}
const initialState: IToast = {
  show: false,
  message: "",
  error: false,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, actions) => {
      state.show = !state.show;
      state.message = actions.payload.message;
      state.error = actions.payload.error ?? false;
    },
  },
});
export const { showToast } = toastSlice.actions;
export default toastSlice.reducer;
