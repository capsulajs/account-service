// @flow

import { ConfigurationServiceInterface } from 'api/ConfigurationServiceInterface';

import {
  CreateRepositoryRequest,
  CreateRepositoryResponse,
  FetchRequest,
  FetchResponse,
  SaveRequest,
  SaveResponse,
  DeleteRequest,
  DeleteResponse,
} from 'api/ConfigurationServiceTypes';

import { Dispatcher } from 'transport/api';

export class ConfigurationService implements ConfigurationServiceInterface {
  dispatcher: Dispatcher;

  constructor(dispatcher: Dispatcher) {
    this.dispatcher = dispatcher;
  }

  createRepository(request: CreateRepositoryRequest): Promise<CreateRepositoryResponse> {
    return this.dispatcher.dispatch(
      request,
      '/io.scalecube.configuration.api.ConfigurationService/createRepository'
    );
  }

  fetch(request: FetchRequest): Promise<FetchResponse> {
    return this.dispatcher.dispatch(
      request,
      '/io.scalecube.configuration.api.ConfigurationService/fetch'
    );
  }

  entries(request: FetchRequest): Promise<FetchResponse> {
    return this.dispatcher.dispatch(
      request,
      '/io.scalecube.configuration.api.ConfigurationService/entries'
    );
  }

  save(request: SaveRequest): Promise<SaveResponse> {
    return this.dispatcher.dispatch(
      request,
      '/io.scalecube.configuration.api.ConfigurationService/save'
    );
  }

  delete(request: DeleteRequest): Promise<DeleteResponse> {
    return this.dispatcher.dispatch(
      request,
      '/io.scalecube.configuration.api.ConfigurationService/delete'
    );
  };
};
