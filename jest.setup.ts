// ✅ Extends Jest's matchers for better assertions in tests
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";

// ✅ Mock global functions if needed (example: console.error suppression)
global.console = {
  ...console,
  error: jest.fn(), // Suppress console errors in tests
};

// ✅ Add any other global mocks or configurations required for your tests

// Example: Mock fetch API (useful if your tests make network requests)
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
) as jest.Mock;

