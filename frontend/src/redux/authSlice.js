import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  userId: null,
  tenantId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const { accessToken, userId, tenantId } = action.payload;
      state.accessToken = accessToken;
      state.userId = userId;
      state.tenantId = tenantId;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    logout: (state) => {
      state.accessToken = null;
      state.userId = null;
      state.tenantId = null;
    },
  },
});

export const { loginUser, logout, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
