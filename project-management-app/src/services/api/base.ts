import settings from '../settings';

const API_URL = settings.API_URL;

export interface ResponseError {
  error: {
    code?: number;
    message: string;
  };
}

const API = {
  get: async <T>(request: string, token: string): Promise<T> => {
    const response = await fetch(`${API_URL}/${request}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const responseError: ResponseError = {
        error: {
          code: response.status,
          message: response.statusText,
        },
      };
      return Promise.reject(responseError);
    }
    const content = await response.json();
    return content;
  },
  post: async <D, T>(request: string, data: D, token: string): Promise<T> => {
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
    if (!response.ok) {
      const responseError: ResponseError = {
        error: {
          code: response.status,
          message: response.statusText,
        },
      };
      return Promise.reject(responseError);
    }
    const content = await response.json();
    return content;
  },
};

export default API;
