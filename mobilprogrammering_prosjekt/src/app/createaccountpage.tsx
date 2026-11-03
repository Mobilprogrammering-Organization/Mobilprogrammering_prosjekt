/*Claude chat som forklarer hvordan man navigerer mellom sider gjennom Pressable: 
/*https://claude.ai/share/b9bcfa63-8997-4e41-b591-bdabbbd7a6f0*/

import { View, Text, TextInput, Pressable } from "react-native";
import { useForm } from "@tanstack/react-form";
import type { User } from "@/types/user";
import { useState } from "react";
import { Link, router, useRouter } from "expo-router";
import { styles } from "@/styles/styles";
import { useAuth } from "@/auth/context/AuthContext";
import { isValidEmailFormat } from "@/shared/utils/validation";

export default function CreateAccountPage() {
  const { createUser } = useAuth();

  const [isPending, setIsPending] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [confirmationMessage, setConfirmationMessage] = useState<string>("");

  const form = useForm({
    defaultValues: {
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

      if (value.password.length < 3) {
        setErrorMessage("Password must be at least 3 characters long.");
        return;
      }

      if (!isValidEmailFormat(value.email) && value.email.length < 3) {
        setErrorMessage("Please enter a valid email.");
        return;
      }

      setErrorMessage("");

      try {
        setIsPending(true);
        await createUser(value.email, value.password);
        setConfirmationMessage("Account created successfully.");
        setIsPending(false);
        router.replace("/(tabs)/users");
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);

        setIsPending(false);
        setErrorMessage(message);
      }
    },
  });

  return (
    <View style={styles.container}>
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

      <Pressable disabled={false} onPress={() => form.handleSubmit()}>
        <Text style={[styles.button, isPending && styles.pendingButton]}>{isPending ? "Creating..." : "Create account"}</Text>
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
        Already have an account?{"\n"}
        <Link href="/loginpage" replace style={{ color: "blue" }}>
          Go to login page
        </Link>
      </Text>
    </View>
  );
}
