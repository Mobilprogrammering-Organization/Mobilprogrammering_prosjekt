/*
VSG Agents prompt and chatlog:
I want to use Mock Service Workers to test calling my user api and checking if a login returns a user successfully. 
Give me a step by step overview over what i need to implement this.

1. Check the login function. auth.ts calls POST ${WEBAPP_BASE_URL}/auth/login. The base URL depends on Platform.OS (10.0.2.2 on Android, localhost otherwise). Under jest-expo the platform defaults to iOS, so the URL should be http://localhost:5173/api/v1/auth/login. Your handler has to match that exact URL.

2. Create the handlers (e.g. src/tests/mocks/handlers.ts). Use the same response envelope your code parses, { ok, data: { user }, code }. Open auth.ts to see the exact shape that ApiUserSchema expects.

import { http, HttpResponse } from "msw";

const BASE = "http://localhost:5173/api/v1";

export const handlers = [
  http.post(`${BASE}/auth/login`, async ({ request }) => {
    const { email, password } = (await request.json()) as any;
    if (email === "test@test.no" && password === "secret") {
      return HttpResponse.json({
        ok: true,
        data: { user: { id: "1", email } }, // match ApiUserSchema
      });
    }
    return HttpResponse.json(
      { ok: false, error: { message: "Invalid credentials" } },
      { status: 401 },
    );
  }),
];

3. Create the server (src/tests/mocks/server.ts).

import { setupServer } from "msw/node";
import { handlers } from "./handlers";
export const server = setupServer(...handlers);

4. Wire it into Jest. Create jest.setup.ts with the server lifecycle hooks:

import { server } from "./src/tests/mocks/server";
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

Then register it in the jest block of package.json:

"jest": { "preset": "jest-expo", "setupFilesAfterEnv": ["<rootDir>/jest.setup.ts"] }

Alternatively, call server.listen() directly at the top of the test file.

5. Make fetch and the TextEncoder available if needed. MSW 3 needs Node's global fetch, Response and TextEncoder. jest-expo sometimes replaces fetch with its own polyfill. If MSW doesn't intercept the request, add import "fast-text-encoding" to the setup file. If that doesn't fix it, set globalThis.fetch back to Node's built-in fetch. You can also try testEnvironment: "node" for API-only tests.

6. Write the test in UserApi.test.tsx.

import { login } from "@/api/auth";

test("login returns user", async () => {
  const result = await login("test@test.no", "secret");
  expect(result.user).toMatchObject({ id: "1", email: "test@test.no" });
});

test("login fails with bad credentials", async () => {
  await expect(login("x@x.no", "wrong")).rejects.toThrow();
});

To override a response for a single test, use server.use(http.post(..., () => HttpResponse.json(..., { status: 500 }))). resetHandlers() clears the override after each test.

7. Run it. npx jest UserApi. Your npm test script uses --watchAll, so use npx jest --ci for a single run.

Common pitfalls:

A URL mismatch fails with "unhandled request". Check the host and port, and that the path includes /api/v1.
Handler data that doesn't satisfy ApiUserSchema makes the zod parse fail.
MSW 3 uses http and HttpResponse. The old rest and res(ctx...) API is gone.
I can implement these steps in your repo if you want. Your existing UserApi.test.tsx may already have part of it done.
*/

//Det brukes MSW 2 nå fordi Babel ikke kan håndtere deler av funksjonalitet fra versjon 3.

import { http, HttpResponse } from "msw";
import { Platform } from "react-native";
import { ApiUser } from "@/api/auth";

const HOST = Platform.OS === "android" ? "10.0.2.2" : "localhost";
const WEBAPP_BASE_URL = `http://${HOST}:5173/api/v1`;

//Mocker result med data og result med error.
export const handlers = [
  http.post(`${WEBAPP_BASE_URL}/auth/login`, async ({ request }) => {
    const { email, password } = (await request.json()) as ApiUser;
    if (email === "test@test.com" && password === "password123") {
      return HttpResponse.json({
        ok: true,
        data: { user: { id: "1", email, password } },
        code: 200,
      });
    }
    return HttpResponse.json({
      ok: false,
      error: { code: 401, message: "Wrong email or password" },
    });
  }),
];
