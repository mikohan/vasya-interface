import { CSRF_TOKEN } from './csrfToken';

const headers = {
  'content-type': 'application/json',
  'X-CSRFTOKEN': CSRF_TOKEN,
};

export const config = {
  headers: headers,
};
