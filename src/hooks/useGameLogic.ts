import { useCallback, useEffect, useState } from "react";
import { questionService } from "../services/questionService";
import { Question } from "../types/Question";

const INITIAL_TIME = 5;
const QUESTIONS_PER_GAME = 50;

export function useGameLogic() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [score, setScore] = useState(0);
  
  const [isGameOver, setIsGameOver] = useState(false);
  const [isFinalGameOver, setIsFinalGameOver] = useState(false);

  // Inicializa jogo
  const startGame = useCallback(() => {
    const selectedQuestions = questionService.getRandom(QUESTIONS_PER_GAME);
    setQuestions(selectedQuestions);
    setCurrentIndex(0);
    setCurrentQuestion(selectedQuestions[0]);
    setScore(0);
    setTimeLeft(INITIAL_TIME);
    setIsGameOver(false);
    setIsFinalGameOver(false);
  }, []);

  // Reviver após Rewarded Ad
  const revive = () => {
    if (!currentQuestion) return;

    setIsGameOver(false);
    setTimeLeft(INITIAL_TIME);
  };

  const failGame = () => {
    setIsGameOver(true);
  };

  // Timer
  useEffect(() => {
    if (isGameOver || isFinalGameOver || !currentQuestion) return;

    if (timeLeft <= 0) {
      const timeout = setTimeout(() => {
        failGame();
      }, 600);

      return () => clearTimeout(timeout);
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, isGameOver, isFinalGameOver, currentQuestion]);

  // Responder pergunta
  const answerQuestion = (answer: string) => {
    if (!currentQuestion || isGameOver) return;

    if (answer === currentQuestion.correctAnswer) {
      const nextIndex = currentIndex + 1;
      setScore((prev) => prev + 1);

      if (nextIndex < questions.length) {
        setCurrentIndex(nextIndex);
        setCurrentQuestion(questions[nextIndex]);
        setTimeLeft(INITIAL_TIME);
      } else {
        setIsGameOver(true);
        setIsFinalGameOver(true); // terminou as perguntas
      }
    } else {
      failGame();
    }
  };

  return {
    currentQuestion,
    timeLeft,
    score,
    isGameOver,
    isFinalGameOver,
    startGame,
    answerQuestion,
    revive,
  };
}