import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { Auth0Provider } from "@auth0/auth0-react";
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
if (process.env.NODE_ENV === 'production') {
  console.log = function () {};
  console.warn = function () {};
  console.error = function () {};
}

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: process.env.REACT_APP_VERCEL_ENV === "production"
          ? `https://${window.location.hostname}/callback`
          : process.env.REACT_APP_AUTH0_CALLBACK_URL
      }}
    >
      <Router>
        <App />
      </Router>
    </Auth0Provider>
  </React.StrictMode>
);

