import { runConfigurationServiceTests } from './utils/runConfigurationServiceTests';
import { getHttpDispatcher } from './utils/transports';

runConfigurationServiceTests(getHttpDispatcher());
