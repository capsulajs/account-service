import axios from 'axios';

const auth0Request = require('./Auth0_token_request');

const mapResponse = ({ status, statusText, data }) => ({ status, statusText, data });

export const getAuth0Token = () =>
  axios.post(
    'https://taras-shedenko.eu.auth0.com/oauth/token',
    auth0Request,
    { headers: { 'content-type': 'application/json' } }
  )
  .then(response => mapResponse(response))
  .catch(error => Promise.reject(mapResponse(error.response)));
