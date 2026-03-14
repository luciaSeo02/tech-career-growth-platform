import { useEffect, useState } from "react";
import { MarketOverview, SkillGap } from "@/types/user";
import {
  apiGetMarketOverview,
  apiGetMarketRegions,
  apiGetSkillGap,
} from "@/utils/api";

export function useMarketInsights() {
  const [overview, setOverview] = useState<MarketOverview | null>(null);
  const [regions, setRegions] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>("Global");
  const [skillGap, setSkillGap] = useState<SkillGap | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const data = await apiGetMarketRegions();
        setRegions(["Global", ...data.filter((r) => r !== "Global")]);
      } catch {
        setErrorMessage("Failed to load regions");
      }
    };
    void fetchRegions();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [overviewData, gapData] = await Promise.all([
          apiGetMarketOverview(
            selectedRegion === "Global" ? undefined : selectedRegion,
          ),
          apiGetSkillGap(),
        ]);
        setOverview(overviewData);
        setSkillGap(gapData);
      } catch {
        setErrorMessage("Failed to load market data");
      } finally {
        setLoading(false);
      }
    };
    void fetchData();
  }, [selectedRegion]);

  return {
    overview,
    regions,
    selectedRegion,
    setSelectedRegion,
    skillGap,
    loading,
    errorMessage,
  };
}
