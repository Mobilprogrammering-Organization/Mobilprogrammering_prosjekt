import { useMutation, useQueryClient } from "@tanstack/react-query"
import { router } from "expo-router"


export type User = {
    id: string
    email?: string
    username: string
    password: string
}

const WEBAPP_BASE_URL = "http://10.44.35.170:5173/"

export function useCreateUser () {
    const queryClient = useQueryClient();
    const CREATE_USER_URL = `${WEBAPP_BASE_URL}api/v1/users`;

    return useMutation({
        mutationFn: async (value: User) => {
            // Feilsøk
            console.log('mutationFn kjører', value);
            console.log("Sender til: ", CREATE_USER_URL);

            const response = await fetch(CREATE_USER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(value),
            });

            const body = await response.json();

console.log("Svar fra serveren:", body); // Ikke logg passordfeltet
return body;

            //Feilsøking:
/*             console.log('HTTP-status:', response.status);
            console.log('OK:', response.ok); 
            console.log('Response-object: ', response);
            console.log('Response-object JSON: ', JSON.stringify(response)); */
/* 
            const responseText = await response.text();
            console.log('API-svar:', responseText);
 */            

/*             if (!response.ok) {
                throw new Error('Kunne ikke opprette bruker');
            }

            return response.json(); */
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