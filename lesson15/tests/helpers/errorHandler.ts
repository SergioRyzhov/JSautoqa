import { AxiosResponse } from 'axios';

export const handleExpectedError = (request: Promise<AxiosResponse>, expectedStatus: number): Promise<void> => {
    return request
        .then(() => {
            throw new Error(`Expected a ${expectedStatus} error, but succeeded`);
        })
        .catch((error: any) => {
            if (error.response) {
                expect(error.response.status).toEqual(expectedStatus);
            } else {
                throw error;
            }
        });
};
