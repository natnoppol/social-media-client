module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.js$": "babel-jest", // Ensure Babel is set up correctly for transforming JavaScript
  },
  setupFiles: ["./jest.setup.js"], // Path to setup file
  moduleFileExtensions: ["js", "mjs", "cjs", "jsx", "json", "node"],
};
