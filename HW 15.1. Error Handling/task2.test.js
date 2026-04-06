const axios = require('axios');
const {
  USERS_URL,
  buildUsersRequestConfig,
  fetchWithHeadersAndParams,
} = require('./task2');

jest.mock('axios');

describe('Task 2: Testing Request Headers and Params', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('sends custom headers and params in the axios request config', async () => {
    const mockUsers = [{ id: 1, name: 'Leanne Graham' }];
    const options = {
      token: 'custom-token',
      requestId: 'req-42',
      headers: {
        'X-Test-Mode': 'jest',
      },
      params: {
        page: 2,
        limit: 10,
        role: 'admin',
      },
    };
    const expectedConfig = buildUsersRequestConfig(options);

    axios.get.mockResolvedValue({ data: mockUsers });

    const result = await fetchWithHeadersAndParams(options);

    expect(axios.get).toHaveBeenCalledWith(USERS_URL, expectedConfig);
    expect(result).toEqual(mockUsers);
  });

  it('keeps default headers and params when custom values are omitted', () => {
    const config = buildUsersRequestConfig({
      params: { role: 'viewer' },
    });

    expect(config).toEqual({
      headers: {
        Authorization: 'Bearer qa-advanced-token',
        'X-Request-Id': 'hw-15-1',
        'Content-Type': 'application/json',
      },
      params: {
        page: 1,
        limit: 5,
        active: true,
        role: 'viewer',
      },
    });
  });
});
