import axios, { AxiosResponse } from 'axios';

export const apiGet = (url: string, config: object): Promise<AxiosResponse> => {
    return axios.get(url, config);
};

export const apiPost = (url: string, body: object, config: object): Promise<AxiosResponse> => {
    return axios.post(url, body, config);
};

export const apiPut = (url: string, body: object, config: object): Promise<AxiosResponse> => {
    return axios.put(url, body, config);
};

export const apiDelete = (url: string, config: object): Promise<AxiosResponse> => {
    return axios.delete(url, config);
};
