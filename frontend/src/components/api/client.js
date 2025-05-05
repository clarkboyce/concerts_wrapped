import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/data-api/', // Always use proxy in browser
  headers: { 
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Only use direct connection for server-side or testing
if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_USE_DIRECT) {
  apiClient.defaults.baseURL = process.env.REACT_APP_BEND_API_URL;
}

export default apiClient;