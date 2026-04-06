const axios = require('axios');

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

function createRequestError(action, error) {
  const requestError = new Error(`${action} failed: ${error.message}`);
  requestError.cause = error;

  return requestError;
}

async function getUser(id, client = axios) {
  try {
    const response = await client.get(`${USERS_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw createRequestError(`Fetching user ${id}`, error);
  }
}

async function createUser(userData, client = axios) {
  try {
    const response = await client.post(USERS_URL, userData);
    return response.data;
  } catch (error) {
    throw createRequestError('Creating user', error);
  }
}

async function deleteUser(id, client = axios) {
  try {
    const response = await client.delete(`${USERS_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw createRequestError(`Deleting user ${id}`, error);
  }
}

module.exports = {
  USERS_URL,
  createUser,
  deleteUser,
  getUser,
};
