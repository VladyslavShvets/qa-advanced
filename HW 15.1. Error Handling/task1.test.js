const axios = require('axios');
const { fetchFromInvalidUrl } = require('./task1');

jest.mock('axios');

describe('Task 1: Error Handling with Axios', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle network error and return proper error message', async () => {
    const networkError = new Error('Network Error');
    networkError.request = {};
    axios.get.mockRejectedValue(networkError);

    const result = await fetchFromInvalidUrl();

    expect(result).toHaveProperty('error');
    expect(result.error).toMatch(/network error/i);
  });

  it('should handle server error (404) and return status in message', async () => {
    const serverError = new Error('Not Found');
    serverError.response = { status: 404, statusText: 'Not Found' };
    axios.get.mockRejectedValue(serverError);

    const result = await fetchFromInvalidUrl();

    expect(result).toHaveProperty('error');
    expect(result.error).toContain('404');
  });

  it('should handle request setup error and return error message', async () => {
    const requestError = new Error('Invalid URL');
    axios.get.mockRejectedValue(requestError);

    const result = await fetchFromInvalidUrl();

    expect(result).toHaveProperty('error');
    expect(result.error).toContain('Invalid URL');
  });
});
