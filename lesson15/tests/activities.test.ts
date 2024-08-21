import { runGetTests } from './activities/getTests';
import { runRetrieveTests } from './activities/retrieveTests';
import { runPostTests } from './activities/postTests';
import { runPutTests } from './activities/putTests';
import { runDeleteTests } from './activities/deleteTests';

describe("Activities API test", () => {
    runGetTests();
    runRetrieveTests();
    runPostTests();
    runPutTests();
    runDeleteTests();
});