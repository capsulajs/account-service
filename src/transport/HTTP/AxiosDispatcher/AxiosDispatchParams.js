// @flow

import type { HttpMethod } from '../HttpMethod';

// Corresponds to Axios Request Config
// https://www.npmjs.com/package/axios#request-config
export interface AxiosDispatchParams {
  url: string,
  method?: HttpMethod,
};
