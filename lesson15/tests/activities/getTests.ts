import { apiGet } from '../helpers/apiHelper';
import { validateSchema } from '../helpers/schemaValidator';
import { handleExpectedError } from '../helpers/errorHandler';
import baseJsonSchema from '../../data/baseschema.v1.json';
import { AxiosResponse } from 'axios';

const url = "https://fakerestapi.azurewebsites.net/api/v1/Activities";
const config = { headers: { "Content-Type": "application/json" } };

export const runGetTests = () => {
    describe("GET", () => {
        let response: AxiosResponse;

        beforeEach(async () => {
            response = await apiGet(url, config);
        });

        test("The request should return status code 200", () => {
            expect(response.status).toEqual(200);
        });

        test("The response should match the appropriate JSON schema", () => {
            expect(validateSchema(response.data, baseJsonSchema)).toEqual(true);
        });

        test("Should return status code 404 for invalid endpoint", async () => {
            await handleExpectedError(apiGet(`${url}ololo`, config), 404);
        });
    });
};
