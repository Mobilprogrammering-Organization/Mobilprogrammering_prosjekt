import { View, Text, Pressable, Modal } from "react-native";
import { styles } from "@/styles/styles";
import { Link, router } from "expo-router";
import { useState } from "react";
import { useAuth } from "@/auth/context/AuthContext";

export default function DeleteAccountPage() {
  const { deleteUser } = useAuth();

  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = () => {
    deleteUser();
    setModalVisible(false);
    router.replace({
      pathname: "/loginpage",
    });
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: "red", ...styles.mainText }}>
        Are you sure you want to delete your account? This action cannot be
        undone.
      </Text>
      <Pressable
        onPress={() => setModalVisible(true)}
        style={styles.dangerButton}
      >
        <Text style={{ ...styles.mainText }}>Delete Account</Text>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              display: "flex",
              alignItems: "center",
              width: "75%",
              padding: 20,
              backgroundColor: "white",
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "red", ...styles.mainText }}>
              Are you sure you want to delete your account?
            </Text>
            <Pressable onPress={handleDelete} style={styles.dangerButton}>
              <Text style={{ ...styles.mainText }}>Delete</Text>
            </Pressable>
            <Pressable
              onPress={() => setModalVisible(false)}
              style={styles.button}
            >
              <Text style={{ ...styles.mainText }}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
