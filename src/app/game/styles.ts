import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 24,
    justifyContent: "space-between",
  },

  /* ===== HEADER / TIMER ===== */
  header: {
    marginBottom: 16,
  },

  timerText: {
    color: "#F8FAFC",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "right",
    marginBottom: 6,
  },

  timerBarContainer: {
    height: 8,
    width: "100%",
    backgroundColor: "#1E293B",
    borderRadius: 8,
    overflow: "hidden",
  },

  timerBarFill: {
    height: "100%",
    backgroundColor: "#38BDF8",
    borderRadius: 8,
  },

  /* ===== QUESTION ===== */
  questionContainer: {
    flex: 1,
    justifyContent: "center",
  },

  questionText: {
    color: "#F8FAFC",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 30,
    marginBottom: 32,
  },

  /* ===== OPTIONS ===== */
  optionsContainer: {
    gap: 12,
  },

  optionButton: {
    backgroundColor: "#1E293B",
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#334155",
  },

  optionText: {
    color: "#E5E7EB",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },

  /* ===== BUTTONS ============= */
  continueButton: {
    marginTop: 24,
    paddingVertical: 14,
    paddingHorizontal: 24,
    backgroundColor: "#2ECC71", // verde CTA (ação positiva)
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4, // sombra Android
  },

  continueText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 0.3,
  },

  /* ===== FEEDBACK STATES ===== */
  optionCorrect: {
    backgroundColor: "#22C55E",
    borderColor: "#22C55E",
  },

  optionWrong: {
    backgroundColor: "#EF4444",
    borderColor: "#EF4444",
  },

  optionDisabled: {
    opacity: 0.6,
  },

  /* ===== FOOTER ===== */
  footer: {
    alignItems: "center",
    marginTop: 16,
  },

  scoreText: {
    color: "#CBD5E1",
    fontSize: 14,
    fontWeight: "500",
  },
});