const axios = require('axios');

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

function buildUsersRequestConfig(options = {}) {
  const { token = 'qa-advanced-token', requestId = 'hw-15-1', headers = {}, params = {} } =
    options;

  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Request-Id': requestId,
      'Content-Type': 'application/json',
      ...headers,
    },
    params: {
      page: 1,
      limit: 5,
      active: true,
      ...params,
    },
  };
}

async function fetchWithHeadersAndParams(options = {}, client = axios) {
  const config = buildUsersRequestConfig(options);
  const response = await client.get(USERS_URL, config);

  return response.data;
}

module.exports = {
  USERS_URL,
  buildUsersRequestConfig,
  fetchWithHeadersAndParams,
};
