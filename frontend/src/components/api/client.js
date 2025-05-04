import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production'
  ? '/data-api'
  : process.env.REACT_APP_BEND_API_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;