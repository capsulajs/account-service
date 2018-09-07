// @flow

import axios from 'axios';

import type { Dispatcher } from '../../api/Dispatcher';
import type { HttpMethod } from '../HttpMethod';
import type { AxiosDispatchParams } from './AxiosDispatchParams';

export class AxiosDispatcher implements Dispatcher {
  dispatcher: any;

  constructor(baseUrl: string) {
    this.dispatcher = axios.create({
      baseURL: baseUrl
    });
  }

  dispatch<T, AxiosDispatchParams, R>(request: T, params?: AxiosDispatchParams): Promise<?R> {
    const requestConfig = {
      method: (params && params.method) || 'post',
      data: request,
    }
    return this.dispatcher(requestConfig);
  }
};
