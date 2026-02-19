import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "../game-over/styles";

type Props = {
  score: number;
};

export default function GameOverScreen() {
  const router = useRouter();
  const { score } = useLocalSearchParams<{ score?: string }>();

  const finalScore = Number(score ?? 0);

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