import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { interstitialService } from "@/src/services/interstitialService";

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
          startGame,
          isFinalGameOver
        } = useGameLogic();

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswering, setIsAnswering] = useState(false);
  const [showContinueOption, setShowContinueOption] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);


  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const router = useRouter();

  useEffect(() => {
    startGame();
  }, [startGame]);

  // Pré-carrega rewarded
  useEffect(() => {
    rewardedService.load();
    interstitialService.load();
  }, []);

  useEffect(() => {
    return () => {
      setSelectedAnswer(null);
      setIsAnswering(false);
    };
  }, []);

  const handleContinue = () => {
    if (!rewardedService.isLoaded()) {
      console.log("Reward ainda não carregado");
      rewardedService.load();
      return;
    }
    
    rewardedService.show(() => {
      revive();
      rewardedService.load(); // pré-carrega o próximo
    });
  };

  const handleAnswer = (option: string) => {
    if (isAnswering || isGameOver) return;

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

  const finalizeGame = () => {
    if (isFinishing) return;

    setIsFinishing(true);

    interstitialService.show(() => {
      router.replace({
        pathname: "/game-over",
        params: { score: String(score) },
      });
    });
  };

  // GAME OVER
  useEffect(() => {
    if (!isFinalGameOver) return;
    finalizeGame();
  }, [isFinalGameOver, score]);

  //CONTINUAR
  useEffect(() => {
    if (!isGameOver && isFinalGameOver) {
      setShowContinueOption(false);
      return;
    }

    rewardedService.load();

    const checkLoaded = () => {
      if (rewardedService.isLoaded()) {
        setShowContinueOption(true);
      }
    };

    checkLoaded(); // checa imediatamente

    const interval = setInterval(checkLoaded, 500);

    return () => clearInterval(interval);
  }, [isGameOver, isFinalGameOver]);

  if (!currentQuestion) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
    </View>
    )
  }

  return (
    <View style={styles.container}>
      {isGameOver && !isFinalGameOver ? (

      <View>
        <Text style={styles.scoreText}>Score: {score}</Text>

        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={handleContinue}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryButtonText}>
            Continuar assistindo anúncio
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={finalizeGame}>
          <Text style={styles.title}>Finalizar jogo</Text>
        </TouchableOpacity>
      </View>

      ) : (

        <>
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
              {currentQuestion.options.map((option, index) => {
              const isCorrect = option === currentQuestion.correctAnswer;
              const isSelected = option === selectedAnswer;

              return (
                <Animated.View
                  key={`${currentQuestion.id}-${index}`}
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
        </>
      )}
    </View>
  );
}