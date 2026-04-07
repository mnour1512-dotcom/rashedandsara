import { prisma } from "../src/lib/prisma";
import { seedEpisodes } from "../src/data/episode-generator";

async function main() {
  const episodeIds = seedEpisodes.map((episode) => episode.id);

  for (const episode of seedEpisodes) {
    await prisma.episode.upsert({
      where: {
        id: episode.id
      },
      update: {
        order: episode.order,
        title: episode.title,
        fullTitle: episode.fullTitle,
        description: episode.description,
        lesson: episode.lesson,
        ageGroup: episode.ageGroup,
        videoId: episode.videoId,
        thumbnailUrl: episode.thumbnailUrl,
        tags: JSON.stringify(episode.tags),
        events: JSON.stringify(episode.events)
      },
      create: {
        id: episode.id,
        order: episode.order,
        title: episode.title,
        fullTitle: episode.fullTitle,
        description: episode.description,
        lesson: episode.lesson,
        ageGroup: episode.ageGroup,
        videoId: episode.videoId,
        thumbnailUrl: episode.thumbnailUrl,
        tags: JSON.stringify(episode.tags),
        events: JSON.stringify(episode.events)
      }
    });

    await prisma.game.deleteMany({
      where: {
        episodeId: episode.id
      }
    });

    await prisma.game.createMany({
      data: episode.games.map((game) => ({
        id: game.id,
        episodeId: episode.id,
        type: game.type,
        title: game.title,
        prompt: game.prompt,
        difficulty: game.difficulty,
        points: game.points,
        data: JSON.stringify(game.data),
        successMessage: game.successMessage,
        retryMessage: game.retryMessage
      }))
    });
  }

  await prisma.episode.deleteMany({
    where: {
      id: {
        notIn: episodeIds
      }
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });