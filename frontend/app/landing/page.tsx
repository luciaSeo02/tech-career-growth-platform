import Link from "next/link";

export default function LandingPage() {
  return (
    <div
      style={{
        maxWidth: 700,
        margin: "80px auto",
        padding: "0 40px",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: 40, marginBottom: 16 }}>
        Accelerate your tech career
      </h1>
      <p style={{ fontSize: 18, color: "#6b7280", marginBottom: 40 }}>
        Track your job applications, identify skill gaps, and get personalized
        recommendations to land your next role faster.
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <Link href="/register">
          <button
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: 8,
              padding: "12px 28px",
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            Get started free
          </button>
        </Link>
        <Link href="/login">
          <button
            style={{
              backgroundColor: "white",
              color: "#374151",
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              padding: "12px 28px",
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            Log in
          </button>
        </Link>
      </div>
    </div>
  );
}
