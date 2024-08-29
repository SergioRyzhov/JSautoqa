import { handleExpectedError } from '../helpers/errorHandler';
import elementJsonSchema from '../../data/elementschema.v1.json';
import axios, { AxiosResponse } from 'axios';
import { Validator } from 'jsonschema';
import { apiGet } from '../helpers/apiHelper';

const url = "https://fakerestapi.azurewebsites.net/api/v1/Activities";
const config = { headers: { "Content-Type": "application/json" } };
const validator = new Validator();

export const runRetrieveTests = () => {
    let response: AxiosResponse;
    describe("GET data with ID", () => {
        const id = 2;

        beforeEach(async () => {
            response = await apiGet(`${url}/${id}`, config);
        });

        test("The request should return status code 200", () => {
            expect(response.status).toEqual(200);
        });

        test("The response should match the appropriate JSON schema", () => {
            const validationResult = validator.validate(response.data, elementJsonSchema);
            expect(validationResult.valid).toEqual(true);
        });

        test("The response ID field should match the requested ID", () => {
            expect(response.data.id).toEqual(id);
        });

        test("Should return status code 404 for non-existent ID", async () => {
            const fakeId = (await axios.get(url, config)).data.length + 1;
            await handleExpectedError(axios.get(`${url}/${fakeId}`, config), 404);
        });
    });
};