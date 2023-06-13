import axios from "axios";
import rateLimit from "axios-rate-limit";

const http = rateLimit(axios.create({ baseURL: "http://localhost:3200/v1" }), {
  maxRequests: 2,
  perMilliseconds: 1000,
  maxRPS: 2,
});

const token = localStorage.getItem("token") || null; // your auth token

if (token) {
  http.defaults.headers.common.Authorization = `Bearer ${token}`;
}

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response !== undefined) {
      if (error.response.status === 401) {
        // if auth not falid remove token
      } else {

      }
    }
    return Promise.reject(error);
  }
);

export default http;
