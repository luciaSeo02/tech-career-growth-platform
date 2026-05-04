import { BarChart3, ClipboardList, Compass, Target } from "lucide-react";
import Link from "next/link";

const FEATURES = [
  {
    icon: <ClipboardList size={28} style={{ color: "var(--accent)" }} />,
    title: "Track applications",
    description:
      "Log every job you apply to. Track status, source, salary, and required skills in one place.",
  },
  {
    icon: <Target size={28} style={{ color: "var(--accent)" }} />,
    title: "Identify skill gaps",
    description:
      "Compare your profile against market demand. Know exactly what to learn next.",
  },
  {
    icon: <BarChart3 size={28} style={{ color: "var(--accent)" }} />,
    title: "Market insights",
    description:
      "See what technologies are growing in your region. Stay ahead of the curve.",
  },
  {
    icon: <Compass size={28} style={{ color: "var(--accent)" }} />,
    title: "Career strategy",
    description:
      "Get a personalized weekly plan. Learn, build, and apply with direction.",
  },
];

const STATS = [
  { value: "10k+", label: "jobs analyzed" },
  { value: "85%", label: "faster job search" },
  { value: "3x", label: "more interviews" },
];

export default function LandingPage() {
  return (
    <main style={{ overflow: "hidden" }}>
      <section
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "100px 24px 80px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 400,
            background:
              "radial-gradient(ellipse at center, var(--accent-dim) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "var(--bg-elevated)",
            border: "1px solid var(--bg-border)",
            borderRadius: 999,
            padding: "6px 16px",
            marginBottom: 32,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: "var(--accent)",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--text-secondary)",
              letterSpacing: "0.05em",
            }}
          >
            built for tech candidates
          </span>
        </div>

        <h1
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: 24,
            color: "var(--text-primary)",
          }}
        >
          Accelerate your
          <br />
          <span style={{ color: "var(--accent)" }}>tech career</span>
        </h1>

        <p
          style={{
            fontSize: "1.125rem",
            color: "var(--text-secondary)",
            maxWidth: 520,
            margin: "0 auto 40px",
            lineHeight: 1.7,
          }}
        >
          Track applications, close skill gaps, and get personalized strategies
          to land your next role faster.
        </p>

        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link href="/register">
            <button
              type="submit"
              style={{
                padding: "12px 32px",
                fontSize: "0.95rem",
                fontWeight: 600,
              }}
            >
              Get started free →
            </button>
          </Link>
          <Link href="/login">
            <button
              style={{
                padding: "12px 32px",
                fontSize: "0.95rem",
              }}
            >
              Log in
            </button>
          </Link>
        </div>
      </section>

      <section
        style={{
          borderTop: "1px solid var(--bg-border)",
          borderBottom: "1px solid var(--bg-border)",
          backgroundColor: "var(--bg-surface)",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "40px 24px",
            display: "flex",
            justifyContent: "center",
            gap: 80,
            flexWrap: "wrap",
          }}
        >
          {STATS.map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "2rem",
                  fontWeight: 600,
                  color: "var(--accent)",
                  letterSpacing: "-0.02em",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-muted)",
                  marginTop: 4,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: 8,
            fontSize: "1.75rem",
          }}
        >
          Everything you need
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "var(--text-muted)",
            marginBottom: 48,
            fontSize: "0.95rem",
          }}
        >
          From your first application to your first offer.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 16,
          }}
        >
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="card"
              style={{ position: "relative", overflow: "hidden" }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "1.5rem",
                  color: "var(--accent)",
                  marginBottom: 16,
                }}
              >
                {f.icon}
              </div>
              <h3 style={{ marginBottom: 8, fontSize: "1rem" }}>{f.title}</h3>
              <p
                style={{
                  fontSize: "0.875rem",
                  lineHeight: 1.6,
                  color: "var(--text-muted)",
                }}
              >
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          borderTop: "1px solid var(--bg-border)",
          backgroundColor: "var(--bg-surface)",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "80px 24px",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: 16, fontSize: "2rem" }}>
            Ready to level up?
          </h2>
          <p style={{ color: "var(--text-muted)", marginBottom: 32 }}>
            Join developers who are taking control of their career growth.
          </p>
          <Link href="/register">
            <button
              type="submit"
              style={{ padding: "12px 32px", fontSize: "0.95rem" }}
            >
              Start for free →
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
