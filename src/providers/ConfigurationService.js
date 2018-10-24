// @flow

import { ConfigurationServiceInterface } from '../api/ConfigurationServiceInterface';

import {
  CreateRepositoryRequest,
  CreateRepositoryResponse,
  FetchRequest,
  FetchResponse,
  EntriesRequest,
  EntriesResponse,
  SaveRequest,
  SaveResponse,
  DeleteRequest,
  DeleteResponse,
} from '../api/ConfigurationServiceTypes';

import { Dispatcher } from '../transport/api';

export class ConfigurationService implements ConfigurationServiceInterface {
  dispatcher: Dispatcher;

  constructor(dispatcher: Dispatcher) {
    this.dispatcher = dispatcher;
  }

  createRepository(request: CreateRepositoryRequest): Promise<CreateRepositoryResponse> {
    return this.dispatcher.dispatch(
      '/io.scalecube.configuration.api.ConfigurationService/createRepository',
      request,
    );
  }

  fetch(request: FetchRequest): Promise<FetchResponse> {
    return this.dispatcher.dispatch(
      '/io.scalecube.configuration.api.ConfigurationService/fetch',
      request,
    );
  }

  entries(request: EntriesRequest): Promise<EntriesResponse> {
    return this.dispatcher.dispatch(
      '/io.scalecube.configuration.api.ConfigurationService/entries',
      request,
    );
  }

  save(request: SaveRequest): Promise<SaveResponse> {
    return this.dispatcher.dispatch(
      '/io.scalecube.configuration.api.ConfigurationService/save',
      request,
    );
  }

  delete(request: DeleteRequest): Promise<DeleteResponse> {
    return this.dispatcher.dispatch(
      '/io.scalecube.configuration.api.ConfigurationService/delete',
      request,
    );
  };
};
