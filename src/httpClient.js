import axios from "axios";

const httpClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default httpClient;

export const httpClientForIframe = axios.create({
  baseURL: "http://143.110.186.134/api/collection",
  headers: {
    "Content-Type": "application/json",
  },
});

export const backendClient = axios.create({
  baseURL: "http://143.110.186.134/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const httpClientForIframeForStory = axios.create({
  baseURL: "http://143.110.186.134/api/story",
  headers: {
    "Content-Type": "application/json",
  },
});

export const httpClientForIframeForShowcase = axios.create({
  baseURL: "http://143.110.186.134/api/showcase",
  headers: {
    "Content-Type": "application/json",
  },
});
