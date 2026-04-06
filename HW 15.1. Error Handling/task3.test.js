const axios = require('axios');
const { USERS_URL, createUser, deleteUser, getUser } = require('./task3');

jest.mock('axios');

describe('Task 3: Mocking Axios in Jest', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUser', () => {
    it('returns user data for a successful GET request', async () => {
      const mockUser = { id: 7, name: 'Vlad Shvets', email: 'vlad@example.com' };
      axios.get.mockResolvedValue({ data: mockUser });

      const result = await getUser(7);

      expect(axios.get).toHaveBeenCalledWith(`${USERS_URL}/7`);
      expect(result).toEqual(mockUser);
    });

    it('throws a contextual error for a failed GET request', async () => {
      axios.get.mockRejectedValue(new Error('User not found'));

      await expect(getUser(999)).rejects.toThrow(
        'Fetching user 999 failed: User not found'
      );
    });
  });

  describe('createUser', () => {
    it('returns created user data for a successful POST request', async () => {
      const payload = { name: 'New User', email: 'new@example.com' };
      const createdUser = { id: 11, ...payload };
      axios.post.mockResolvedValue({ data: createdUser });

      const result = await createUser(payload);

      expect(axios.post).toHaveBeenCalledWith(USERS_URL, payload);
      expect(result).toEqual(createdUser);
    });

    it('throws a contextual error for a failed POST request', async () => {
      axios.post.mockRejectedValue(new Error('Validation failed'));

      await expect(createUser({ name: '' })).rejects.toThrow(
        'Creating user failed: Validation failed'
      );
    });
  });

  describe('deleteUser', () => {
    it('returns response data for a successful DELETE request', async () => {
      const deleteResponse = { success: true, id: 7 };
      axios.delete.mockResolvedValue({ data: deleteResponse });

      const result = await deleteUser(7);

      expect(axios.delete).toHaveBeenCalledWith(`${USERS_URL}/7`);
      expect(result).toEqual(deleteResponse);
    });

    it('throws a contextual error for a failed DELETE request', async () => {
      axios.delete.mockRejectedValue(new Error('Forbidden'));

      await expect(deleteUser(7)).rejects.toThrow(
        'Deleting user 7 failed: Forbidden'
      );
    });
  });
});
