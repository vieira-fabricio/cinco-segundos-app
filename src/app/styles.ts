import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  titleContainer: {
  alignItems: "center",
  marginBottom: 24,
  marginTop: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: "#F8FAFC",
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 20,
    color: "#38BDF8",
    marginBottom: 32,
  },
  scoreBox: {
    alignItems: "center",
    marginVertical: 24,
  },
  scoreLabel: {
    color: "#CBD5E1",
    fontSize: 16,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#22C55E",
  },
  playButton: {
    backgroundColor: "#22C55E",
    width: "100%",
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 24,
  },
  playButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#020617",
  },
  footer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 32,
  },
  footerText: {
    color: "#E2E8F0",
    fontSize: 14,
  },
});