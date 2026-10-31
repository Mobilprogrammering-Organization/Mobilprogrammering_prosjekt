/*Claude chat som forklarer hvordan man navigerer mellom sider gjennom Pressable: 
/*https://claude.ai/share/b9bcfa63-8997-4e41-b591-bdabbbd7a6f0*/

import { View, Text, TextInput, Pressable } from "react-native";
import { Link } from "expo-router";
import { useForm } from "@tanstack/react-form";
import type { User } from "@/types/user";
import { useState } from "react";
import { useRouter } from "expo-router";
import { styles } from "@/styles/styles";
import { login } from "@/api/user-api";
import { isValidEmailFormat } from "@/utils/validation";

export default function LoginPage() {
  const loginUser = login();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [confirmationMessage, setConfirmationMessage] = useState<string>("");

  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      if (
        value.email.trim().length === 0 &&
        value.password.trim().length === 0
      ) {
        setErrorMessage("Email and password are required.");
        return;
      }

      if (value.email.trim().length === 0) {
        setErrorMessage("Email is required.");
        return;
      }

      if (value.password.trim().length === 0) {
        setErrorMessage("Password is required.");
        return;
      }

      setErrorMessage("");

      try {
        await loginUser.mutateAsync(value);
        setConfirmationMessage("Login successful.");
      } catch (error: unknown) {
        console.error("Login failed:", error);

        const message = error instanceof Error ? error.message : String(error);

        setErrorMessage(message);
      }
    },
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
        //disabled={loginUser.isPending}
        onPress={() => form.handleSubmit()}
      >
        <Text style={styles.button}>Login</Text>
      </Pressable>

      {errorMessage ? (
        <Text style={{ color: "red", ...styles.mainText }}>{errorMessage}</Text>
      ) : null}
      {confirmationMessage ? (
        <Text style={{ color: "green", ...styles.mainText }}>
          {confirmationMessage}
        </Text>
      ) : null}

      <Text style={styles.mainText}>
        Don't have an account?{" "}
        <Link href="/createaccountpage" replace style={{ color: "blue" }}>
          Register here
        </Link>
      </Text>
    </View>
  );
}
