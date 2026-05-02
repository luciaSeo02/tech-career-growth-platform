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
    try {
      await apiDeleteJobApplication(id);
      setApplications((prev) => prev.filter((app) => app.id !== id));
    } catch (err: unknown) {
      if (err instanceof Error) setErrorMessage(err.message);
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
