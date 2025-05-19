
import { useState, useEffect } from "react";

interface ReportMetric {
  label: string;
  value: string;
}

export interface Report {
  id: string;
  type: "financial" | "performance" | "environmental";
  period: string;
  metrics: ReportMetric[];
}

export function useReports(period: string) {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchReports() {
      setIsLoading(true);
      try {
        // In the future, this would be a call to Supabase
        // For now, we'll use mock data
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
        
        // Mock data with pound sign (£) instead of dollar sign ($)
        const mockReports: Report[] = [
          {
            id: "1",
            type: "financial",
            period: getPeriodLabel(period),
            metrics: [
              { label: "Total Revenue", value: "£12,500" },
              { label: "Projects Completed", value: "8" },
              { label: "Average Project Value", value: "£1,562" }
            ]
          },
          {
            id: "2",
            type: "performance",
            period: getPeriodLabel(period),
            metrics: [
              { label: "Client Satisfaction", value: "4.8/5" },
              { label: "On-time Completion", value: "95%" },
              { label: "Repeat Clients", value: "60%" }
            ]
          },
          {
            id: "3",
            type: "environmental",
            period: getPeriodLabel(period),
            metrics: [
              { label: "CO2 Reduction", value: "25 tons" },
              { label: "Energy Saved", value: "45,000 kWh" },
              { label: "Water Saved", value: "120,000 L" }
            ]
          }
        ];
        
        setReports(mockReports);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        console.error("Error fetching reports:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchReports();
  }, [period]);

  function getPeriodLabel(periodKey: string) {
    switch (periodKey) {
      case "march-2024":
        return "March 2024";
      case "q1-2024":
        return "Q1 2024";
      case "2024-ytd":
        return "2024 YTD";
      default:
        return periodKey;
    }
  }

  return {
    reports,
    isLoading,
    error
  };
}
