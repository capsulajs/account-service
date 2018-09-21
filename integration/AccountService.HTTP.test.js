import { AxiosDispatcher } from 'transport/HTTP/AxiosDispatcher';

import { runAccountServiceTests } from './utils';

runAccountServiceTests(getWebSocketDispatcher());
