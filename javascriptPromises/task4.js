const TODO_URL = "https://jsonplaceholder.typicode.com/todos/1"
const USER_URL = "https://jsonplaceholder.typicode.com/users/1"

class TodoService {
  async getTodo() {
    const response = await fetch(TODO_URL)

    if (!response.ok) {
      throw new Error(`Todo request failed with status ${response.status}`)
    }

    return response.json()
  }
}

class UserService {
  async getUser() {
    const response = await fetch(USER_URL)

    if (!response.ok) {
      throw new Error(`User request failed with status ${response.status}`)
    }

    return response.json()
  }
}

async function runClassBasedExample() {
  const todoService = new TodoService()
  const userService = new UserService()

  try {
    const [todo, user] = await Promise.all([
      todoService.getTodo(),
      userService.getUser(),
    ])

    console.log("Class-based Promise.all result:")
    console.log({ todo, user })

    const fastestResult = await Promise.race([
      todoService.getTodo(),
      userService.getUser(),
    ])

    console.log("Class-based Promise.race result:")
    console.log(fastestResult)
  } catch (error) {
    console.error("Task 4 error:", error.message)
  }
}

runClassBasedExample()

module.exports = {
  TodoService,
  UserService,
  runClassBasedExample,
}
