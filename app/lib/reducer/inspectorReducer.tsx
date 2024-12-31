"use client";
import { Slice, createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";

export type ProfileResponse = {
  inspectorAuth: any;
};

const initialState: Partial<ProfileResponse> = {
  inspectorAuth: {},
};

const slice = createSlice({
  name: "inspector",
  initialState,
  reducers: {
    setInspectorAction(state, action) {
      console.log(action.payload, "action");
      // const inspectorDetails = {
      //   id: action.payload.id,
      //   email: action.payload.email,
      //   firstName: action.payload.firstName,
      //   lastName: action.payload.lastName,
      // };
      state.inspectorDetails = action.payload;
      console.log(state.inspectorDetails, "i");
    },
  },
}) as Slice;

export const inspectorReducer = slice.reducer;
export const { setInspectorAction } = slice.actions;
