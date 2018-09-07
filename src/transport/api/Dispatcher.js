// @flow

export interface Dispatcher {
  dispatch<T, P, R>(request: T, params?: P): Promise<?R>;
};
