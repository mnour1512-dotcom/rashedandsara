import { Router } from "express";
import { prisma } from "../lib/prisma";
import { parseEpisode, summarizeEpisode } from "../lib/transformers";

export const episodesRouter = Router();

episodesRouter.get("/", async (request, response) => {
  try {
    const userId = String(request.headers["x-user-id"] || "guest-user");
    const [episodes, progresses] = await Promise.all([
      prisma.episode.findMany({
        where: {
          order: {
            gte: 1,
            lte: 20
          }
        },
        include: {
          games: true
        },
        orderBy: {
          order: "asc"
        }
      }),
      prisma.episodeProgress.findMany({
        where: {
          userId
        },
        include: {
          answers: true
        }
      })
    ]);

    const progressMap = new Map(progresses.map((item) => [item.episodeId, item]));
    response.json(episodes.map((episode) => summarizeEpisode(episode, progressMap.get(episode.id))));
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "تعذر تحميل الحلقات" });
  }
});

episodesRouter.get("/:id", async (request, response) => {
  try {
    const episode = await prisma.episode.findUnique({
      where: {
        id: request.params.id
      },
      include: {
        games: {
          orderBy: {
            id: "asc"
          }
        }
      }
    });

    if (!episode) {
      response.status(404).json({ message: "الحلقة غير موجودة" });
      return;
    }

    response.json(parseEpisode(episode));
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "تعذر تحميل الحلقة" });
  }
});