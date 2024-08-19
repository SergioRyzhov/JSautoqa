import axios, { AxiosResponse } from 'axios';
import baseJsonSchema from '../data/baseschema.v1.json';
import postBody from '../data/postbody.v1.json';
import putBody from '../data/putbody.v1.json';
import elementJsonSchema from '../data/elementschema.v1.json';
import fakeBody from '../data/fakebody.v1.json';
import { Validator } from 'jsonschema';

const validator = new Validator();
const url = "https://fakerestapi.azurewebsites.net/api/v1/Activities";
const config = {
    headers: {
        "Content-Type": "application/json",
    }
};

describe("Activities API test", () => {
    let response: AxiosResponse;
    const handleExpectedError = async (request: Promise<AxiosResponse>, expectedStatus: number) => {
        try {
            response = await request;
            throw new Error(`Expected a ${expectedStatus} error, but succeeded`);
        } catch (error: any) {
            if (error.response) {
                expect(error.response.status).toEqual(expectedStatus);
            } else {
                throw error;
            }
        }
    };

    describe("GET", () => {
        beforeEach(async () => {
            response = await axios.get(url, config);
        });

        test("The request should return status code 200", async () => {
            expect(response.status).toEqual(200);
        });

        test("The response should match the appropriate JSON schema", () => {
            const validationResult = validator.validate(response.data, baseJsonSchema);
            expect(validationResult.valid).toEqual(true);
        });

        test("Should return status code 404 for invalid endpoint", async () => {
            await handleExpectedError(axios.get(`${url}ololo`, config), 404);
        });
    });

    describe("POST", () => {
        beforeEach(async () => {
            response = await axios.post(url, postBody, config);
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

    describe("GET data with ID", () => {
        const id = 2;

        beforeEach(async () => {
            response = await axios.get(`${url}/${id}`, config);
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

    describe("PUT", () => {
        const id = 2;

        beforeEach(async () => {
            response = await axios.put(`${url}/${id}`, putBody, config);
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
            const fakeId = (await axios.get(url, config)).data.length + 1;
            await handleExpectedError(axios.put(`${url}/${fakeId}`, putBody, config), 404);
        });
    });

    describe("DELETE", () => {
        const id = 2;

        beforeEach(async () => {
            response = await axios.delete(`${url}/${id}`, config);
        });

        test("Should return status code 200", () => {
            expect(response.status).toEqual(200);
        });

        test.skip("Should return a 404 status code if the specified ID was deleted", async () => {
            await handleExpectedError(axios.get(`${url}/${id}`, config), 404);
        });

        test.skip("Should return a 404 status code if a wrong ID is passed", async () => {
            const fakeId = (await axios.get(url, config)).data.length + 1;
            await handleExpectedError(axios.delete(`${url}/${fakeId}`, config), 404);
        });
    });
});