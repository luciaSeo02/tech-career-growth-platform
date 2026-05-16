"use client";

import { useState } from "react";
import Link from "next/link";
import { apiAnalyzeCv, CvAnalysis } from "@/utils/api";
import PrivatePageGuard from "@/components/PrivatePageGuard";
import LoadingScreen from "@/components/LoadingScreen";
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Sparkles,
  AlertTriangle,
} from "lucide-react";

function CvAnalyzerContent() {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<CvAnalysis | null>(null);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.type !== "application/pdf") {
      setError("Only PDF files are supported");
      return;
    }

    if (selected.size > 5 * 1024 * 1024) {
      setError("File must be smaller than 5MB");
      return;
    }

    setError("");
    setFile(selected);
    setAnalysis(null);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setAnalyzing(true);
    setError("");

    try {
      const result = await apiAnalyzeCv(file);
      setAnalysis(result);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return "var(--success)";
    if (score >= 50) return "var(--warning)";
    return "var(--danger)";
  };

  if (analyzing) return <LoadingScreen message="Analyzing your CV..." />;

  return (
    <div className="page animate-in">
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ marginBottom: 6 }}>CV Analyzer</h1>
        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
          Upload your CV and get AI-powered feedback based on your target role
        </p>
      </div>

      <div
        style={{
          backgroundColor: "var(--bg-elevated)",
          border: "1px solid var(--warning)",
          borderRadius: "var(--radius-md)",
          padding: "12px 16px",
          marginBottom: 24,
          fontSize: "0.8rem",
          color: "var(--text-secondary)",
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
        }}
      >
        <AlertTriangle
          size={16}
          style={{ color: "var(--warning)", flexShrink: 0, marginTop: 2 }}
        />
        <span>
          AI analysis is a suggestion, not absolute truth. Use it as a guide and
          always apply your own judgment.
        </span>
      </div>

      {error && (
        <div
          style={{
            backgroundColor: "var(--bg-elevated)",
            border: "1px solid var(--danger)",
            borderRadius: "var(--radius-md)",
            padding: "12px 16px",
            marginBottom: 20,
            fontSize: "0.875rem",
            color: "var(--danger)",
          }}
        >
          {error}
        </div>
      )}

      {!analysis && (
        <div
          className="card"
          style={{
            textAlign: "center",
            padding: "48px 32px",
            borderStyle: "dashed",
          }}
        >
          <Upload
            size={40}
            style={{ color: "var(--text-muted)", marginBottom: 16 }}
          />
          <h3 style={{ marginBottom: 8 }}>Upload your CV</h3>
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--text-muted)",
              marginBottom: 20,
            }}
          >
            PDF format, max 5MB
          </p>

          <label
            htmlFor="cv-upload"
            style={{
              display: "inline-block",
              padding: "10px 24px",
              backgroundColor: "var(--accent)",
              color: "var(--bg-base)",
              borderRadius: "var(--radius-md)",
              cursor: "pointer",
              fontSize: "0.875rem",
              fontWeight: 600,
            }}
          >
            {file ? "Change file" : "Select PDF"}
          </label>
          <input
            id="cv-upload"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          {file && (
            <div
              style={{
                marginTop: 24,
                padding: "12px 16px",
                backgroundColor: "var(--bg-elevated)",
                border: "1px solid var(--bg-border)",
                borderRadius: "var(--radius-md)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  minWidth: 0,
                }}
              >
                <FileText
                  size={18}
                  style={{ color: "var(--accent)", flexShrink: 0 }}
                />
                <span
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-primary)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {file.name}
                </span>
              </div>
              <button
                onClick={handleAnalyze}
                type="submit"
                style={{
                  padding: "7px 16px",
                  fontSize: "0.8rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  flexShrink: 0,
                }}
              >
                <Sparkles size={14} />
                Analyze with AI
              </button>
            </div>
          )}
        </div>
      )}

      {analysis && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            className="card"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                border: `4px solid ${getScoreColor(analysis.overallScore)}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "1.75rem",
                  fontWeight: 600,
                  color: getScoreColor(analysis.overallScore),
                }}
              >
                {analysis.overallScore}
              </span>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: 8,
                }}
              >
                Overall fit score
              </div>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {analysis.summary}
              </p>
            </div>
          </div>

          {analysis.strengths.length > 0 && (
            <div
              className="card"
              style={{ borderLeft: "2px solid var(--success)" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 12,
                  fontSize: "0.75rem",
                  color: "var(--success)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  fontWeight: 600,
                }}
              >
                <CheckCircle2 size={14} />
                Strengths
              </div>
              <ul style={{ paddingLeft: 20, margin: 0 }}>
                {analysis.strengths.map((s, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--text-secondary)",
                      marginBottom: 6,
                      lineHeight: 1.5,
                    }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {analysis.weaknesses.length > 0 && (
            <div
              className="card"
              style={{ borderLeft: "2px solid var(--warning)" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 12,
                  fontSize: "0.75rem",
                  color: "var(--warning)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  fontWeight: 600,
                }}
              >
                <AlertCircle size={14} />
                Areas to improve
              </div>
              <ul style={{ paddingLeft: 20, margin: 0 }}>
                {analysis.weaknesses.map((w, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--text-secondary)",
                      marginBottom: 6,
                      lineHeight: 1.5,
                    }}
                  >
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {analysis.suggestions.length > 0 && (
            <div
              className="card"
              style={{ borderLeft: "2px solid var(--accent)" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 12,
                  fontSize: "0.75rem",
                  color: "var(--accent)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  fontWeight: 600,
                }}
              >
                <Lightbulb size={14} />
                Suggestions
              </div>
              <ul style={{ paddingLeft: 20, margin: 0 }}>
                {analysis.suggestions.map((s, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--text-secondary)",
                      marginBottom: 6,
                      lineHeight: 1.5,
                    }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
            }}
            className="market-grid-2"
          >
            {analysis.skillsDetected.length > 0 && (
              <div className="card">
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: 12,
                  }}
                >
                  Skills detected
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {analysis.skillsDetected.map((s) => (
                    <span
                      key={s}
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--success)",
                        backgroundColor: "#10b98115",
                        border: "1px solid #10b98140",
                        borderRadius: 999,
                        padding: "3px 10px",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {analysis.skillGaps.length > 0 && (
              <div className="card">
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: 12,
                  }}
                >
                  Missing for your target role
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {analysis.skillGaps.map((s) => (
                    <span
                      key={s}
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--danger)",
                        backgroundColor: "#ef444415",
                        border: "1px solid #ef444440",
                        borderRadius: 999,
                        padding: "3px 10px",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button
              onClick={() => {
                setAnalysis(null);
                setFile(null);
              }}
            >
              Analyze another CV
            </button>
            <Link href="/recommendations">
              <button type="submit">View learning recommendations →</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CvAnalyzerPage() {
  return (
    <PrivatePageGuard>
      <CvAnalyzerContent />
    </PrivatePageGuard>
  );
}
