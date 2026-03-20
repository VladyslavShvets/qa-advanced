function printTextAfterDelay(text, delayMs) {
  return new Promise((resolve, reject) => {
    if (typeof text !== "string" || text.trim() === "") {
      reject(new TypeError("Text must be a non-empty string"))
      return
    }

    if (!Number.isInteger(delayMs) || delayMs < 0) {
      reject(new TypeError("Delay must be a non-negative integer"))
      return
    }

    setTimeout(() => {
      console.log(text)
      resolve(text)
    }, delayMs)
  })
}

printTextAfterDelay("This text appears after 2000 ms", 2000).catch((error) => {
  console.error("Task 1 error:", error.message)
})

module.exports = printTextAfterDelay
