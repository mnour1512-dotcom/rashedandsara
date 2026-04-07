"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { EpisodePage } from "@/components/episode-page";
import { createEmptyProgress, getEpisodeById } from "@/lib/sample-data";

function EpisodeRouteFallback() {
  return (
    <main className="page-shell">
      <section className="panel" style={{ textAlign: "center" }}>
        <h1>الحلقة غير متاحة الآن</h1>
        <p>تعذر فتح هذه الحلقة، يمكنك العودة إلى الصفحة الرئيسية واختيار حلقة أخرى.</p>
        <Link href="/" className="button-link solid">
          العودة إلى الصفحة الرئيسية
        </Link>
      </section>
    </main>
  );
}

export default function EpisodeDetailsPage() {
  const params = useParams<{ id?: string }>();
  const id = typeof params?.id === "string" ? params.id : "";
  const episode = id ? getEpisodeById(id) : null;

  if (!episode) {
    return <EpisodeRouteFallback />;
  }

  return <EpisodePage episode={episode} initialProgress={createEmptyProgress(episode)} />;
}