import { JsendResponse } from './../app/core/http/http.types';

export const environment = {
  production: false,
  api: {
    url: 'https://localhost:44364/api',
    parsers: {
      apiResponses: null,
      // (response: HttpResponse<any>) => {
      // },
      loginResponse: (response = {} as JsendResponse) => {
        const obj = response.data || {};
        const result: JsendResponse = {
          ...response,
        };
        return result;
      },
      validateResponse: response => {
        const { active } = response || ({} as any);
        const result: JsendResponse = {
          status: active ? 'success' : 'error',
          data: response
        };
        return result;
      }
    }
  },
};
