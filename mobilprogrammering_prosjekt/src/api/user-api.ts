import { useMutation, useQueryClient } from "@tanstack/react-query"
import { router } from "expo-router"
import { Platform } from "react-native"


export type User = {
    id: string
    email?: string
    username: string
    password: string
}


//Følger oppsett fraundervisning:
const HOST = Platform.OS === "android" ? "10.0.2.2" : "localhost";
const WEBAPP_BASE_URL = `http://${HOST}:5173/`

export function useCreateUser () {
    const queryClient = useQueryClient();
    const CREATE_USER_URL = `${WEBAPP_BASE_URL}api/v1/users`;

    return useMutation({
        mutationFn: async (value: User) => {

            const response = await fetch(CREATE_USER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(value),
            });


            if (!response.ok) {
                throw new Error('Could not create user');
            }

            return response.json();
        },
        onSuccess: (response) => {
            router.replace({
                pathname: "/userpage",
                params: {
                    id: response.data.id,
                    username: response.data.username,
            }
            });
        }
    })
}