import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

type UserAuthState = {
  user: {
    username: string;
    fullName: string;
    image: string;
  };
};

const initialState = {
  user: null,
};

export const register = createAsyncThunk(
  "auth/register",
  async (
    registrationData: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/users/signup",
        registrationData
      );
      if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.access_token}`;
      }

      return response.data.user;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("An error occurred while registering.");
      }
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/users/login",
        credentials
      );
      if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.access_token}`;
      }
      return response.data.user;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("An error occurred while logging in.");
      }
    }
  }
);

const userAuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { setUser, logout } = userAuthSlice.actions;
export const selectUser = (state: { auth: UserAuthState }) => state.auth.user;

export default userAuthSlice.reducer;
