const axios = require('axios');

const INVALID_USERS_URL =
  'https://jsonplaceholder.typicode.com/invalid-users-endpoint';

function formatAxiosError(error) {
  if (error.response) {
    return `Request failed with status ${error.response.status}: ${error.response.statusText}`;
  }

  if (error.request) {
    return 'Request failed: no response received from the server';
  }

  return `Request setup failed: ${error.message}`;
}

async function fetchFromInvalidUrl(client = axios) {
  try {
    const response = await client.get(INVALID_USERS_URL);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: formatAxiosError(error),
    };
  }
}

module.exports = {
  INVALID_USERS_URL,
  fetchFromInvalidUrl,
  formatAxiosError,
};
