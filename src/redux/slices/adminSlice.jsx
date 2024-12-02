import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: null,

  // ADMIN
  isAdmin: localStorage.getItem('isAdmin') === 'true',
  userList: null,
  plansList: null,
  videosList: null,

  // USER
  usersPlansList: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const data = action.payload;
      state.userData = data;
    },

    // ADMIN
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

    // USER
    setUserPlansList: (state, action) => {
      const data = action.payload;
      state.usersPlansList = data;
    },
  },
});

export const {
  setUserData,

  // ADMIN
  setIsAdmin,
  setUserList,
  setPlansList,
  setVideosList,

  // USER
  setUserPlansList,
} = adminSlice.actions;
export default adminSlice.reducer;
