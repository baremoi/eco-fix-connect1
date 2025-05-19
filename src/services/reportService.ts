
import { Report } from "@/hooks/useReports";

// Mock service to handle report operations
// This would be replaced with actual Supabase calls in the future

export const reportService = {
  // Fetch reports based on period and type
  async getReports(period: string, type?: string): Promise<Report[]> {
    // Mock data - Would come from Supabase in reality
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

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Filter by type if provided
    if (type) {
      return mockReports.filter(report => report.type === type);
    }
    
    return mockReports;
  },
  
  // Save report data
  async saveReportData(data: any): Promise<void> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Report data saved:", data);
    
    // In a real implementation, this would save to Supabase
    // return supabase.from('reports').insert(data);
  },
  
  // Get detailed report by id
  async getReportById(id: string): Promise<Report | null> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock reports - would come from Supabase in reality
    const mockReports: Report[] = [
      {
        id: "1",
        type: "financial",
        period: "March 2024",
        metrics: [
          { label: "Total Revenue", value: "£12,500" },
          { label: "Projects Completed", value: "8" },
          { label: "Average Project Value", value: "£1,562" }
        ]
      },
      {
        id: "2",
        type: "performance",
        period: "Q1 2024",
        metrics: [
          { label: "Client Satisfaction", value: "4.8/5" },
          { label: "On-time Completion", value: "95%" },
          { label: "Repeat Clients", value: "60%" }
        ]
      },
      {
        id: "3",
        type: "environmental",
        period: "2024 YTD",
        metrics: [
          { label: "CO2 Reduction", value: "25 tons" },
          { label: "Energy Saved", value: "45,000 kWh" },
          { label: "Water Saved", value: "120,000 L" }
        ]
      }
    ];
    
    return mockReports.find(report => report.id === id) || null;
  }
};

// Helper function to get formatted period label
function getPeriodLabel(periodKey: string): string {
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
