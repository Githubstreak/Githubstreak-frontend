import React from "react";
import MobileImpactWidget from "../components/MobileImpactWidget";
import { getProjects } from "../APIs/ProjectsAPI";
import { getImpactfulProgress } from "../utils/impactfulProgress";

export default function WidgetPage() {
  const [impactful, setImpactful] = React.useState({
    topContributor: null,
    topStreak: null,
    recentMilestone: null,
  });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await getProjects();
        const projects = response.projects || response || [];
        setImpactful(getImpactfulProgress(projects));
      } catch (e) {
        setImpactful({
          topContributor: null,
          topStreak: null,
          recentMilestone: null,
        });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading ? (
        <div className="text-white text-lg">Loading...</div>
      ) : (
        <MobileImpactWidget {...impactful} />
      )}
    </div>
  );
}
