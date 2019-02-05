import axios from 'axios';
import env from 'dotenv';

env.config();

const data = {
  client_id: process.env.AUTH_CLIENT_ID,
  client_secret: process.env.AUTH_CLIENT_SECRET,
  audience: `https://${process.env.AUTH_CLIENT_DOMAIN}/api/v2/`,
  grant_type: 'client_credentials'
};

export const getAuth0Token = () => axios
  .post(`https://${process.env.AUTH_CLIENT_DOMAIN}/oauth/token`, data)
  .then(response => response.data.access_token)
  .catch(error => Promise.reject(error.response));

export const wrapToken = (token) => ({ token: { token, issuer: 'Auth0' }});
