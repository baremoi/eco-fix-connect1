import { useState } from "react";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Report {
  id: string;
  type: "financial" | "performance" | "environmental";
  period: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

const mockReports: Report[] = [
  {
    id: "1",
    type: "financial",
    period: "March 2024",
    metrics: [
      { label: "Total Revenue", value: "$12,500" },
      { label: "Projects Completed", value: "8" },
      { label: "Average Project Value", value: "$1,562" }
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

export default function Reports() {
  const [reports] = useState<Report[]>(mockReports);
  const [selectedPeriod, setSelectedPeriod] = useState("march-2024");

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reports</h1>
        <div className="flex items-center space-x-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="march-2024">March 2024</SelectItem>
              <SelectItem value="q1-2024">Q1 2024</SelectItem>
              <SelectItem value="2024-ytd">2024 YTD</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Icons.download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <CardTitle className="text-xl capitalize">{report.type} Report</CardTitle>
              <p className="text-sm text-muted-foreground">{report.period}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {report.metrics.map((metric, index) => (
                  <div key={index}>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <p className="text-2xl font-semibold">{metric.value}</p>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <Icons.barChart className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 