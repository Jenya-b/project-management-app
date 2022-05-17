import { API_URL } from '../settings';

const API = {
  get: async (request: string, token: string): Promise<Response> => {
    const response = await fetch(`${API_URL}/${request}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },
  post: async <D>(request: string, data: D, token: string): Promise<Response> => {
    const init = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(`${API_URL}/${request}`, init);
    return response;
  },
};

export default API;
