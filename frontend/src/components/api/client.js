import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production'
  ? 'https://concerts-backend-vkh2y6nrxa-uc.a.run.app' || '/data-api'
  : process.env.REACT_APP_BEND_API_URL;

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;