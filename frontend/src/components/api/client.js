import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production'
  ? '/data-api'
  : process.env.REACT_APP_API_URL;

const apiClient = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  // Force HTTPS even if any code tries HTTP
  transformRequest: [(data, headers) => {
    if (headers && headers.url && headers.url.startsWith('http://')) {
      headers.url = headers.url.replace('http://', 'https://');
    }
    return data;
  }]
});

export default apiClient;