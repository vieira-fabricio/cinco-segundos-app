import { Question } from "../types/Question";
import questionsData from "../../assets/questions_300.json";

class QuestionService {
  private questions: Question[] = [];

  constructor() {
    this.questions = questionsData as Question[];
  }

  getAll(): Question[] {
    return [...this.questions];
  }

  getRandom(amount: number): Question[] {
    const shuffled = [...this.questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, amount);
  }
}

export const questionService = new QuestionService();