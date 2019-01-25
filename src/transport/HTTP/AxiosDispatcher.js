// @flow

import axios from 'axios';

import { Dispatcher } from 'transport/api';

export class AxiosDispatcher implements Dispatcher {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  dispatch(api: string, request: any): Promise<any> {
    return axios.post(this.baseUrl + api, request)
      .then(response => response.data)
      .catch(error => Promise.reject(error.response.data));
  }
};
