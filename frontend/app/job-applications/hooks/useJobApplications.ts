import { useEffect, useState } from "react";
import { JobApplication, JobApplicationStats } from "@/types/user";
import {
  apiGetJobApplications,
  apiGetJobApplicationStats,
  apiDeleteJobApplication,
} from "@/utils/api";

export function useJobApplications() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [stats, setStats] = useState<JobApplicationStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [apps, jobStats] = await Promise.all([
          apiGetJobApplications(),
          apiGetJobApplicationStats(),
        ]);
        setApplications(apps);
        setStats(jobStats);
      } catch {
        setErrorMessage("Failed to load applications");
      } finally {
        setLoading(false);
      }
    };
    void fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?",
    );
    if (!confirmed) return;

    try {
      await apiDeleteJobApplication(id);
      setApplications((prev) => prev.filter((a) => a.id !== id));
      setStats((prev) => {
        if (!prev) return prev;
        return { ...prev, total: prev.total - 1 };
      });
    } catch {
      setErrorMessage("Failed to delete application");
    }
  };

  return {
    applications,
    stats,
    loading,
    errorMessage,
    handleDelete,
  };
}
