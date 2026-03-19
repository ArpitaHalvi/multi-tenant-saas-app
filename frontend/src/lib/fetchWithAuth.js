import { store } from "@/redux/store";
import { setAccessToken, clearAuth } from "@/redux/authSlice";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchWithAuth = async (url, options = {}) => {
  const state = store.getState();
  //   console.log("State from fetch with auth: ", state);
  let token = state.auth.accessToken;
  let response = await fetch(`${baseUrl}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...(options.headers || {}),
    },
    credentials: "include",
  });
  // If the request ended with 401 status code then the token is missing so creating a new token
  if (response.status === 401) {
    const refreshResponse = await fetch(
      `${baseUrl}/api/auth/tenants/refresh-token`,
      {
        method: "POST",
        credentials: "include",
      },
    );
    if (refreshResponse.ok) {
      const data = await refreshResponse.json();
      store.dispatch(setAccessToken(data.accessToken));
      // Now the refresh token provided us with the new access token so make the API call again
      response = await fetch(`${baseUrl}${url}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: data.accessToken ? `Bearer ${data.accessToken}` : "",
          ...(options.headers || {}),
        },
        credentials: "include",
      });
    } else {
      // New access token not generated - logout
      store.dispatch(clearAuth());
    }
  }
  return response;
};
