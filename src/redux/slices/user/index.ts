import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface LoginProps {
  email: string;
  password: string;
  rejectWithValue: (message: string) => void;
}

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, password, rejectWithValue }: LoginProps) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      // store user's token in local storage
      localStorage.setItem("userToken", data.userToken);
      return data;
    } catch (error: any) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

interface IUser {
  loading?: boolean;
  userInfo: {}; // for user object
  userToken: null; // for storing the JWT
  error: null;
  success: false; // for monitoring the registration process.
}

const initialState: IUser = {
  loading: false,
  userInfo: {}, // for user object
  userToken: null, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    // login user
    [userLogin.pending.toString()]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled.toString()]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.userToken = payload.userToken;
    },
    [userLogin.rejected.toString()]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // register user reducer...
  },
});

export default userSlice.reducer;
