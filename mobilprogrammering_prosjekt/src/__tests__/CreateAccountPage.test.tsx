import CreateAccountPage from "@/app/createaccountpage"
import { QueryClientProvider } from "@/context/QueryProvider";
import { User } from "@/types/user";
import { QueryClient } from "@tanstack/react-query";
import { cleanup, render, screen, userEvent, waitFor } from "@testing-library/react-native"
import { router, useRouter } from "expo-router";


    jest.mock("expo-router", () => {
        const actual = jest.requireActual("expo-router");

        return {
            ...actual,
            router: {
                ...actual.router,
                replace: jest.fn(),
                },
            };
        });



    const mockReplace = router.replace as jest.Mock;

    //Egen testQueryClient
    const testQueryClient = new QueryClient({
    defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
  },
});
        

describe("Create new account", () => {

    //Arrange
    const initialUserTable: User[] = [
        {
            id: "1",
            email: "test1@test.com",
            username: "test1",
            password: "test1"
        }, 
        {
            id: "2",
            email: "test2@test.com",
            username: "test2",
            password: "test2"
        }, 
        {
            id: "3",
            email: "test3@test.com",
            username: "test3",
            password: "test3"
        }
    ]

    let testUserTable = [];

    function resetUserTable() {
        testUserTable = [...initialUserTable];
    }

    const mockRegister = jest.fn();
    const user = userEvent.setup();


    beforeEach(() => {
        resetUserTable();
        jest.clearAllMocks();
    
        //Setter opp slik at vi mocker responsen fra fetch-kallet
        globalThis.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => ({
                data: {
                    id: "740516",
                    username: "Test4",
                    email: "test4@test.com",
                    password: "Test4",
                    },
                }),
        }) as jest.Mock;
    });

    afterEach(() => {
        resetUserTable();
        cleanup();
        testQueryClient.clear();
    })

    test("Create page renders", async () => {
        await render(
        <QueryClientProvider client={testQueryClient}>
            <CreateAccountPage />
        </QueryClientProvider>
        );

        expect(screen.getByPlaceholderText('Create a username')).toBeOnTheScreen();
        expect(screen.getByPlaceholderText('Enter your email')).toBeOnTheScreen();
        expect(screen.getByPlaceholderText('Create a password')).toBeOnTheScreen();
    })

    test("Page redirects after successfully creating a new user", async () => {
        await render(
        <QueryClientProvider client={testQueryClient}>
            <CreateAccountPage />
        </QueryClientProvider>);

        const usernameInput = screen.getByPlaceholderText("Create a username");
        const emailInput = screen.getByPlaceholderText("Enter your email");
        const passwordInput = screen.getByPlaceholderText("Create a password");
        const submitBtn = screen.getByText("Create account");

        await user.type(usernameInput, "Test4");
        await user.type(emailInput, "test4@test.com");
        await user.type(passwordInput, "Test4");
        await user.press(submitBtn);

        await waitFor(() => {
            expect(mockReplace).toHaveBeenCalledWith({
                pathname: "/userpage",
                params: {
                id: "740516",
                username: "Test4",
                },
            }); 
        });

    })
})