import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { scoreService, HighScore } from "@/src/services/scoreService";
import { styles } from "./styles";

export default function RankingScreen() {

  const [scores, setScores] = useState<HighScore[]>([]);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const data = await scoreService.getHighScores();
      setScores(data);
    };

    load();
  }, []);

  const renderItem = ({ item, index }: { item: HighScore; index: number }) => {
    const position = index + 1;

    return (
      <View
        style={[
          styles.scoreItem,
          position === 1 && styles.firstPlace,
          position === 2 && styles.secondPlace,
          position === 3 && styles.thirdPlace,
        ]}
      >
        <Text style={styles.position}>#{position}</Text>
        <Text style={styles.score}>{item.score}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Ranking</Text>

      <FlatList
        data={scores}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.buttonText}>Voltar para Início</Text>
      </TouchableOpacity>
    </View>
  );
}
