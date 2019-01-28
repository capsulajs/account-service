import { runAccountServiceTests } from './utils/runAccountServiceTests';
import { getHttpDispatcher } from './utils/transports';

runAccountServiceTests(getHttpDispatcher());
