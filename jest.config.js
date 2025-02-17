module.exports = {
    preset: "ts-jest",
    testEnvironment: "node", // Use "jsdom" if testing frontend components
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // ✅ Ensures Jest loads setup
    transform: {
      "^.+\\.tsx?$": "ts-jest",
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  };
  