"use client";

import Link from "next/link";

export default function Error({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="page-shell">
      <section className="panel" style={{ textAlign: "center" }}>
        <h1>حدث خطأ غير متوقع</h1>
        <p>تم منع تعطل الصفحة بالكامل. يمكنك إعادة المحاولة أو العودة إلى الصفحة الرئيسية.</p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <button className="button-link solid" onClick={() => reset()}>
            إعادة المحاولة
          </button>
          <Link href="/" className="button-link">
            الصفحة الرئيسية
          </Link>
        </div>
      </section>
    </main>
  );
}