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
    setCurrentQuestion(selectedQuestions[0] ?? null);
    setScore(0);
    setTimeLeft(INITIAL_TIME);
    setIsGameOver(false);
    setIsFinalGameOver(false);
  }, []);

  //Controle de falha
  const failGame = useCallback(() => {
    setIsGameOver(prev => (prev ? prev : true));
  }, []);

  // Reviver após Rewarded Ad
  const revive = useCallback(() => {
    if (isFinalGameOver) return;

    setIsGameOver(false);

    // força novo ciclo de render
    setTimeout(() => {
      setTimeLeft(INITIAL_TIME);
    }, 0);
  }, [isFinalGameOver]);

  // Timer
  useEffect(() => {
    if (isGameOver || isFinalGameOver || !currentQuestion) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          failGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

      return () => clearInterval(interval);
  }, [isGameOver, isFinalGameOver, currentQuestion, failGame]);

  // Responder pergunta
  const answerQuestion = useCallback(
    (answer: string) => {
      if (!currentQuestion || isGameOver) return;

      if (answer !== currentQuestion.correctAnswer) {
        failGame();
        return;
      }

      setScore(prev => prev + 1);

      setCurrentIndex(prevIndex => {

      const nextIndex = prevIndex + 1;

      if (nextIndex >= questions.length) {
        console.log("FINAL GAME OVER DISPARADO");
        setIsGameOver(true);
        setIsFinalGameOver(true);
        return prevIndex;
      }

      setCurrentQuestion(questions[nextIndex]);
      setTimeLeft(INITIAL_TIME);

      return nextIndex;
    });

    },
    [currentQuestion, isGameOver, questions, failGame, currentIndex]
  );

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