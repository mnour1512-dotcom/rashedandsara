"use client";

import Link from "next/link";
import type { EpisodeSummary } from "@/lib/types";

export function HomePage({ episodes }: { episodes: EpisodeSummary[] }) {
  const safeEpisodes = Array.isArray(episodes) ? episodes : [];
  const totalGames = safeEpisodes.reduce((sum, episode) => sum + (episode.gamesCount || 0), 0);
  const completedEpisodes = safeEpisodes.filter((episode) => episode.progress?.completedGames === episode.gamesCount).length;
  const orderedEpisodes = [...safeEpisodes].sort((first, second) => first.order - second.order);

  return (
    <main className="page-shell">
      <section className="hero">
        <img
          className="hero-banner-image"
          src="/home-hero-banner.png"
          alt="ألعاب راشد وسارة"
        />
      </section>

      <section className="home-celebration">
        <div className="home-celebration__content">
          <span className="home-celebration__badge">مرحبا يا أبطال الألعاب</span>
          <h2>اختر حلقتك المفضلة وابدأ رحلة اللعب مع راشد وسارة</h2>
          <p>
            20 حلقة مليئة بالألعاب التفاعلية الممتعة، والألوان المبهجة، والتحديات المناسبة للأطفال.
          </p>
        </div>
        <div className="home-stats">
          <div className="home-stat-card">
            <strong>{orderedEpisodes.length}</strong>
            <span>حلقة جاهزة</span>
          </div>
          <div className="home-stat-card">
            <strong>{totalGames}</strong>
            <span>لعبة ممتعة</span>
          </div>
          <div className="home-stat-card">
            <strong>{completedEpisodes}</strong>
            <span>حلقات مكتملة</span>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="section-head">
          <div>
            <h2>جميع الحلقات</h2>
            <p>كل حلقة تفتح لك صفحة ألعاب خاصة بها، مرتبة من الحلقة الأولى حتى الحلقة العشرين.</p>
          </div>
        </div>
        <div className="episodes-grid episodes-grid--playful">
          {orderedEpisodes.map((episode) => (
            <Link href={episode.gamePath || `/episodes/${episode.id}`} key={episode.id} className="episode-card episode-card--playful">
              <div className="episode-card__image-wrap">
                <img src={episode.image || episode.thumbnailUrl} alt={episode.title} />
                <span className="episode-card__badge">الحلقة {episode.order}</span>
              </div>
              <div className="episode-body">
                <span className="meta">4 ألعاب مرئية • {episode.gamesCount} تحديات</span>
                <h3>{episode.title}</h3>
                <p>{episode.description}</p>
                <div className="episode-tag-row">
                  {episode.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="episode-tag-chip">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="card-footer">
                  <span>
                    {episode.progress?.completedGames || 0}/{episode.progress?.totalGames || episode.gamesCount} مكتمل
                  </span>
                  <span className="button-link episode-card__cta">{episode.playLabel || "العب الآن"}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}