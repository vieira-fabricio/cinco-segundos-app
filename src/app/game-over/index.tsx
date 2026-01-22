import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

import { rewardedService } from "@/src/services/RewardedService";
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

  const handleContinueWithAd = () => {
    if (!rewardedService.isLoaded()) {
      return;
    }

    rewardedService.show(() => {
      router.replace("/game");
    });

    rewardedService.load();
  };

  const handleGoHome = () => {
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fim de Jogo</Text>

      <Text style={styles.scoreLabel}>Seu Score</Text>
      <Text style={styles.scoreValue}>{score}</Text>

      {/* CONTINUAR COM AD */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={handleContinueWithAd}
        activeOpacity={0.85}
      >
        <Text style={styles.primaryButtonText}>
          Continuar (Assistir Anúncio)
        </Text>
      </TouchableOpacity>

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