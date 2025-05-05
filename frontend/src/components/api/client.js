import axios from 'axios';

const getBaseURL = () => {
  if (process.env.NODE_ENV === 'production') {
    return '/data-api';
  }
  
  const localURL = process.env.REACT_APP_BEND_API_URL;
  return localURL;
};

const apiClient = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(config => {
  if (config.url.startsWith('http://')) {
    config.url = config.url.replace('http://', 'https://');
  }
  return config;
});

export default apiClient;