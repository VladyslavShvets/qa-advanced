const axios = require('axios');

/**
 * Task 2: Testing Request Headers and Params
 * Makes a GET request with custom headers and URL query parameters.
 */
async function fetchWithHeadersAndParams(userId) {
  const config = {
    headers: {
      Authorization: 'Bearer my-secret-token',
      'X-Custom-Header': 'qa-automation',
      'Content-Type': 'application/json',
    },
    params: {
      userId,
      active: true,
      limit: 10,
    },
  };

  try {
    const response = await axios.get('https://api.example.com/users', config);
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
}

module.exports = { fetchWithHeadersAndParams };
