export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--bg-border)",
        padding: "24px",
        textAlign: "center",
        marginTop: "auto",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          color: "var(--text-muted)",
        }}
      >
        trckr — built for tech candidates
      </span>
    </footer>
  );
}
