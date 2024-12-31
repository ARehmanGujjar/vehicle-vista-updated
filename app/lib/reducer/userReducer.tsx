"use client";
import { Slice, createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";

export type ProfileResponse = {
  userAuth: any;
  shop: any;
};

const initialState: Partial<ProfileResponse> = {
  userAuth: {},
  shop: {},
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserAction(state, action) {
      console.log(action.payload, "action");
      // const inspectorDetails = {
      //   id: action.payload.id,
      //   email: action.payload.email,
      //   firstName: action.payload.firstName,
      //   lastName: action.payload.lastName,
      // };
      state.userDetails = action.payload;
      console.log(state.userDetails, "i");
    },
    setShopAction(state, action) {
      console.log(action.payload, "action");

      state.shop = action.payload;
      console.log(state.shop, "i");
    },
  },
}) as Slice;

export const userReducer = slice.reducer;
export const { setUserAction, setShopAction } = slice.actions;
