// @flow

// Common type of the Account Info
export interface Account  {
  accountId: string;
  name: string;
  // projects: string[]; // keys
};

// List Current User Accounts Request
export interface ListRequest {
};

// List Current User Accounts Response
export interface ListResponse {
  accounts: Account[],
};

// Create Account Request
export interface CreateAccountRequest {
  name: string,
  email: string,
};

// Create Account Response
export interface CreateAccountResponse {
  accountId: string,
  name: string,
  email: string,
};

// Delete Account Request
export interface DeleteAccountRequest {
  accountId: string,
};

// Delete Account Request
export interface DeleteAccountResponse {
  deleted: boolean,
  accountId: string,
};

// Invite Member Request
export interface InviteRequest {
  accountId: string,
  userId: string;
};

// Invite Member Response
export interface InviteResponse {
};

// Revoke Member Request
export interface RevokeRequest {
  accountId: string,
  userId: string;
};

// Revoke Member Response
export interface RevokeResponse {
};
