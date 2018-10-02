// @flow
import { Token } from './Token';

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
export interface FetchResponse {
  key: string;
  value: any;
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
