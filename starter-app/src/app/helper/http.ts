import axios,{ AxiosRequestConfig, AxiosError } from "axios";

const http = axios.create({});

const urlParams = new URLSearchParams(window.location.search);
const stateValue = Object.fromEntries(urlParams);

if (stateValue?.state) {
  http.interceptors.request.use((request: AxiosRequestConfig) => {
    request.headers!.authorization = stateValue?.state;
    return request;
  }, (error: AxiosError) => {
    return Promise.reject(error);
  });
}

export default http;
