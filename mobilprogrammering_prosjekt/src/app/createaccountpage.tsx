/*Claude chat som forklarer hvordan man navigerer mellom sider gjennom Pressable: https://claude.ai/share/b9bcfa63-8997-4e41-b591-bdabbbd7a6f0*/

import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { useForm } from "@tanstack/react-form";
import type { User } from "@/types/user";
import { useState } from "react";
import { useRouter } from "expo-router";
import { styles } from "@/styles/styles";
import { useCreateUser } from "@/api/user-api";

export default function CreateAccountPage() {
  //FEilsøking:
  console.log("CreateAccountPage lastet inn");
  const router = useRouter();
  const newUser = useCreateUser();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [confirmationMessage, setConfirmationMessage] = useState<string>("");

  const form = useForm({
    defaultValues: {
      id: (Math.floor(Math.random() * 1000000)).toString(),
      username: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      //Feilsøk
      console.log("onSubmit kjører", value);
      
      if (value.username.length < 3) {
        setErrorMessage("Username must be at least 3 characters long.");
        return;
      }
      if (value.password.length < 3) {
        setErrorMessage("Password must be at least 3 characters long.");
        return;
      }

      setErrorMessage("");

      try {
        await newUser.mutateAsync(value);
        setConfirmationMessage("Account created successfully.");
      } catch (error: unknown) {
      console.error('Oppretting feilet:', error);

    const message =
    error instanceof Error ? error.message : String(error);

    setErrorMessage(message);
}

/*    
      setErrorMessage("");
      console.log("User data: ", value);
      setConfirmationMessage("Account created successfully.");

      setTimeout(() => {
        router.replace({
        pathname: "/userpage",
        params: {
          id: value.id,
          username: value.username,
        }
      })}, 1000); */

    }
  });

  return (
    <View style={styles.container}>
      <form.Field
        name="username"
        children={(field) => (
          <>
            <Text style={styles.mainText}>Username:</Text>
            <TextInput
              style={styles.fieldInput}
              value={field.state.value}
              onChangeText={(value) => field.handleChange(value)}
              placeholder="Create a username"
            />
          </>
        )}
      />
      <form.Field
        name="email"
        children={(field) => (
          <>
            <Text style={styles.mainText}>Email:</Text>
            <TextInput
              style={styles.fieldInput}
              value={field.state.value}
              onChangeText={(value) => field.handleChange(value)}
              placeholder="Enter your email"
            />
          </>
        )}
      />
      <form.Field
        name="password"
        children={(field) => (
          <>
            <Text style={styles.mainText}>Password:</Text>
            <TextInput
              style={styles.fieldInput}
              value={field.state.value}
              onChangeText={(value) => field.handleChange(value)}
              placeholder="Create a password"
              secureTextEntry={true}
            />
          </> 
        )}
      />

      <Pressable
        disabled={newUser.isPending} 
        onPress={() => form.handleSubmit()}>
        <Text style={styles.button}>Create account</Text>
      </Pressable>

      {errorMessage ? <Text style={{ color: "red", ...styles.mainText }}>{errorMessage}</Text> : null}
      {confirmationMessage ? <Text style={{ color: "green", ...styles.mainText }}>{confirmationMessage}</Text> : null}
    </View>
  );
}

