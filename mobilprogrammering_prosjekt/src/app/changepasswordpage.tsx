import { View, Text, TextInput, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { styles } from "@/styles/styles";

export default function ChangePasswordPage() {
  const [newPassword, setNewPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [confirmationMessage, setConfirmationMessage] = useState<string>("");

  const form = useForm({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      {
        if (!value.newPassword || !value.confirmPassword) {
          setConfirmationMessage("");
          setErrorMessage("Please fill in all password fields.");
          return;
        }

        if (value.newPassword !== value.confirmPassword) {
          setConfirmationMessage("");
          setErrorMessage("Password inputs do not match.");
          return;
        }
      }
      setErrorMessage("");
      setConfirmationMessage("Password changed successfully");
      setNewPassword(value.newPassword);
      return;
    }
  })

  useEffect(() => 
  {
    console.log("New password: ", newPassword);
  }, [newPassword]);

  return (
    <View style={styles.container}>
      <form.Field
        name="newPassword"
        children={(field) => (
          <View>
            <Text style={styles.mainText}>New Password:</Text>
            <TextInput
              style={styles.fieldInput}
              value={field.state.value}
              onChangeText={(value) => field.handleChange(value)}
              placeholder="Enter new password"
              secureTextEntry={true}
            />
          </View>
        )}
      />
      <form.Field
        name="confirmPassword"
        children={(field) => (
          <View>
            <Text style={styles.mainText}>Confirm Password:</Text>
            <TextInput
              style={styles.fieldInput}
              value={field.state.value}
              onChangeText={(value) => field.handleChange(value)}
              placeholder="Confirm new password"
              secureTextEntry={true}
            />
          </View>
        )}
      />
      <Pressable onPress={() => form.handleSubmit()}>
        <Text style={styles.fieldInput}>Change Password</Text>
      </Pressable>
      {errorMessage ? <Text style={{ color: "red", ...styles.mainText }}>{errorMessage}</Text> : null}
      {confirmationMessage ? <Text style={{ color: "green", ...styles.mainText }}>{confirmationMessage}</Text> : null}
    </View>
  );
}