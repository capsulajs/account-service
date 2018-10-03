import { getHttpDispatcher } from './utils/transports';

import { runConfigurationServiceTests } from './utils/runConfigurationServiceTests';

runConfigurationServiceTests(getHttpDispatcher());
