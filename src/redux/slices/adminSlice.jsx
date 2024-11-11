import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  isAdmin: localStorage.getItem("isAdmin") === "true",
  userList: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const data = action.payload;
      state.userData = data;
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
      localStorage.setItem("isAdmin", action.payload);
    },
    setUserList: (state, action) => {
      const data = action.payload;
      state.userList = data;
    },
  },
});

export const { setUserData, setIsAdmin, setUserList } = adminSlice.actions;
export default adminSlice.reducer;
