// @flow

import axios from 'axios';

import { Dispatcher } from 'transport/api';

export class AxiosDispatcher implements Dispatcher {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  dispatch(request: any, api: string): Promise<any> {
    // console.log('HTTP DISPATCH', request, api);
    return axios.post(this.baseUrl + api, request)
      .then(response => { /*console.log('HTTP RESPONSE:', response);*/ return response.data;})
      .catch(error => { /*console.log('HTTP ERROR: ', error);*/ return error.response.data;});
  }
};
