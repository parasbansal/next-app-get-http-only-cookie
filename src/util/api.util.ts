import axios, { AxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

type RequestData = {
  url: string;
  method: string;
  data: any;
  params: any;
};

api.interceptors.request.use(
  async (config) => {
    const requestData = JSON.parse(localStorage.getItem("requestData") || "[]");

    console.log(requestData);

    // Check if the current request already exists in the stored data
    const duplicateRequestIndex = requestData.findIndex(
      (request: RequestData) => {
        return compareCompleteRequest(request, config);
      }
    );

    // If the request is a duplicate, cancel the previous request and remove it from the stored data
    if (duplicateRequestIndex !== -1) {
      // If the request is a duplicate, don't send it again
      return Promise.reject("Duplicate request");
    }

    // Add the current request URL and payload to the existing data
    requestData.push({
      url: config.url || "",
      method: config.method || "GET",
      data: config.data,
      params: config.params,
    });

    // Save the updated request data in the local storage
    localStorage.setItem("requestData", JSON.stringify(requestData));

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  async (response) => {
    const requestData = JSON.parse(localStorage.getItem("requestData") || "[]");
    const requestIndex = requestData.findIndex((request: RequestData) => {
      return compareCompleteRequest(request, response.config);
    });
    if (requestIndex !== -1) {
      requestData.splice(requestIndex, 1);
      localStorage.setItem("requestData", JSON.stringify(requestData));
    }

    return response;
  },
  (error) => {
    // Do something with the error
    return Promise.reject(error);
  }
);

export function compareCompleteRequest(
  localRequest: RequestData,
  axiosRequest: AxiosRequestConfig
): boolean {
  return (
    localRequest.url === axiosRequest.url &&
    localRequest.method === axiosRequest.method &&
    JSON.stringify(localRequest.data) === JSON.stringify(axiosRequest.data) &&
    JSON.stringify(localRequest.params) === JSON.stringify(axiosRequest.params)
  );
}
