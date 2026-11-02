import { setupServer } from "msw/node";
import { handlers } from "./handlers";

//Oppretter server for å mocke API-forespørsler basert på definerte handlers.
export const server = setupServer(...handlers);
