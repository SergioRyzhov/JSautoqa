import { apiPut, apiGet } from '../helpers/apiHelper';
import elementJsonSchema from '../../data/elementschema.v1.json';
import putBody from '../../data/putbody.v1.json';
import { AxiosResponse } from 'axios';
import { Validator } from 'jsonschema';
import { handleExpectedError } from '../helpers/errorHandler';

const url = "https://fakerestapi.azurewebsites.net/api/v1/Activities";
const config = { headers: { "Content-Type": "application/json" } };
const validator = new Validator();

export const runPutTests = () => {
    let response: AxiosResponse;
    describe("PUT", () => {
        const id = 2;

        beforeEach(async () => {
            response = await apiPut(`${url}/${id}`, putBody, config);
        });

        test("Should return status code 200", () => {
            expect(response.status).toEqual(200);
        });

        test("The response should match the appropriate JSON schema", () => {
            const validationResult = validator.validate(response.data, elementJsonSchema);
            expect(validationResult.valid).toEqual(true);
        });

        test("The response should be the same as the body", () => {
            expect(response.data).toEqual(putBody);
        });

        test.skip("Should return status code 404 for non-existent ID", async () => {
            const fakeId = (await apiGet(url, config)).data.length + 1;
            await handleExpectedError(apiPut(`${url}/${fakeId}`, putBody, config), 404);
        });
    });
};