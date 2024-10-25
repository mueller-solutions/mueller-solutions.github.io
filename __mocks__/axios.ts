import { type AxiosResponse } from 'axios';
import { vi } from 'vitest';

// Define a custom type for the axios mock
type AxiosMock = {
  create: () => AxiosMock;
  get: (url: string) => Promise<AxiosResponse>;
  post: (url: string, data: any) => Promise<AxiosResponse>;
  put: (url: string, data: any) => Promise<AxiosResponse>;
  delete: (url: string) => Promise<AxiosResponse>;
};

const axios = vi.fn() as unknown as AxiosMock;

axios.create = vi.fn(() => axios);
axios.get = vi.fn(() =>
  Promise.resolve({ data: {}, status: 200, statusText: 'OK', headers: {}, config: {}, request: {} } as AxiosResponse),
);
axios.post = vi.fn(() =>
  Promise.resolve({ data: {}, status: 200, statusText: 'OK', headers: {}, config: {}, request: {} } as AxiosResponse),
);
axios.put = vi.fn(() =>
  Promise.resolve({ data: {}, status: 200, statusText: 'OK', headers: {}, config: {}, request: {} } as AxiosResponse),
);
axios.delete = vi.fn(() =>
  Promise.resolve({ data: {}, status: 200, statusText: 'OK', headers: {}, config: {}, request: {} } as AxiosResponse),
);

export default axios;
