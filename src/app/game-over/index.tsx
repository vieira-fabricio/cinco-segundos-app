import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useEffect } from "react";

import { styles } from "../game-over/styles";
import { scoreService } from "@/src/services/scoreService";

export default function GameOverScreen() {
  const router = useRouter();
  const { score } = useLocalSearchParams<{ score?: string }>();

  useEffect(() => {
    const save = async () => {
      if (score) {
        await scoreService.saveScore(Number(score));
      }
    };

    save();
  }, []);

  const handleRestart = () => {
    router.replace("/game");
  };

  const handleGoHome = () => {
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fim de Jogo</Text>

      <Text style={styles.scoreLabel}>Seu Score</Text>
      <Text style={styles.scoreValue}>{score}</Text>

      {/* NOVA PARTIDA */}
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={handleRestart}
        activeOpacity={0.8}
      >
        <Text style={styles.secondaryButtonText}>Jogar Novamente</Text>
      </TouchableOpacity>

      {/* VOLTAR HOME */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleGoHome}>
          <Text style={styles.footerText}>Voltar ao Início</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}