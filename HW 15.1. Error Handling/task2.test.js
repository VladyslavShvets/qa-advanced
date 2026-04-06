const axios = require('axios');
const { fetchWithHeadersAndParams } = require('./task2');

jest.mock('axios');

describe('Task 2: Testing Request Headers and Params', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should include correct Authorization header in request', async () => {
    axios.get.mockResolvedValue({ data: { users: [] } });

    await fetchWithHeadersAndParams(42);

    const config = axios.get.mock.calls[0][1];
    expect(config.headers).toHaveProperty('Authorization', 'Bearer my-secret-token');
  });

  it('should include correct custom header in request', async () => {
    axios.get.mockResolvedValue({ data: { users: [] } });

    await fetchWithHeadersAndParams(42);

    const config = axios.get.mock.calls[0][1];
    expect(config.headers).toHaveProperty('X-Custom-Header', 'qa-automation');
  });

  it('should include correct query parameters in request', async () => {
    axios.get.mockResolvedValue({ data: { users: [] } });

    await fetchWithHeadersAndParams(42);

    const config = axios.get.mock.calls[0][1];
    expect(config.params).toEqual({ userId: 42, active: true, limit: 10 });
  });

  it('should call the correct URL', async () => {
    axios.get.mockResolvedValue({ data: { users: [] } });

    await fetchWithHeadersAndParams(42);

    expect(axios.get).toHaveBeenCalledWith(
      'https://api.example.com/users',
      expect.objectContaining({
        headers: expect.any(Object),
        params: expect.any(Object),
      })
    );
  });
});
