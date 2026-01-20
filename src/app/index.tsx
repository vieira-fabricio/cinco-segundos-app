import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { styles } from '././styles';


const BEST_SCORE_KEY = "@best_score";

export default function HomeScreen() {
  const router = useRouter();
  const [bestScore, setBestScore] = useState<number>(0);

  useEffect(() => {
    const loadBestScore = async () => {
      try {
        const value = await AsyncStorage.getItem(BEST_SCORE_KEY);
        if (value !== null) {
          const parsed = Number(value);
          if(!Number.isNaN(parsed)) {
            setBestScore(parsed);
          }
        }
      } catch (error) {
        console.warn("Erro ao carregar best score");
      }
    };

    loadBestScore();
  }, []);

  const handleStartGame = useCallback(() => {
    router.push("/game");
  }, [router]);

  const handleOpenRanking = useCallback(() => {
    router.push("/ranking");
  }, [router]);

  const handleOpenSettings = useCallback(() => {
    router.push("/settings");
  }, [router]);

  return (
    <View style={styles.container}>
      {/* Título */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>5 SEGUNDOS</Text>
        <Text style={styles.subtitle}>PARA DECIDIR</Text>
      </View>

      {/* Melhor Score */}
      <View style={styles.scoreBox}>
        <Text style={styles.scoreLabel}>🏆 Melhor Pontuação</Text>
        <Text style={styles.scoreValue}>{bestScore}</Text>
      </View>

      {/* Botão Jogar */}
      <TouchableOpacity style={styles.playButton} onPress={handleStartGame}>
        <Text style={styles.playButtonText}>JOGAR AGORA</Text>
      </TouchableOpacity>

      {/* Rodapé */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleOpenRanking}>
          <Text style={styles.footerText}>Ranking</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleOpenSettings}>
          <Text style={styles.footerText}>Configurações</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}