import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-shell">
      <section className="panel" style={{ textAlign: "center" }}>
        <h1>الصفحة غير موجودة</h1>
        <p>الرابط الذي فتحته غير صحيح أو لم يعد متاحًا.</p>
        <Link href="/" className="button-link solid">
          العودة إلى الصفحة الرئيسية
        </Link>
      </section>
    </main>
  );
}