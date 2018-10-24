// @flow

export interface Dispatcher {
  dispatch(api: string, request: any): Promise<any>;
  +finalize?: () => Promise<null>;
}
