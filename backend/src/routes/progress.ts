import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { progressPayload } from "../lib/transformers";

export const progressRouter = Router();

const answerSchema = z.object({
  gameId: z.string(),
  score: z.number().min(0),
  status: z.enum(["correct", "wrong"]),
  answer: z.record(z.string(), z.unknown())
});

progressRouter.get("/:userId/episodes/:episodeId", async (request, response) => {
  try {
    const { userId, episodeId } = request.params;
    const episode = await prisma.episode.findUnique({
      where: { id: episodeId },
      include: { games: true }
    });

    if (!episode) {
      response.status(404).json({ message: "الحلقة غير موجودة" });
      return;
    }

    const progress = await prisma.episodeProgress.findUnique({
      where: {
        userId_episodeId: {
          userId,
          episodeId
        }
      },
      include: {
        answers: true
      }
    });

    if (!progress) {
      response.json({
        episodeId,
        completedGames: 0,
        totalGames: episode.games.length,
        score: 0,
        maxScore: episode.games.reduce((sum, game) => sum + game.points, 0),
        percentage: 0,
        completed: false,
        answers: []
      });
      return;
    }

    response.json(progressPayload(progress));
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "تعذر تحميل التقدم" });
  }
});

progressRouter.post("/:userId/episodes/:episodeId/answers", async (request, response) => {
  try {
    const parsed = answerSchema.safeParse(request.body);
    if (!parsed.success) {
      response.status(400).json({ message: "بيانات غير صالحة" });
      return;
    }

    const { userId, episodeId } = request.params;
    const episode = await prisma.episode.findUnique({
      where: { id: episodeId },
      include: { games: true }
    });

    if (!episode) {
      response.status(404).json({ message: "الحلقة غير موجودة" });
      return;
    }

    await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        name: userId === "guest-user" ? "مستخدم ضيف" : undefined
      }
    });

    const maxScore = episode.games.reduce((sum, game) => sum + game.points, 0);
    const progress =
      (await prisma.episodeProgress.findUnique({
        where: {
          userId_episodeId: {
            userId,
            episodeId
          }
        },
        include: {
          answers: true
        }
      })) ||
      (await prisma.episodeProgress.create({
        data: {
          id: `${userId}-${episodeId}`,
          userId,
          episodeId,
          totalGames: episode.games.length,
          maxScore
        },
        include: {
          answers: true
        }
      }));

    await prisma.gameAnswer.upsert({
      where: {
        progressId_gameId: {
          progressId: progress.id,
          gameId: parsed.data.gameId
        }
      },
      update: {
        score: parsed.data.score,
        status: parsed.data.status,
        answer: JSON.stringify(parsed.data.answer)
      },
      create: {
        id: `${progress.id}-${parsed.data.gameId}`,
        progressId: progress.id,
        gameId: parsed.data.gameId,
        score: parsed.data.score,
        status: parsed.data.status,
        answer: JSON.stringify(parsed.data.answer)
      }
    });

    const answers = await prisma.gameAnswer.findMany({
      where: {
        progressId: progress.id
      }
    });

    const score = answers.reduce((sum, answer) => sum + answer.score, 0);
    const completedGames = answers.length;
    const percentage = maxScore ? Math.round((score / maxScore) * 100) : 0;

    const updated = await prisma.episodeProgress.update({
      where: {
        id: progress.id
      },
      data: {
        score,
        completedGames,
        percentage,
        completed: completedGames === episode.games.length
      },
      include: {
        answers: true
      }
    });

    response.json(progressPayload(updated));
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "تعذر حفظ التقدم" });
  }
});