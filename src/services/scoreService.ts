import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@quiz_high_scores';

export interface HighScore {
  score: number;
  date: string;
}

class ScoreService {

  async getBestScore(): Promise<number> {
    const scores = await this.getHighScores();
    return scores.length > 0 ? scores[0].score : 0;
  }

  async getHighScores(): Promise<HighScore[]> {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  async saveScore(newScore: number): Promise<void> {
    const scores = await this.getHighScores();

    const updatedScores: HighScore[] = [
      ...scores,
      {
        score: newScore,
        date: new Date().toISOString(),
      },
    ];

    // Ordena do maior para o menor
    updatedScores.sort((a, b) => b.score - a.score);

    // Mantém apenas Top 10
    const top10 = updatedScores.slice(0, 10);

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(top10));
  }

  async clearScores(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEY);
  }
}

export const scoreService = new ScoreService();
