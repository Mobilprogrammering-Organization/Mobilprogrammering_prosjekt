import { server } from "./src/tests/integration/mocks/server";
import "./src/tests/integration/mocks/msw.polyfills";

// Etabler API-mocking før alle tester
beforeAll(() => {
  server.listen({
    onUnhandledRequest: "error", // Feil hvis vi har uhåndterte forespørsler
  });
});

// Nullstill handlers etter hver test
afterEach(() => {
  server.resetHandlers();
});

// Rydd opp etter alle tester
afterAll(() => {
  server.close();
});

// Mock console for å unngå støy i test-output
global.console = {
  ...console,
  // Behold error og warn for debugging
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
};
