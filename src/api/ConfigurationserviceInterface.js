// @flow

import {
  CreateRepositoryRequest,
  CreateRepositoryResponse,
  FetchRequest,
  FetchResponse,
  SaveRequest,
  SaveResponse,
  DeleteRequest,
  DeleteResponse,
}
// Scalecube Configuration Service
export interface ConfigurationServiceInterface {

  /**
   * Create Configuration Repository
   */
  createRepository(request: CreateRepositoryRequest): Promise<CreateRepositoryResponse>;

  /**
   * Fetch Repository Entry
   */
  fetch(request: FetchRequest): Promise<FetchResponse>;

  /**
   * Fetch Repository Entries
   */
  entries(request: FetchRequest): Promise<FetchResponse>;

  /**
   * Save Repository Entry
   */
  save(request: SaveRequest): Promise<SaveResponse>;

  /**
   * Delete Repository Entry
   */
  delete(request: DeleteRequest): Promise<DeleteResponse>;
};
