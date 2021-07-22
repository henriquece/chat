module.exports = {
  rootDir: '../',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.svg$': 'jest-svg-transformer',
  },
  setupFiles: ["./config/jestSetEnvVars.js"],
  modulePathIgnorePatterns: ["cypress"],
}
