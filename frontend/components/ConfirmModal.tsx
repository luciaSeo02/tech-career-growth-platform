"use client";

import { useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";

type Props = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  danger = false,
  loading = false,
  onConfirm,
  onCancel,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      onClick={onCancel}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: 24,
        animation: "fadeIn 0.15s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "var(--bg-primary)",
          border: "1px solid var(--bg-border)",
          borderRadius: "var(--radius-md)",
          padding: 28,
          maxWidth: 420,
          width: "100%",
          animation: "scaleIn 0.15s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {danger && (
              <AlertTriangle
                size={20}
                style={{ color: "var(--danger)", flexShrink: 0 }}
              />
            )}
            <h3 style={{ fontSize: "1.1rem", margin: 0 }}>{title}</h3>
          </div>
          <button
            onClick={onCancel}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
              padding: 4,
            }}
          >
            <X size={18} />
          </button>
        </div>

        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--text-secondary)",
            marginBottom: 24,
            lineHeight: 1.5,
          }}
        >
          {message}
        </p>

        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            style={{
              backgroundColor: danger ? "var(--danger)" : undefined,
              borderColor: danger ? "var(--danger)" : undefined,
              color: danger ? "#fff" : undefined,
              padding: "9px 20px",
            }}
          >
            {loading ? "Deleting..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
