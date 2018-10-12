// @flow
import { Token } from './Token';

/**
 *  Interface for the Entries (key/value pair)
 */
 interface Entry {
   key: string;
   value: any;
 }

/**
 * Request of the Create Configuration Repository
 * @Token  - Authentication token
 * @repository - The Name of the Configuration Repository
 */
export interface CreateRepositoryRequest {
  token: Token;
  repository: string;
};

/**
 * Response of the Create Configuration Repository
 * An Empty Object
 */
export interface CreateRepositoryResponse {
};

/**
 * Request of the Fetch Entry
 */
export interface FetchRequest {
  token: string;
  repository: string;
  key: string;
};

/**
 * Response of the Fetch Entry
 */
export interface FetchResponse extends Entry {
};

/**
 * Request of the Entries
 */
export interface EntriesRequest {
  token: string;
  repository: string;
  key: string;
};

/**
 * Response of the Entries
 */
export interface EntriesResponse {
  entries: Entry[];
};

/**
 * Save Request
 */
export interface SaveRequest {
  token: string;
  repository: string;
  key: string;
  value: any;
};

/**
 * Save Response
 */
export interface SaveResponse {
};

/**
 * Delete Request
 */
export interface DeleteRequest {
  token: string;
  repository: string;
  key: string;
};

/**
 * Delete Response
 */
export interface DeleteResponse {
};
