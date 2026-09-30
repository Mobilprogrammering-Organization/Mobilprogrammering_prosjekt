import { StyleSheet } from "react-native";
import { colors } from "./theme";

export const styles = StyleSheet.create({
  themeBackground: {
    backgroundColor: colors["brand-black"],
  },
  container: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
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
    marginRight: 20,
    textAlign: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  }
})