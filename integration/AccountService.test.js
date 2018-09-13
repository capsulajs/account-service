// @flow

import { AccountService } from 'AccountService';
import { AxiosDispatcher } from 'transport/HTTP/AxiosDispatcher';

const accountService = new AccountService(
  new AxiosDispatcher({
    baseUrl: ''
  })
);
