const axios = require('axios');
const { INVALID_USERS_URL, fetchFromInvalidUrl } = require('./task1');

jest.mock('axios');

describe('Task 1: Error Handling with Axios', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns a formatted 404 message for an invalid URL request', async () => {
    const responseError = new Error('Not Found');
    responseError.response = { status: 404, statusText: 'Not Found' };
    axios.get.mockRejectedValue(responseError);

    const result = await fetchFromInvalidUrl();

    expect(axios.get).toHaveBeenCalledWith(INVALID_USERS_URL);
    expect(result).toEqual({
      success: false,
      message: 'Request failed with status 404: Not Found',
    });
  });

  it('returns a network message when the request gets no response', async () => {
    const networkError = new Error('Network Error');
    networkError.request = {};
    axios.get.mockRejectedValue(networkError);

    const result = await fetchFromInvalidUrl();

    expect(result).toEqual({
      success: false,
      message: 'Request failed: no response received from the server',
    });
  });

  it('returns a setup message when axios cannot create the request', async () => {
    const setupError = new Error('Invalid URL');
    axios.get.mockRejectedValue(setupError);

    const result = await fetchFromInvalidUrl();

    expect(result).toEqual({
      success: false,
      message: 'Request setup failed: Invalid URL',
    });
  });
});
