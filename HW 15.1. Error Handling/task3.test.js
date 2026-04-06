const axios = require('axios');
const { getUser, createUser, deleteUser } = require('./task3');

jest.mock('axios');

describe('Task 3: Mocking Axios in Jest', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUser', () => {
    it('should return user data on successful GET request', async () => {
      const mockUser = { id: 1, name: 'Vlad Shvets', email: 'vlad@example.com' };
      axios.get.mockResolvedValue({ data: mockUser });

      const result = await getUser(1);

      expect(axios.get).toHaveBeenCalledWith('https://api.example.com/users/1');
      expect(result).toEqual(mockUser);
    });

    it('should throw an error on failed GET request', async () => {
      axios.get.mockRejectedValue(new Error('User not found'));

      await expect(getUser(999)).rejects.toThrow('User not found');
    });
  });

  describe('createUser', () => {
    it('should return created user on successful POST request', async () => {
      const newUser = { name: 'New User', email: 'new@example.com' };
      const mockResponse = { id: 2, ...newUser };
      axios.post.mockResolvedValue({ data: mockResponse });

      const result = await createUser(newUser);

      expect(axios.post).toHaveBeenCalledWith(
        'https://api.example.com/users',
        newUser
      );
      expect(result).toEqual(mockResponse);
    });

    it('should throw an error on failed POST request', async () => {
      axios.post.mockRejectedValue(new Error('Validation failed'));

      await expect(createUser({ name: '' })).rejects.toThrow('Validation failed');
    });
  });

  describe('deleteUser', () => {
    it('should return success message on successful DELETE request', async () => {
      axios.delete.mockResolvedValue({
        data: { message: 'User deleted successfully' },
      });

      const result = await deleteUser(1);

      expect(axios.delete).toHaveBeenCalledWith(
        'https://api.example.com/users/1'
      );
      expect(result).toEqual({ message: 'User deleted successfully' });
    });

    it('should throw an error on failed DELETE request', async () => {
      axios.delete.mockRejectedValue(new Error('Forbidden'));

      await expect(deleteUser(1)).rejects.toThrow('Forbidden');
    });
  });
});
