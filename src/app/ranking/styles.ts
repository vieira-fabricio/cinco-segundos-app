import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
    justifyContent: "space-between",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 20,
  },

  listContainer: {
    paddingBottom: 20,
  },

  scoreItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#1E1E1E",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },

  position: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  score: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  firstPlace: {
    backgroundColor: "#FFD700",
  },

  secondPlace: {
    backgroundColor: "#C0C0C0",
  },

  thirdPlace: {
    backgroundColor: "#CD7F32",
  },

  button: {
    backgroundColor: "#00FF99",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#121212",
  },
});
