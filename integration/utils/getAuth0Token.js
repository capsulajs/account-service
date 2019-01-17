import axios from 'axios';

const CLIENT_ID = 'FhUqfTk9Gr1225o2Smwb4CVOw2602RLH';
const CLIENT_SECRET = 'WUtQBZrfZW6OGOmqNL2ER_3vNpJJjjMOUFSGGrTac7Ux4bL_mPbEsvo8vxfYb7GH';
const CLIENT_DOMAIN = 'kach95.auth0.com';

const data = {
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
  audience: `https://${CLIENT_DOMAIN}/api/v2/`,
  grant_type: 'client_credentials'
};

export const getAuth0Token = () => axios
  .post(`https://${CLIENT_DOMAIN}/oauth/token`, data)
  .then(response => response.data.access_token)
  .catch(error => Promise.reject(error.response));
