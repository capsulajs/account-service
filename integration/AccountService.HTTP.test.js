import { getHttpDispatcher } from './utils/transports';

import { runAccountServiceTests } from './utils/runAccountServiceTests';

runAccountServiceTests(getHttpDispatcher());
