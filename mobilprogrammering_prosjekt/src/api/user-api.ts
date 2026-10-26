import { useMutation, useQueryClient } from "@tanstack/react-query"
import { router } from "expo-router"


export type User = {
    id: string
    username: string
    password: string
}

const WEBAPP_BASE_URL = "http://localhost:5173/"

export function useCreateUser () {
    const queryClient = useQueryClient();
    const CREATE_USER = "api/v1/users"

    return useMutation({
        mutationFn: async (value: User) => {
            const response = await fetch(`${WEBAPP_BASE_URL}${CREATE_USER}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({value}),
            });

            if (!response.ok) {
                throw new Error('Kunne ikke opprette bruker');
            }

            return response.json();
        },
        onSuccess: (value) => {
            router.replace({
                pathname: "/userpage",
                params: {
                id: value.id,
                username: value.username,
            }
            });
        }
    })
}