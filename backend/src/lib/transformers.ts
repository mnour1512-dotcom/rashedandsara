import type { Episode, EpisodeProgress, Game, GameAnswer } from "@prisma/client";

const playNowLabel = "\u0627\u0644\u0639\u0628 \u0627\u0644\u0622\u0646";

function safeJsonParse<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function routePathForEpisode(id: string) {
  return `/episodes/${id}`;
}

export function parseEpisode(episode: Episode & { games: Game[] }) {
  const routePath = routePathForEpisode(episode.id);

  return {
    id: episode.id,
    order: episode.order,
    number: episode.order,
    title: episode.title,
    fullTitle: episode.fullTitle,
    description: episode.description,
    lesson: episode.lesson,
    ageGroup: episode.ageGroup,
    videoId: episode.videoId,
    thumbnailUrl: episode.thumbnailUrl,
    image: episode.thumbnailUrl,
    playLabel: playNowLabel,
    gamePath: routePath,
    routePath,
    tags: safeJsonParse<string[]>(episode.tags, []),
    events: safeJsonParse<string[]>(episode.events, []),
    games: episode.games.map((game) => ({
      id: game.id,
      episodeId: game.episodeId,
      type: game.type,
      title: game.title,
      prompt: game.prompt,
      difficulty: game.difficulty,
      points: game.points,
      data: safeJsonParse<Record<string, unknown>>(game.data, {}),
      successMessage: game.successMessage,
      retryMessage: game.retryMessage
    }))
  };
}

export function summarizeEpisode(
  episode: Episode & { games: Game[] },
  progress?: EpisodeProgress & { answers: GameAnswer[] }
) {
  const routePath = routePathForEpisode(episode.id);

  return {
    id: episode.id,
    order: episode.order,
    number: episode.order,
    title: episode.title,
    description: episode.description,
    thumbnailUrl: episode.thumbnailUrl,
    image: episode.thumbnailUrl,
    playLabel: playNowLabel,
    gamePath: routePath,
    routePath,
    tags: safeJsonParse<string[]>(episode.tags, []),
    gamesCount: episode.games.length,
    progress: progress
      ? {
          completedGames: progress.completedGames,
          totalGames: progress.totalGames,
          score: progress.score
        }
      : {
          completedGames: 0,
          totalGames: episode.games.length,
          score: 0
        }
  };
}

export function progressPayload(progress: EpisodeProgress & { answers: GameAnswer[] }) {
  return {
    episodeId: progress.episodeId,
    completedGames: progress.completedGames,
    totalGames: progress.totalGames,
    score: progress.score,
    maxScore: progress.maxScore,
    percentage: progress.percentage,
    completed: progress.completed,
    answers: progress.answers.map((answer) => ({
      gameId: answer.gameId,
      score: answer.score,
      status: answer.status,
      answer: safeJsonParse<Record<string, unknown>>(answer.answer, {})
    }))
  };
}