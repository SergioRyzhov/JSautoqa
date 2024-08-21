import { apiDelete, apiGet } from '../helpers/apiHelper';
import { AxiosResponse } from 'axios';
import { handleExpectedError } from '../helpers/errorHandler';

const url = "https://fakerestapi.azurewebsites.net/api/v1/Activities";
const config = { headers: { "Content-Type": "application/json" } };

export const runDeleteTests = () => {
    let response: AxiosResponse;
    describe("DELETE", () => {
        const id = 2;

        beforeEach(async () => {
            response = await apiDelete(`${url}/${id}`, config);
        });

        test("Should return status code 200", () => {
            expect(response.status).toEqual(200);
        });

        test.skip("Should return a 404 status code if the specified ID was deleted", async () => {
            await handleExpectedError(apiGet(`${url}/${id}`, config), 404);
        });

        test.skip("Should return a 404 status code if a wrong ID is passed", async () => {
            const fakeId = (await apiGet(url, config)).data.length + 1;
            await handleExpectedError(apiDelete(`${url}/${fakeId}`, config), 404);
        });
    });
};