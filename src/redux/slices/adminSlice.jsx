import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: null,
  isAdmin: localStorage.getItem('isAdmin') === 'true',
  userList: null,
  plansList: null,
  videosList: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const data = action.payload;
      state.userData = data;
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
      localStorage.setItem('isAdmin', action.payload);
    },
    setUserList: (state, action) => {
      const data = action.payload;
      state.userList = data;
    },
    setPlansList: (state, action) => {
      const data = action.payload;
      state.plansList = data;
    },
    setVideosList: (state, action) => {
      const data = action.payload;
      state.videosList = data;
    },
  },
});

export const {
  setUserData,
  setIsAdmin,
  setUserList,
  setPlansList,
  setVideosList,
} = adminSlice.actions;
export default adminSlice.reducer;
