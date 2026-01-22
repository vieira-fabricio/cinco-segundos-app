import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 42,
    fontWeight: "800",
    color: "#F8FAFC",
    marginBottom: 16,
  },

  scoreLabel: {
    fontSize: 16,
    color: "#CBD5E1",
  },

  scoreValue: {
    fontSize: 56,
    fontWeight: "bold",
    color: "#22C55E",
    marginVertical: 8,
  },

  primaryButton: {
    backgroundColor: "#38BDF8",
    width: "100%",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 24,
  },

  primaryButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#020617",
  },

  secondaryButton: {
    borderWidth: 1,
    borderColor: "#334155",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 12,
  },

  secondaryButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#E5E7EB",
  },

  footer: {
    marginTop: 32,
  },

  footerText: {
    fontSize: 13,
    color: "#94A3B8",
  },
});