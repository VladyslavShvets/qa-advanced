const TODO_URL = "https://jsonplaceholder.typicode.com/todos/1"
const USER_URL = "https://jsonplaceholder.typicode.com/users/1"

function fetchJson(url) {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }

    return response.json()
  })
}

function fetchTodo() {
  return fetchJson(TODO_URL)
}

function fetchUser() {
  return fetchJson(USER_URL)
}

const todoPromise = fetchTodo()
const userPromise = fetchUser()

todoPromise
  .then((todo) => {
    console.log("Todo object:")
    console.log(todo)
  })
  .catch((error) => {
    console.error("Todo request error:", error.message)
  })

userPromise
  .then((user) => {
    console.log("User object:")
    console.log(user)
  })
  .catch((error) => {
    console.error("User request error:", error.message)
  })

const allResultsPromise = Promise.all([todoPromise, userPromise])
const raceResultPromise = Promise.race([todoPromise, userPromise])

allResultsPromise
  .then(([todo, user]) => {
    console.log("Promise.all result:")
    console.log({ todo, user })
  })
  .catch((error) => {
    console.error("Promise.all error:", error.message)
  })

raceResultPromise
  .then((result) => {
    console.log("Promise.race result:")
    console.log(result)
  })
  .catch((error) => {
    console.error("Promise.race error:", error.message)
  })

module.exports = {
  fetchTodo,
  fetchUser,
  allResultsPromise,
  raceResultPromise,
}
