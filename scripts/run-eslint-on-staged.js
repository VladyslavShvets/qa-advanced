const { execSync, spawnSync } = require("node:child_process")
const path = require("node:path")

const stagedFiles = execSync(
  "git diff --cached --name-only --diff-filter=ACMR",
  {
    encoding: "utf8",
  }
)
  .split("\n")
  .map((filePath) => filePath.trim())
  .filter((filePath) => filePath.endsWith(".js"))

if (stagedFiles.length === 0) {
  console.log("No staged JavaScript files to lint.")
  process.exit(0)
}

const eslintBinPath = path.join(
  __dirname,
  "..",
  "node_modules",
  "eslint",
  "bin",
  "eslint.js"
)

const result = spawnSync(process.execPath, [eslintBinPath, ...stagedFiles], {
  stdio: "inherit",
})

if (result.error) {
  console.error("Failed to run ESLint on staged files:", result.error.message)
  process.exit(1)
}

process.exit(result.status ?? 1)
