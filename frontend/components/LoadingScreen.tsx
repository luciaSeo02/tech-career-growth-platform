type Props = {
  message?: string;
};

export default function LoadingScreen({ message = "Loading..." }: Props) {
  return (
    <div
      className="page"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        gap: 12,
      }}
    >
      <div className="spinner" />
      <span
        style={{
          color: "var(--text-muted)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.875rem",
        }}
      >
        {message}
      </span>
    </div>
  );
}
