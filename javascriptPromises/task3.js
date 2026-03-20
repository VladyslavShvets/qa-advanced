const TODO_URL = "https://jsonplaceholder.typicode.com/todos/1"
const USER_URL = "https://jsonplaceholder.typicode.com/users/1"

async function fetchJson(url) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json()
}

async function fetchTodoAsync() {
  return fetchJson(TODO_URL)
}

async function fetchUserAsync() {
  return fetchJson(USER_URL)
}

async function runAsyncExamples() {
  try {
    const todo = await fetchTodoAsync()
    console.log("Todo object:")
    console.log(todo)

    const user = await fetchUserAsync()
    console.log("User object:")
    console.log(user)

    const allResults = await Promise.all([fetchTodoAsync(), fetchUserAsync()])
    console.log("Promise.all with async/await:")
    console.log(allResults)

    const raceResult = await Promise.race([fetchTodoAsync(), fetchUserAsync()])
    console.log("Promise.race with async/await:")
    console.log(raceResult)
  } catch (error) {
    console.error("Task 3 error:", error.message)
  }
}

runAsyncExamples()

module.exports = {
  fetchTodoAsync,
  fetchUserAsync,
  runAsyncExamples,
}
