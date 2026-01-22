import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming
} from "react-native-reanimated";

import { rewardedService } from "@/src/services/RewardedService";
import { useGameLogic } from "../../hooks/useGameLogic";
import { styles } from "../game/styles";

export default function GameScreen() {
  const { score, 
          isGameOver, 
          revive, 
          answerQuestion, 
          currentQuestion, 
          timeLeft,
          startGame 
        } = useGameLogic();

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswering, setIsAnswering] = useState(false);
  const [showContinueOption, setShowContinueOption] = useState(false);

  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const router = useRouter();

  useEffect(() => {
    startGame();
  }, []);

  // Pré-carrega rewarded
  useEffect(() => {
    rewardedService.load();
  }, []);

  // Verifica se pode mostrar continuar
  useEffect(() => {
    if (isGameOver && rewardedService.isLoaded()) {
      setShowContinueOption(true);
    }
  }, [isGameOver]);

  const handleContinue = () => {
    rewardedService.show(() => {
      revive();
      rewardedService.load(); // pré-carrega o próximo
    });
  };

  const handleAnswer = (option: string) => {
    if (isAnswering) return;

    setIsAnswering(true);
    setSelectedAnswer(option);

    scale.value = withSequence(
      withTiming(1.05, { duration: 120 }),
      withTiming(1, { duration: 120 })
    );

    setTimeout(() => {
      answerQuestion(option);
      setSelectedAnswer(null);
      setIsAnswering(false);
    }, 400);
  };

  // GAME OVER
  useEffect(() => {
    if (isGameOver) {
      router.replace({
        pathname: "/game-over",
        params: { score: String(score) },
      });
    }
  }, [isGameOver]);

  if (!currentQuestion) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
    </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.timerText}>Tempo: {timeLeft}s</Text>

        <View style={styles.timerBarContainer}>
          <View
            style={[
              styles.timerBarFill,
              { width: `${(timeLeft / 5) * 100}%` },
            ]}
          />
        </View>
      </View>

      {/* QUESTION */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>
          {currentQuestion.question}
        </Text>

        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option) => {
            const isCorrect = option === currentQuestion.correctAnswer;
            const isSelected = option === selectedAnswer;

            return (
              <Animated.View
                key={option}
                style={[
                  animatedStyle,
                  isSelected &&
                    (isCorrect
                      ? styles.optionCorrect
                      : styles.optionWrong),
                ]}
              >
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    isSelected && styles.optionDisabled,
                  ]}
                  onPress={() => handleAnswer(option)}
                  disabled={isAnswering}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.scoreText}>Score: {score}</Text>
      </View>
    </View>
  );
}