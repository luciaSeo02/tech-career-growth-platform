"use client";

import { useMarketInsights } from "./hooks/useMarketInsights";
import RegionSelector from "./components/RegionSelector";
import MarketStatsCards from "./components/MarketStatsCards";
import TopSkillsChart from "./components/TopSkillsChart";
import SkillsByCategory from "./components/SkillsByCategory";
import RoleDistributionChart from "./components/RoleDistributionChart";
import WorkModeChart from "./components/WorkModeChart";
import SkillGapSection from "./components/SkillGapSection";
import PrivatePageGuard from "@/components/PrivatePageGuard";
import LoadingScreen from "@/components/LoadingScreen";

function MarketInsightsContent() {
  const {
    overview,
    regions,
    selectedRegion,
    setSelectedRegion,
    skillGap,
    loading,
    errorMessage,
  } = useMarketInsights();

  if (loading) return <LoadingScreen message="Loading market data..." />;

  return (
    <div className="page animate-in">
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ marginBottom: 6 }}>Market Insights</h1>
        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
          Skill demand and trends across the European tech market · powered by{" "}
          <a
            href="https://www.adzuna.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--accent)", textDecoration: "none" }}
          >
            Adzuna
          </a>
        </p>
      </div>

      {errorMessage && (
        <div
          style={{
            backgroundColor: "var(--bg-elevated)",
            border: "1px solid var(--danger)",
            borderRadius: "var(--radius-md)",
            padding: "12px 16px",
            marginBottom: 24,
            fontSize: "0.875rem",
            color: "var(--danger)",
          }}
        >
          {errorMessage}
        </div>
      )}

      <RegionSelector
        regions={regions}
        selected={selectedRegion}
        onChange={setSelectedRegion}
      />

      {overview && (
        <>
          <MarketStatsCards overview={overview} region={selectedRegion} />

          <div
            className="market-grid-2"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginBottom: 16,
            }}
          >
            <TopSkillsChart skills={overview.topSkills} />
            <SkillsByCategory byCategory={overview.byCategory} />
          </div>

          <div
            className="market-grid-2"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginBottom: 16,
            }}
          >
            <RoleDistributionChart data={overview.roleDistribution} />
            <WorkModeChart data={overview.workModeDistribution} />
          </div>

          <SkillGapSection skillGap={skillGap} />
        </>
      )}
    </div>
  );
}

export default function MarketInsightsPage() {
  return (
    <PrivatePageGuard>
      <MarketInsightsContent />
    </PrivatePageGuard>
  );
}
