// @flow

import axios from 'axios';

import { Dispatcher } from 'transport/api';
import type { HttpMethod } from '../HttpMethod';
import type { AxiosDispatchParams } from './AxiosDispatchParams';

export class AxiosDispatcher implements Dispatcher {
  dispatcher: any;

  constructor(params: { baseUrl: string }) {
    this.dispatcher = axios.create({
      baseURL: params.baseUrl
    });
  }

  dispatch<T, R>(request: T, api: string): Promise<R> {
    const requestConfig = {
      method: 'post',
      data: request,
    }
    return this.dispatcher(requestConfig);
  }
};
