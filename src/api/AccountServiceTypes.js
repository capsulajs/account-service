// @flow

export interface Account  {
  accountId: string;
  name: string;
  // projects: string[]; // keys
};

export interface ListRequest {
};

export interface ListResponse {
  accounts: Account[],
};

export interface CreateAccountRequest {
  name: string,
  email: string,
};

export interface CreateAccountResponse {
  accountId: string,
  name: string,
  email: string,
  errorCode?: number,
  errorMessage?: string,
};

export interface DeleteAccountRequest {
  deleted: boolean,
  accountId: string,
};

export interface DeleteAccountResponse {
};
