import { useCallback, useEffect, useState } from "react";
import { questionService } from "../services/questionService";
import { Question } from "../types/Question";

const INITIAL_TIME = 5;
const QUESTIONS_PER_GAME = 50;
const BEST_SCORE_KEY = "@best_score";

export function useGameLogic() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  // Inicializa jogo
  const startGame = useCallback(() => {
    const selectedQuestions = questionService.getRandom(QUESTIONS_PER_GAME);
    setQuestions(selectedQuestions);
    setCurrentIndex(0);
    setCurrentQuestion(selectedQuestions[0]);
    setScore(0);
    setTimeLeft(INITIAL_TIME);
    setIsGameOver(false);
  }, []);

  // Reviver após Rewarded Ad
  const revive = () => {
    setIsGameOver(false);
    setTimeLeft(INITIAL_TIME);
  };

  // Timer
  useEffect(() => {
    if (isGameOver || !currentQuestion) return;

    if (timeLeft <= 0) {
      const timeout = setTimeout(() => {
        setIsGameOver(true);
      }, 600);

      return () => clearTimeout(timeout);
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, isGameOver, currentQuestion]);

  // Responder pergunta
  const answerQuestion = (answer: string) => {
    if (!currentQuestion) return;

    if (answer === currentQuestion.correctAnswer) {
      const nextIndex = currentIndex + 1;
      setScore((prev) => prev + 1);

      if (nextIndex < questions.length) {
        setCurrentIndex(nextIndex);
        setCurrentQuestion(questions[nextIndex]);
        setTimeLeft(INITIAL_TIME);
      } else {
        setIsGameOver(true);
      }
    } else {
      setIsGameOver(true);
    }
  };

  return {
    currentQuestion,
    timeLeft,
    score,
    isGameOver,
    startGame,
    answerQuestion,
    revive,
  };
}