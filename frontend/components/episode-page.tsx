"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { api } from "@/lib/api";
import type { Episode, EpisodeProgress, Game } from "@/lib/types";

type HeroName = "راشد" | "سارة";

type SafeAnswer = EpisodeProgress["answers"][number];

export function EpisodePage({
  episode,
  initialProgress
}: {
  episode: Episode;
  initialProgress: EpisodeProgress;
}) {
  const safeGames = useMemo(() => sanitizeGamesForRender(episode.games, episode.id), [episode.games, episode.id]);
  const safeInitialProgress = useMemo(
    () => createSafeProgress(initialProgress, safeGames, episode.id),
    [initialProgress, safeGames, episode.id]
  );
  const [progress, setProgress] = useState(safeInitialProgress);
  const [drafts, setDrafts] = useState<Record<string, unknown>>({});
  const [loadingGameId, setLoadingGameId] = useState<string | null>(null);

  useEffect(() => {
    setProgress(safeInitialProgress);
  }, [safeInitialProgress]);

  const scoreMap = useMemo(() => {
    return new Map((Array.isArray(progress.answers) ? progress.answers : []).map((answer) => [answer.gameId, answer]));
  }, [progress.answers]);

  const episodeTags = Array.isArray(episode.tags) ? episode.tags : [];
  const episodeEvents = Array.isArray(episode.events) ? episode.events : [];

  const submit = useCallback(
    async (game: Game, payload: Record<string, unknown>, isCorrect: boolean) => {
      try {
        setLoadingGameId(game.id);
        const response = await api.post<EpisodeProgress>(`/progress/guest-user/episodes/${episode.id}/answers`, {
          gameId: game.id,
          score: isCorrect ? game.points : 0,
          status: isCorrect ? "correct" : "wrong",
          answer: payload
        });
        setProgress(createSafeProgress(response.data, safeGames, episode.id));
      } catch {
        const nextAnswers = [
          ...(Array.isArray(progress.answers) ? progress.answers : []).filter((answer) => answer.gameId !== game.id),
          {
            gameId: game.id,
            score: isCorrect ? game.points : 0,
            status: isCorrect ? "correct" : "wrong",
            answer: payload
          }
        ];
        const score = nextAnswers.reduce((sum, answer) => sum + answer.score, 0);
        const maxScore = safeGames.reduce((sum, item) => sum + item.points, 0);
        setProgress({
          ...progress,
          answers: nextAnswers,
          completedGames: nextAnswers.length,
          totalGames: safeGames.length,
          score,
          maxScore,
          percentage: maxScore ? Math.round((score / maxScore) * 100) : 0,
          completed: nextAnswers.length >= safeGames.length
        });
      } finally {
        setLoadingGameId(null);
      }
    },
    [episode.id, progress, safeGames]
  );

  return (
    <main className="page-shell episode-shell">
      <section className="panel episode-hero">
        <img src={episode.thumbnailUrl || episode.image || "/game-heroes-banner.png"} alt={episode.title} className="episode-image" />
        <div>
          <div className="chips">
            <span className="chip static">الحلقة {episode.order}</span>
            <span className="chip static">{episode.ageGroup}</span>
          </div>
          <h1>{episode.title}</h1>
          <p>{episode.description}</p>
          <div className="chips">
            {episodeTags.map((tag) => (
              <span key={tag} className="chip static">
                {tag}
              </span>
            ))}
          </div>
          <div className="progress-box">
            <div className="progress-label">
              <span>التقدم داخل الحلقة</span>
              <strong>
                {progress.completedGames}/{progress.totalGames}
              </strong>
            </div>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${progress.totalGames ? (progress.completedGames / progress.totalGames) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="episode-grid">
        <section className="games-column">
          {safeGames.map((game) => {
            const saved = scoreMap.get(game.id);
            return (
              <article key={game.id} className="panel game-card">
                <div className="game-head">
                  <div>
                    <h3>{game.title}</h3>
                    <p>{game.prompt}</p>
                  </div>
                  <span className={`difficulty ${game.difficulty}`}>{game.points} نقطة</span>
                </div>
                <GameRenderer
                  game={game}
                  saved={saved}
                  draft={drafts[game.id]}
                  setDraft={(value) => setDrafts((current) => ({ ...current, [game.id]: value }))}
                  onSubmit={submit}
                  loading={loadingGameId === game.id}
                />
              </article>
            );
          })}
        </section>

        <aside className="summary-column">
          <section className="panel">
            <h3>النتيجة النهائية</h3>
            <div className="score-ring">
              <div>{progress.percentage}%</div>
            </div>
            <div className="score-list">
              {safeGames.map((game) => (
                <div key={game.id} className="score-row">
                  <span>{game.title}</span>
                  <strong>
                    {scoreMap.get(game.id)?.score || 0}/{game.points}
                  </strong>
                </div>
              ))}
            </div>
            <div className={progress.percentage >= 60 ? "feedback success" : "feedback retry"}>
              {progress.percentage >= 85
                ? "تهانينا، لقد اجتزت هذه الحلقة"
                : progress.percentage >= 60
                  ? "أتممت ألعاب الحلقة بنجاح"
                  : "حاول مرة أخرى، أنت تقترب من نتيجة أفضل"}
            </div>
            {progress.completed ? (
              <div className="reward-card">
                <div className="reward-badge">🏆</div>
                <strong>شارة بطل الحلقة</strong>
                <span>أنهيت كل الألعاب وفتحت مكافأة هذه الحلقة.</span>
              </div>
            ) : null}
          </section>
          <section className="panel">
            <h3>ربط الألعاب بالمحتوى</h3>
            <p>{episode.lesson}</p>
            <ul className="event-list">
              {episodeEvents.map((event) => (
                <li key={event}>{event}</li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </main>
  );
}

function GameRenderer({
  game,
  saved,
  onSubmit,
  loading
}: {
  game: Game;
  saved?: SafeAnswer;
  draft: unknown;
  setDraft: (value: unknown) => void;
  onSubmit: (game: Game, payload: Record<string, unknown>, isCorrect: boolean) => Promise<void>;
  loading: boolean;
}) {
  if (game.type === "dragDrop") {
    return <DragDropGame game={game} saved={saved} loading={loading} onSubmit={onSubmit} />;
  }

  if (game.type === "memory") {
    return <MemoryGame game={game} saved={saved} loading={loading} onSubmit={onSubmit} />;
  }

  if (game.type === "arcadeCatch") {
    return <ArcadeCatchGame game={game} saved={saved} loading={loading} onSubmit={onSubmit} />;
  }

  if (game.type === "wordPuzzle") {
    return <WordPuzzleGame game={game} saved={saved} loading={loading} onSubmit={onSubmit} />;
  }

  if (game.type === "decisionPath") {
    return <DecisionPathGame game={game} saved={saved} loading={loading} onSubmit={onSubmit} />;
  }

  return <UnknownGameCard game={game} />;
}

function GameShell({
  instructions,
  started,
  setStarted,
  saved,
  game,
  children
}: {
  title: string;
  instructions: string;
  started: boolean;
  setStarted: (started: boolean) => void;
  saved?: SafeAnswer;
  game: Game;
  children: React.ReactNode;
}) {
  if (!started && !saved) {
    return (
      <div className="game-shell-intro">
        <GameCoverThumbnail game={game} onStart={() => setStarted(true)} />
        <p className="game-intro-copy">{instructions}</p>
      </div>
    );
  }

  return <>{children}</>;
}

function DragDropGame({
  game,
  saved,
  loading,
  onSubmit
}: {
  game: Game;
  saved?: SafeAnswer;
  loading: boolean;
  onSubmit: (game: Game, payload: Record<string, unknown>, isCorrect: boolean) => Promise<void>;
}) {
  const [started, setStarted] = useState(Boolean(saved));
  const [hero, setHero] = useState<HeroName>("راشد");
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [placed, setPlaced] = useState<Record<string, string>>(
    saved && saved.answer && typeof saved.answer.placed === "object" && saved.answer.placed
      ? (saved.answer.placed as Record<string, string>)
      : {}
  );
  const [result, setResult] = useState<boolean | null>(saved ? saved.status === "correct" : null);
  const items = Array.isArray(game.data.draggableItems) ? game.data.draggableItems : [];
  const targets = Array.isArray(game.data.targets) ? game.data.targets : [];
  const placedItemIds = Object.values(placed);

  function assignItem(targetId: string) {
    if (!selectedItemId) {
      return;
    }

    setPlaced((current) => {
      const next = { ...current };
      for (const key of Object.keys(next)) {
        if (next[key] === selectedItemId) {
          delete next[key];
        }
      }
      next[targetId] = selectedItemId;
      return next;
    });
    setSelectedItemId(null);
  }

  function checkResult() {
    if (!items.length || !targets.length || Object.keys(placed).length !== targets.length) {
      setResult(false);
      return;
    }

    const success = targets.every((target) => {
      const item = items.find((candidate) => candidate.id === placed[target.id]);
      return item?.targetId === target.id;
    });

    setResult(success);
  }

  return (
    <GameShell
      title={game.title}
      instructions="اختر بطاقة من الأعلى ثم ضعها في مكانها الصحيح حتى تساعد راشد وسارة على ترتيب أحداث الحلقة."
      started={started}
      setStarted={setStarted}
      saved={saved}
      game={game}
    >
      <div className="game-stage game-theme-shell">
        <GameMascots title={game.title} compact />
        <HeroControl hero={hero} onChange={setHero} />
        <div className="game-status-strip">
          <HeroToken hero={hero} subtitle="يرتب أحداث الحلقة" />
        </div>
        <div className="drag-items">
          {items.map((item) => {
            const isUsed = placedItemIds.includes(item.id);
            const isSelected = selectedItemId === item.id;
            return (
              <button
                key={item.id}
                className={`draggable-chip ${isUsed ? "used" : ""} ${isSelected ? "active" : ""}`}
                disabled={Boolean(saved) || loading || isUsed}
                onClick={() => setSelectedItemId(item.id)}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        <div className="drop-grid">
          {targets.map((target) => {
            const item = items.find((candidate) => candidate.id === placed[target.id]);
            return (
              <div key={target.id} className="drop-zone">
                <strong>{target.label}</strong>
                <button
                  className="button-link solid"
                  disabled={Boolean(saved) || loading || !selectedItemId}
                  onClick={() => assignItem(target.id)}
                >
                  {item?.label || "ضع البطاقة هنا"}
                </button>
                {item ? (
                  <button
                    className="slot-clear-button"
                    disabled={Boolean(saved) || loading}
                    onClick={() =>
                      setPlaced((current) => {
                        const next = { ...current };
                        delete next[target.id];
                        return next;
                      })
                    }
                  >
                    إزالة
                  </button>
                ) : null}
              </div>
            );
          })}
        </div>
        {!saved && result === null ? (
          <div className="arcade-controls">
            <button className="button-link solid" disabled={loading} onClick={() => {
              setSelectedItemId(null);
              setPlaced({});
            }}>
              إعادة الترتيب
            </button>
            <button className="button-link solid" disabled={loading} onClick={checkResult}>
              تحقق
            </button>
          </div>
        ) : null}
        {!saved && result !== null ? (
          <div className={result ? "game-result-card win" : "game-result-card lose"}>
            <strong>{result ? "ترتيب ممتاز!" : "الترتيب يحتاج مراجعة"}</strong>
            <span>
              {result ? `${hero} ساعد سارة أو راشد على ترتيب المراحل بشكل صحيح.` : `${hero} يحتاج إلى إعادة ترتيب الأحداث من جديد.`}
            </span>
            <div className="game-result-actions">
              {!result ? (
                <button
                  className="button-link solid"
                  onClick={() => {
                    setSelectedItemId(null);
                    setPlaced({});
                    setResult(null);
                  }}
                >
                  حاول مرة أخرى
                </button>
              ) : null}
              <button className="button-link solid" disabled={loading} onClick={() => onSubmit(game, { placed, hero }, Boolean(result))}>
                تثبيت النتيجة
              </button>
            </div>
          </div>
        ) : null}
        {saved ? <GameFeedback game={game} score={saved.score} correct={saved.status === "correct"} /> : null}
      </div>
    </GameShell>
  );
}

function MemoryGame({
  game,
  saved,
  loading,
  onSubmit
}: {
  game: Game;
  saved?: SafeAnswer;
  loading: boolean;
  onSubmit: (game: Game, payload: Record<string, unknown>, isCorrect: boolean) => Promise<void>;
}) {
  const [started, setStarted] = useState(Boolean(saved));
  const [hero, setHero] = useState<HeroName>("سارة");
  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>(saved ? (Array.isArray(game.data.memoryCards) ? game.data.memoryCards.map((card) => card.id) : []) : []);
  const [moves, setMoves] = useState(0);
  const [result, setResult] = useState<boolean | null>(saved ? saved.status === "correct" : null);
  const cards = useMemo(() => shuffleCards(Array.isArray(game.data.memoryCards) ? game.data.memoryCards : []), [game.id, game.data.memoryCards]);
  const maxMoves = Math.max(cards.length * 2, 8);

  useEffect(() => {
    if (flipped.length !== 2) return;
    const timeout = setTimeout(() => {
      const [firstId, secondId] = flipped;
      const first = cards.find((card) => card.id === firstId);
      const second = cards.find((card) => card.id === secondId);

      if (first && second && first.pairKey === second.pairKey) {
        setMatched((current) => [...current, first.id, second.id]);
      }
      setMoves((current) => current + 1);
      setFlipped([]);
    }, 700);

    return () => clearTimeout(timeout);
  }, [cards, flipped]);

  useEffect(() => {
    if (!cards.length || saved) return;
    if (matched.length === cards.length) {
      setResult(true);
    } else if (moves >= maxMoves) {
      setResult(false);
    }
  }, [cards.length, matched.length, maxMoves, moves, saved]);

  function flipCard(id: string) {
    if (flipped.length === 2 || flipped.includes(id) || matched.includes(id)) return;
    setFlipped((current) => [...current, id]);
  }

  return (
    <GameShell
      title={game.title}
      instructions="اكشف بطاقتين متشابهتين في كل مرة حتى تربح تحدي الذاكرة مع راشد وسارة."
      started={started}
      setStarted={setStarted}
      saved={saved}
      game={game}
    >
      <div className="game-stage game-theme-shell">
        <GameMascots title={game.title} compact />
        <HeroControl hero={hero} onChange={setHero} />
        <div className="game-status-strip">
          <HeroToken hero={hero} subtitle={`عدد الحركات ${moves}/${maxMoves}`} />
        </div>
        <div className="memory-board">
          {cards.map((card) => {
            const isOpen = flipped.includes(card.id) || matched.includes(card.id);
            return (
              <button key={card.id} className={isOpen ? "memory-tile open" : "memory-tile"} disabled={Boolean(saved) || loading || isOpen} onClick={() => flipCard(card.id)}>
                <span>{isOpen ? card.label : "؟"}</span>
              </button>
            );
          })}
        </div>
        {!saved && result !== null ? (
          <div className={result ? "game-result-card win" : "game-result-card lose"}>
            <strong>{result ? "ذاكرة رائعة!" : "اقتربت من الفوز"}</strong>
            <span>
              {result ? `${hero} حفظ أماكن البطاقات وأنهى اللعبة بنجاح.` : `${hero} يحتاج إلى محاولة أخرى لتذكر أماكن البطاقات.`}
            </span>
            <div className="game-result-actions">
              {!result ? (
                <button
                  className="button-link solid"
                  onClick={() => {
                    setFlipped([]);
                    setMatched([]);
                    setMoves(0);
                    setResult(null);
                  }}
                >
                  إعادة اللعب
                </button>
              ) : null}
              <button className="button-link solid" disabled={loading} onClick={() => onSubmit(game, { hero, moves }, Boolean(result))}>
                تثبيت النتيجة
              </button>
            </div>
          </div>
        ) : null}
        {saved ? <GameFeedback game={game} score={saved.score} correct={saved.status === "correct"} /> : null}
      </div>
    </GameShell>
  );
}

function ArcadeCatchGame({
  game,
  saved,
  loading,
  onSubmit
}: {
  game: Game;
  saved?: SafeAnswer;
  loading: boolean;
  onSubmit: (game: Game, payload: Record<string, unknown>, isCorrect: boolean) => Promise<void>;
}) {
  const [started, setStarted] = useState(Boolean(saved));
  const [score, setScore] = useState(saved?.score || 0);
  const [timeLeft, setTimeLeft] = useState(game.data.catcher?.duration || 18);
  const [playerX, setPlayerX] = useState(50);
  const [falling, setFalling] = useState<Array<{ id: number; x: number; y: number; label: string; good: boolean }>>([]);
  const [result, setResult] = useState<boolean | null>(saved ? saved.status === "correct" : null);
  const config = game.data.catcher;
  const tickerRef = useRef<number>(0);
  const movePlayer = useCallback((delta: number) => {
    setPlayerX((value) => Math.min(95, Math.max(5, value + delta)));
  }, []);

  useEffect(() => {
    if (!started || saved || result !== null || !config) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        movePlayer(-8);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        movePlayer(8);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [config, movePlayer, result, saved, started]);

  useEffect(() => {
    if (!started || saved || result !== null || !config) return;

    const timer = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          setResult(score >= config.goal * 5);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [config, result, saved, score, started]);

  useEffect(() => {
    if (!started || saved || result !== null || !config) return;

    const interval = window.setInterval(() => {
      tickerRef.current += 1;
      setFalling((current) => {
        const moved = current
          .map((item) => ({ ...item, y: item.y + 9 }))
          .filter((item) => item.y <= 100);

        if (tickerRef.current % 2 === 0) {
          const sourcePool = Math.random() > 0.4 ? config.goodItems : config.badItems;
          const pool = sourcePool.length ? sourcePool : ["عنصر"];
          const label = pool[Math.floor(Math.random() * pool.length)] || "عنصر";
          moved.push({
            id: Date.now() + Math.round(Math.random() * 1000),
            x: 10 + Math.round(Math.random() * 75),
            y: 0,
            label,
            good: config.goodItems.includes(label)
          });
        }

        const caughtIds = moved.filter((item) => Math.abs(item.x - playerX) < 10 && item.y >= 82).map((item) => item.id);

        if (caughtIds.length) {
          setScore((current) => {
            const delta = moved
              .filter((item) => caughtIds.includes(item.id))
              .reduce((sum, item) => sum + (item.good ? 5 : -4), 0);

            const nextScore = Math.max(0, current + delta);
            if (nextScore >= config.goal * 5) {
              setResult(true);
            }
            return nextScore;
          });
        }

        return moved.filter((item) => !caughtIds.includes(item.id));
      });
    }, 300);

    return () => window.clearInterval(interval);
  }, [config, playerX, result, saved, started]);

  const hero = (config?.playerLabel === "سارة" ? "سارة" : "راشد") as HeroName;

  return (
    <GameShell
      title={game.title}
      instructions="حرّك راشد أو سارة يمينًا ويسارًا لالتقاط العناصر الصحيحة وتجنب العناصر الخاطئة."
      started={started}
      setStarted={setStarted}
      saved={saved}
      game={game}
    >
      <div className="game-stage game-theme-shell">
        <GameMascots title={game.title} compact />
        <HeroControl hero={hero} onChange={() => undefined} />
        <div className="game-status-strip">
          <HeroToken hero={hero} subtitle={`الوقت ${timeLeft} ثانية`} />
          <span className="status-bubble">النقاط {score}</span>
        </div>
        <div className="arcade-board">
          {falling.map((item) => (
            <div key={item.id} className={item.good ? "falling-item good" : "falling-item bad"} style={{ left: `${item.x}%`, top: `${item.y}%` }}>
              {item.label}
            </div>
          ))}
          <div className={`catcher-player ${hero === "راشد" ? "hero-rashid" : "hero-sarah"}`} style={{ left: `${playerX}%` }}>
            {config?.playerLabel || "راشد"}
          </div>
        </div>
        {!saved && result === null ? (
          <div className="arcade-controls">
            <button className="button-link solid" disabled={loading} onClick={() => movePlayer(12)}>
              يمين →
            </button>
            <button className="button-link solid" disabled={loading} onClick={() => movePlayer(-12)}>
              ← يسار
            </button>
          </div>
        ) : null}
        {!saved && result !== null ? (
          <div className={result ? "game-result-card win" : "game-result-card lose"}>
            <strong>{result ? "فوز رائع!" : "أعد المحاولة"}</strong>
            <span>
              {result ? "جمع راشد وسارة العناصر الصحيحة في الوقت المناسب." : "اقتربت من الفوز، لكن ما زال يمكنك تحسين النتيجة."}
            </span>
            <div className="game-result-actions">
              {!result ? (
                <button
                  className="button-link solid"
                  onClick={() => {
                    setScore(0);
                    setTimeLeft(config?.duration || 18);
                    setFalling([]);
                    setResult(null);
                  }}
                >
                  إعادة اللعب
                </button>
              ) : null}
              <button className="button-link solid" disabled={loading} onClick={() => onSubmit(game, { arcadeScore: score, hero }, Boolean(result))}>
                تثبيت النتيجة
              </button>
            </div>
          </div>
        ) : null}
        {saved ? <GameFeedback game={game} score={saved.score} correct={saved.status === "correct"} /> : null}
      </div>
    </GameShell>
  );
}

function WordPuzzleGame({
  game,
  saved,
  loading,
  onSubmit
}: {
  game: Game;
  saved?: SafeAnswer;
  loading: boolean;
  onSubmit: (game: Game, payload: Record<string, unknown>, isCorrect: boolean) => Promise<void>;
}) {
  const [started, setStarted] = useState(Boolean(saved));
  const [hero, setHero] = useState<HeroName>("سارة");
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<boolean | null>(saved ? saved.status === "correct" : null);
  const puzzle = game.data.puzzle;
  const scrambledLetters = Array.isArray(puzzle?.scrambled) ? puzzle.scrambled : [];

  const selectedIndexes = useMemo(() => {
    if (!answer) {
      return [];
    }

    const consumed: number[] = [];
    for (const letter of answer) {
      const nextIndex = scrambledLetters.findIndex((item, index) => item === letter && !consumed.includes(index));
      if (nextIndex === -1) {
        break;
      }
      consumed.push(nextIndex);
    }

    return consumed;
  }, [answer, scrambledLetters]);

  return (
    <GameShell
      title={game.title}
      instructions="اضغط على الحروف المبعثرة لتكوين كلمة الحلقة الصحيحة."
      started={started}
      setStarted={setStarted}
      saved={saved}
      game={game}
    >
      <div className="game-stage game-theme-shell">
        <GameMascots title={game.title} compact />
        <HeroControl hero={hero} onChange={setHero} />
        <div className="game-status-strip">
          <HeroToken hero={hero} subtitle="يرتب الحروف" />
        </div>
        <div className="puzzle-hint">تلميح: {puzzle?.hint || "فكر في فكرة الحلقة"}</div>
        <div className="puzzle-answer">{answer || "..."}</div>
        <div className="drag-items">
          {scrambledLetters.map((letter, index) => (
            <button
              key={`${letter}-${index}`}
              className="letter-tile"
              disabled={Boolean(saved) || loading || selectedIndexes.includes(index)}
              onClick={() => setAnswer((current) => current + letter)}
            >
              {letter}
            </button>
          ))}
        </div>
        {!saved && result === null ? (
          <div className="arcade-controls">
            <button className="button-link solid" disabled={loading} onClick={() => setAnswer("")}>
              مسح
            </button>
            <button className="button-link solid" disabled={loading || !answer} onClick={() => setAnswer((current) => current.slice(0, -1))}>
              حذف حرف
            </button>
            <button className="button-link solid" disabled={loading} onClick={() => setResult(normalize(answer) === normalize(puzzle?.answer || ""))}>
              تحقق
            </button>
          </div>
        ) : null}
        {!saved && result !== null ? (
          <div className={result ? "game-result-card win" : "game-result-card lose"}>
            <strong>{result ? "أحسنت في تكوين الكلمة" : "الكلمة غير صحيحة"}</strong>
            <span>
              {result ? `${hero} كوّن الكلمة الصحيحة بنجاح.` : `${hero} يحتاج إلى إعادة ترتيب الحروف بشكل صحيح.`}
            </span>
            <div className="game-result-actions">
              {!result ? (
                <button
                  className="button-link solid"
                  onClick={() => {
                    setAnswer("");
                    setResult(null);
                  }}
                >
                  إعادة اللعب
                </button>
              ) : null}
              <button className="button-link solid" disabled={loading} onClick={() => onSubmit(game, { answer, hero }, Boolean(result))}>
                تثبيت النتيجة
              </button>
            </div>
          </div>
        ) : null}
        {saved ? <GameFeedback game={game} score={saved.score} correct={saved.status === "correct"} /> : null}
      </div>
    </GameShell>
  );
}

function DecisionPathGame({
  game,
  saved,
  loading,
  onSubmit
}: {
  game: Game;
  saved?: SafeAnswer;
  loading: boolean;
  onSubmit: (game: Game, payload: Record<string, unknown>, isCorrect: boolean) => Promise<void>;
}) {
  const [started, setStarted] = useState(Boolean(saved));
  const [hero, setHero] = useState<HeroName>("راشد");
  const [selectedChoice, setSelectedChoice] = useState<string | null>(
    typeof saved?.answer?.choiceId === "string" ? saved.answer.choiceId : null
  );
  const [result, setResult] = useState<boolean | null>(saved ? saved.status === "correct" : null);
  const decision = game.data?.decision;
  const choices = Array.isArray(decision?.choices) ? decision.choices : [];
  const activeChoice = choices.find((choice) => choice.id === selectedChoice);

  if (!decision || !choices.length) {
    return <UnknownGameCard game={game} />;
  }

  return (
    <GameShell
      title={game.title}
      instructions="اقرأ الموقف جيدًا ثم اختر مع راشد أو سارة القرار الأفضل للوصول إلى نهاية جميلة."
      started={started}
      setStarted={setStarted}
      saved={saved}
      game={game}
    >
      <div className="game-stage game-theme-shell">
        <GameMascots title={game.title} compact />
        <HeroControl hero={hero} onChange={setHero} />
        <div className="game-status-strip">
          <HeroToken hero={hero} subtitle="يتخذ القرار المناسب" />
        </div>
        <div className="decision-story-card">
          <strong>مهمة اليوم</strong>
          <p>{decision.story || game.prompt}</p>
        </div>
        <div className="decision-choice-list">
          {choices.map((choice) => {
            const isActive = selectedChoice === choice.id;
            return (
              <button
                key={choice.id}
                className={isActive ? "decision-choice active" : "decision-choice"}
                disabled={Boolean(saved) || loading || result !== null}
                onClick={() => setSelectedChoice(choice.id)}
              >
                <span className="decision-choice__badge">{isActive ? "✓" : "؟"}</span>
                <span>{choice.label}</span>
              </button>
            );
          })}
        </div>
        {activeChoice ? <div className="decision-outcome-preview">{activeChoice.outcome}</div> : null}
        {!saved && result === null ? (
          <div className="arcade-controls">
            <button className="button-link solid" disabled={loading || !selectedChoice} onClick={() => setResult(Boolean(activeChoice?.correct))}>
              اعرف النتيجة
            </button>
            <button className="button-link solid" disabled={loading || !selectedChoice} onClick={() => setSelectedChoice(null)}>
              اختر من جديد
            </button>
          </div>
        ) : null}
        {!saved && result !== null ? (
          <div className={result ? "game-result-card win" : "game-result-card lose"}>
            <strong>{result ? "قرار ذكي!" : "جرّب قرارًا آخر"}</strong>
            <span>
              {result
                ? `${hero} اختار القرار المناسب وساعد سارة أو راشد على النجاح.`
                : `${hero} يحتاج أن يراجع الفكرة الأساسية في الحلقة قبل اختيار القرار.`}
            </span>
            {activeChoice ? <p>{activeChoice.outcome}</p> : null}
            <div className="game-result-actions">
              {!result ? (
                <button
                  className="button-link solid"
                  onClick={() => {
                    setSelectedChoice(null);
                    setResult(null);
                  }}
                >
                  إعادة الاختيار
                </button>
              ) : null}
              <button
                className="button-link solid"
                disabled={loading || !activeChoice}
                onClick={() =>
                  onSubmit(
                    game,
                    {
                      hero,
                      choiceId: activeChoice?.id || "",
                      choiceLabel: activeChoice?.label || "",
                      outcome: activeChoice?.outcome || ""
                    },
                    Boolean(result)
                  )
                }
              >
                تثبيت النتيجة
              </button>
            </div>
          </div>
        ) : null}
        {saved ? <GameFeedback game={game} score={saved.score} correct={saved.status === "correct"} /> : null}
      </div>
    </GameShell>
  );
}

function UnknownGameCard({ game }: { game: Game }) {
  return (
    <div className="game-stage game-theme-shell">
      <GameMascots title={game.title || "لعبة آمنة"} compact />
      <div className="game-result-card lose">
        <strong>هذه اللعبة غير متاحة الآن</strong>
        <span>تم استبدال اللعبة المعطوبة ببطاقة آمنة حتى لا تنهار الصفحة.</span>
        <p>{game.prompt || "يمكنك متابعة بقية الألعاب الآن."}</p>
      </div>
    </div>
  );
}

function GameFeedback({ game, score, correct }: { game: Game; score: number; correct: boolean }) {
  return (
    <div className={correct ? "feedback success" : "feedback retry"}>
      {correct ? game.successMessage : game.retryMessage} • {score}/{game.points}
    </div>
  );
}

function GameCoverThumbnail({ game, onStart }: { game: Game; onStart: () => void }) {
  const keywords = coverKeywords(game);
  return (
    <button className={`game-cover-card theme-${game.type}`} onClick={onStart}>
      <div className="game-cover-card__glow" />
      <div className="game-cover-card__content">
        <div className="game-cover-card__text">
          <h4>{game.title}</h4>
          <p>{coverSubtitle(game)}</p>
          <div className="game-cover-card__chips">
            {keywords.map((keyword) => (
              <span key={keyword} className="game-cover-card__chip">
                {keyword}
              </span>
            ))}
          </div>
          <div className="game-cover-card__cta">اضغط للدخول إلى اللعبة</div>
        </div>
        <div className="game-cover-card__art">
          <div className="game-cover-card__hero">
            <img src="/game-heroes-banner.png" alt="راشد وسارة" />
          </div>
          <GameTypeDecor type={game.type} />
        </div>
      </div>
    </button>
  );
}

function GameTypeDecor({ type }: { type: Game["type"] }) {
  if (type === "dragDrop") {
    return (
      <div className="cover-decor cover-decor--drag">
        <span className="decor-chip">⬅</span>
        <span className="decor-chip">🧩</span>
        <span className="decor-chip">➡</span>
        <span className="decor-chip">🧠</span>
      </div>
    );
  }

  if (type === "memory") {
    return (
      <div className="cover-decor cover-decor--memory">
        <span className="memory-cover-card flipped">؟</span>
        <span className="memory-cover-card">🂠</span>
        <span className="memory-cover-card flipped">؟</span>
      </div>
    );
  }

  if (type === "arcadeCatch") {
    return (
      <div className="cover-decor cover-decor--arcade">
        <span className="arcade-dot">⭐</span>
        <span className="arcade-dot">🎯</span>
        <span className="arcade-dot">✨</span>
        <span className="arcade-bar" />
      </div>
    );
  }

  if (type === "decisionPath") {
    return (
      <div className="cover-decor cover-decor--decision">
        <span className="decision-sign">؟</span>
        <span className="decision-arrow">↗</span>
        <span className="decision-arrow">↘</span>
      </div>
    );
  }

  if (type === "fallback") {
    return (
      <div className="cover-decor cover-decor--decision">
        <span className="decision-sign">!</span>
        <span className="decision-arrow">—</span>
        <span className="decision-arrow">—</span>
      </div>
    );
  }

  return (
    <div className="cover-decor cover-decor--puzzle">
      <span className="puzzle-piece">أ</span>
      <span className="puzzle-piece">ل</span>
      <span className="puzzle-piece">ع</span>
      <span className="puzzle-piece">ب</span>
    </div>
  );
}

function coverSubtitle(game: Game) {
  if (game.type === "dragDrop") {
    return `ساعد راشد وسارة على تحريك العناصر الصحيحة داخل ${shortTheme(game.prompt)}.`;
  }
  if (game.type === "memory") {
    return `اكشف بطاقات ${shortTheme(game.prompt)} مع راشد وسارة داخل تحدي ذاكرة سريع.`;
  }
  if (game.type === "arcadeCatch") {
    return `قد الأبطال داخل مغامرة مرئية والتقط عناصر ${shortTheme(game.prompt)} قبل انتهاء الوقت.`;
  }
  if (game.type === "decisionPath") {
    return `اختر مع راشد وسارة القرار الأفضل داخل مغامرة قصصية مستوحاة من ${shortTheme(game.prompt)}.`;
  }
  if (game.type === "fallback") {
    return "بطاقة آمنة بديلة لحماية الصفحة من أي خطأ في البيانات.";
  }
  return `كوّن الإجابة الصحيحة مع راشد وسارة داخل لعبة كلمات مستوحاة من ${shortTheme(game.prompt)}.`;
}

function coverKeywords(game: Game) {
  const byType =
    game.type === "dragDrop"
      ? ["سحب", "إفلات", "حركة"]
      : game.type === "memory"
        ? ["بطاقات", "ذاكرة", "تركيز"]
        : game.type === "arcadeCatch"
          ? ["أركيد", "نجوم", "سرعة"]
          : game.type === "decisionPath"
            ? ["قرار", "مغامرة", "اختيار"]
            : game.type === "fallback"
              ? ["آمن", "بديل", "مستقر"]
              : ["حروف", "كلمات", "تركيب"];

  const fromPrompt = shortTheme(game.prompt)
    .split(" ")
    .filter(Boolean)
    .slice(0, 2);

  return [...new Set([...byType, ...fromPrompt])].slice(0, 5);
}

function shortTheme(prompt: string) {
  return prompt
    .replace(/[.،!؟]/g, "")
    .split(" ")
    .slice(0, 4)
    .join(" ");
}

function HeroControl({ hero, onChange }: { hero: HeroName; onChange: (hero: HeroName) => void }) {
  return (
    <div className="hero-control">
      <button className={hero === "راشد" ? "hero-choice active" : "hero-choice"} onClick={() => onChange("راشد")}>
        🧒 راشد
      </button>
      <button className={hero === "سارة" ? "hero-choice active" : "hero-choice"} onClick={() => onChange("سارة")}>
        👧 سارة
      </button>
    </div>
  );
}

function HeroToken({ hero, subtitle }: { hero: HeroName; subtitle: string }) {
  return (
    <div className={`hero-token ${hero === "راشد" ? "rashid" : "sarah"}`}>
      <span className="hero-token__avatar">{hero === "راشد" ? "🧒" : "👧"}</span>
      <div>
        <strong>{hero}</strong>
        <small>{subtitle}</small>
      </div>
    </div>
  );
}

function GameMascots({ title, compact = false }: { title: string; compact?: boolean }) {
  return (
    <div className={compact ? "game-mascots compact" : "game-mascots"}>
      <div className="game-mascots__visual">
        <img src="/game-heroes-banner.png" alt="راشد وسارة أبطال اللعبة" />
      </div>
      <div className="game-mascots__content">
        <span className="game-mascots__badge">راشد وسارة أبطال هذه اللعبة</span>
        <h4>{title}</h4>
        <p>العب مع راشد وسارة داخل واجهة مرحة مستوحاة من نمط الألعاب التعليمية المصورة.</p>
      </div>
    </div>
  );
}

function normalize(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[ًٌٍَُِّْ]/g, "")
    .replace(/أ|إ|آ/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/\s+/g, " ");
}

function shuffleCards<T>(items: T[]) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

function sanitizeGamesForRender(games: Episode["games"], episodeId: string): Game[] {
  const rawGames = Array.isArray(games) ? games : [];

  const sanitized = rawGames.map((game, index) => {
    if (!game || typeof game !== "object") {
      return createFallbackRenderGame(episodeId, index, "لعبة غير مكتملة");
    }

    return {
      id: typeof game.id === "string" ? game.id : `${episodeId}-game-${index + 1}`,
      episodeId: typeof game.episodeId === "string" ? game.episodeId : episodeId,
      type:
        game.type === "dragDrop" ||
        game.type === "memory" ||
        game.type === "arcadeCatch" ||
        game.type === "wordPuzzle" ||
        game.type === "decisionPath" ||
        game.type === "fallback"
          ? game.type
          : "fallback",
      title: typeof game.title === "string" && game.title ? game.title : `لعبة ${index + 1}`,
      prompt: typeof game.prompt === "string" && game.prompt ? game.prompt : "هذه اللعبة قيد التجهيز الآن.",
      difficulty:
        game.difficulty === "easy" || game.difficulty === "medium" || game.difficulty === "hard" ? game.difficulty : "easy",
      points: typeof game.points === "number" && Number.isFinite(game.points) ? game.points : 0,
      data: game.data && typeof game.data === "object" ? game.data : {},
      successMessage: typeof game.successMessage === "string" ? game.successMessage : "أحسنت!",
      retryMessage: typeof game.retryMessage === "string" ? game.retryMessage : "حاول مرة أخرى."
    } as Game;
  });

  while (sanitized.length < 5) {
    sanitized.push(createFallbackRenderGame(episodeId, sanitized.length, `لعبة إضافية ${sanitized.length + 1}`));
  }

  return sanitized.slice(0, 5);
}

function createFallbackRenderGame(episodeId: string, index: number, title: string): Game {
  return {
    id: `${episodeId}-fallback-${index + 1}`,
    episodeId,
    type: "fallback",
    title,
    prompt: "تعذر تحميل هذه اللعبة بالكامل، لكن الصفحة ستظل تعمل بشكل طبيعي.",
    difficulty: "easy",
    points: 0,
    data: {
      fallback: {
        message: "بطاقة بديلة آمنة"
      }
    },
    successMessage: "أحسنت!",
    retryMessage: "حاول لعبة أخرى."
  };
}

function createSafeProgress(progress: EpisodeProgress, games: Game[], episodeId: string): EpisodeProgress {
  const safeAnswers = Array.isArray(progress.answers) ? progress.answers : [];
  const maxScore = games.reduce((sum, game) => sum + game.points, 0);
  const score = typeof progress.score === "number" ? progress.score : 0;
  const completedGames = Math.min(safeAnswers.length, games.length);

  return {
    episodeId: typeof progress.episodeId === "string" ? progress.episodeId : episodeId,
    completedGames,
    totalGames: games.length,
    score,
    maxScore,
    percentage: maxScore ? Math.round((score / maxScore) * 100) : 0,
    completed: completedGames >= games.length && games.length > 0,
    answers: safeAnswers
  };
}