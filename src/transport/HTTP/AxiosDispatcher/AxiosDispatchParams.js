// @flow

import type { HttpMethod } from '../HttpMethod';

// Corresponds to Axios Request Config
// https://www.npmjs.com/package/axios#request-config
export type AxiosDispatchParams = {
  url: string,
  method?: HttpMethod,
};
