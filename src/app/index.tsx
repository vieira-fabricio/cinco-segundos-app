import { useRouter, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { styles } from '././styles';
import { scoreService } from "../services/scoreService";

export default function HomeScreen() {
  const router = useRouter();
  const [bestScore, setBestScore] = useState<number>(0);

  const loadBestScore = async () => {
    const score = await scoreService.getBestScore();
    setBestScore(score);
  };

  // Carrega quando a tela ganha foco
  useFocusEffect(
    React.useCallback(() => {
      loadBestScore();
    }, [])
  );

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