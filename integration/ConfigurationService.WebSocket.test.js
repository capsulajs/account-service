import { runConfigurationServiceTests } from './utils/runConfigurationServiceTests';
import { getWebSocketDispatcher } from './utils/transports';

runConfigurationServiceTests(getWebSocketDispatcher());
