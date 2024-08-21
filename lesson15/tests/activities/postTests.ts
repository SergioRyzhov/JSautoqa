import { apiPost } from '../helpers/apiHelper';
import elementJsonSchema from '../../data/elementschema.v1.json';
import postBody from '../../data/postbody.v1.json';
import fakeBody from '../../data/fakebody.v1.json';
import { AxiosResponse } from 'axios';
import { Validator } from 'jsonschema';

const url = "https://fakerestapi.azurewebsites.net/api/v1/Activities";
const config = { headers: { "Content-Type": "application/json" } };
const validator = new Validator();

export const runPostTests = () => {
    let response: AxiosResponse;
    describe("POST", () => {
        beforeEach(async () => {
            response = await apiPost(url, postBody, config);
        });

        test("Should return status code 200", () => {
            expect(response.status).toEqual(200);
        });

        test("The response should match the appropriate JSON schema", () => {
            const validationResult = validator.validate(response.data, elementJsonSchema);
            expect(validationResult.valid).toEqual(true);
        });

        test.skip("The response should be the same as the body", () => {
            expect(response.data).toEqual(fakeBody);
        });
    });
};