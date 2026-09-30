import { StyleSheet } from "react-native";
import { colors } from "./theme";

export const styles = StyleSheet.create({ 
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 50,
  },
  paragraphText: {
    fontWeight: "normal",
    fontSize: 16,
    margin: 10,
    textAlign: "center",
  },
  mainText: {
     fontWeight: "bold",
     fontSize: 30,
     margin: 10,
     textAlign: "center",
  },
  fieldInput: {
    fontWeight: "bold",
    fontSize: 30,
    borderStyle: "solid",
    borderColor: colors["brand-black"],
    borderWidth: 3,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    width: "80%",
    textAlign: "center",
  },
  button: {
    fontWeight: "bold",
    fontSize: 30,
    borderStyle: "solid",
    borderColor: colors["brand-black"],
    backgroundColor: colors["brand-cyan"],
    borderWidth: 3,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    width: "80%",
    textAlign: "center",
  },
  headerButton: {
    fontWeight: "bold",
    borderStyle: "solid",
    borderColor: colors["brand-black"],
    backgroundColor: colors["brand-cyan"],
    borderWidth: 3,
    borderRadius: 10,
    padding: 10,
    margin: 5,
    textAlign: "center",
  }
})