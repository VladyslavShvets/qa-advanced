const axios = require('axios');

/**
 * Task 1: Error Handling with Axios
 * Intentionally sends a request to an invalid URL to trigger an error.
 * Returns a structured error message based on the type of failure.
 */
async function fetchFromInvalidUrl() {
  try {
    const response = await axios.get(
      'https://this-url-does-not-exist-xyz-12345.com/api/data'
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with a non-2xx status
      return {
        error: `Server error: ${error.response.status} - ${error.response.statusText}`,
      };
    } else if (error.request) {
      // Request was made but no response received
      return { error: 'Network error: No response received from server' };
    } else {
      // Something went wrong setting up the request
      return { error: `Request error: ${error.message}` };
    }
  }
}

module.exports = { fetchFromInvalidUrl };
