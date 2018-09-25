// @flow

export interface Dispatcher {
  dispatch(request: any, api: string): Promise<any>;
  +finalize?: () => Promise<null>;
}
