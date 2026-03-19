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
    setAuth: (state, action) => {
      const { accessToken, userId, tenantId } = action.payload;
      state.accessToken = accessToken;
      state.userId = userId;
      state.tenantId = tenantId;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    clearAuth: (state) => {
      state.accessToken = null;
      state.userId = null;
      state.tenantId = null;
    },
  },
});

export const { setAuth, clearAuth, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
