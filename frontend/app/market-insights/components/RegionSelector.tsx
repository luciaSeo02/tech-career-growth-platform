type Props = {
  regions: string[];
  selected: string;
  onChange: (region: string) => void;
};

export default function RegionSelector({ regions, selected, onChange }: Props) {
  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 32 }}
    >
      {regions.map((region) => {
        const isActive = selected === region;
        return (
          <button
            key={region}
            type="button"
            onClick={() => onChange(region)}
            style={{
              padding: "6px 16px",
              borderRadius: 999,
              border: "1px solid",
              borderColor: isActive ? "var(--accent)" : "var(--bg-border)",
              backgroundColor: isActive ? "var(--accent-dim)" : "transparent",
              color: isActive ? "var(--accent)" : "var(--text-muted)",
              fontSize: "0.8rem",
              fontFamily: "var(--font-mono)",
              cursor: "pointer",
              transition: "all 0.15s ease",
              letterSpacing: "0.03em",
            }}
          >
            {region}
          </button>
        );
      })}
    </div>
  );
}
