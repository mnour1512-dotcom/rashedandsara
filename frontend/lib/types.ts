export type Difficulty = "easy" | "medium" | "hard";

export type GameType =
  | "dragDrop"
  | "memory"
  | "arcadeCatch"
  | "wordPuzzle"
  | "decisionPath"
  | "fallback";

export interface Game {
  id: string;
  episodeId: string;
  type: GameType;
  title: string;
  prompt: string;
  difficulty: Difficulty;
  points: number;
  data: {
    draggableItems?: Array<{
      id: string;
      label: string;
      targetId: string;
    }>;
    targets?: Array<{
      id: string;
      label: string;
    }>;
    memoryCards?: Array<{
      id: string;
      label: string;
      pairKey: string;
    }>;
    catcher?: {
      playerLabel: string;
      goodItems: string[];
      badItems: string[];
      goal: number;
      duration: number;
    };
    puzzle?: {
      answer: string;
      scrambled: string[];
      hint: string;
    };
    decision?: {
      story: string;
      choices: Array<{
        id: string;
        label: string;
        outcome: string;
        correct: boolean;
      }>;
    };
    fallback?: {
      message: string;
    };
  };
  successMessage: string;
  retryMessage: string;
}

export interface Episode {
  id: string;
  order: number;
  number?: number;
  title: string;
  fullTitle: string;
  description: string;
  lesson: string;
  ageGroup: string;
  videoId: string;
  thumbnailUrl: string;
  image?: string;
  playLabel?: string;
  gamePath?: string;
  routePath?: string;
  tags: string[];
  events: string[];
  games: Game[];
}

export interface EpisodeSummary {
  id: string;
  order: number;
  number?: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  image?: string;
  playLabel?: string;
  gamePath?: string;
  routePath?: string;
  tags: string[];
  gamesCount: number;
  progress?: {
    completedGames: number;
    totalGames: number;
    score: number;
  };
}

export interface ProgressPayload {
  gameId: string;
  status: "correct" | "wrong";
  score: number;
  answer: Record<string, unknown>;
}

export interface EpisodeProgress {
  episodeId: string;
  completedGames: number;
  totalGames: number;
  score: number;
  maxScore: number;
  percentage: number;
  completed: boolean;
  answers: Array<{
    gameId: string;
    score: number;
    status: "correct" | "wrong";
    answer: Record<string, unknown>;
  }>;
}