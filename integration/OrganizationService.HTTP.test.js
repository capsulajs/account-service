import { getHttpDispatcher } from './utils/transports';

import { runOrganizationServiceTests } from './utils/runOrganizationServiceTests';

runOrganizationServiceTests(getHttpDispatcher());
