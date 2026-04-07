"use client";

import { HomePage } from "@/components/home-page";
import { getEpisodeSummaries } from "@/lib/sample-data";

export default function Page() {
  return <HomePage episodes={getEpisodeSummaries()} />;
}