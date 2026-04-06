const axios = require('axios');

/**
 * Task 3: Mocking Axios in Jest
 * Functions that make HTTP requests — to be fully mocked in tests.
 */

async function getUser(id) {
  const response = await axios.get(`https://api.example.com/users/${id}`);
  return response.data;
}

async function createUser(userData) {
  const response = await axios.post('https://api.example.com/users', userData);
  return response.data;
}

async function deleteUser(id) {
  const response = await axios.delete(`https://api.example.com/users/${id}`);
  return response.data;
}

module.exports = { getUser, createUser, deleteUser };
