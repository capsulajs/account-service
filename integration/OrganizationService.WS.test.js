import { runOrganizationServiceTests } from './utils/runOrganizationServiceTests';
import { getWebSocketDispatcher } from './utils/transports';

runOrganizationServiceTests(getWebSocketDispatcher());
