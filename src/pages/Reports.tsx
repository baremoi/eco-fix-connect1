
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
import { ReportsDataForm } from "@/components/reports/ReportsDataForm";
import { useReports } from "@/hooks/useReports";

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("march-2024");
  const [showForm, setShowForm] = useState(false);
  
  const { reports, isLoading } = useReports(selectedPeriod);

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Reports</h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
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
          <div className="flex gap-2">
            <Button onClick={() => setShowForm(true)}>
              <Icons.plus className="mr-2 h-4 w-4" />
              Add Data
            </Button>
            <Button variant="outline">
              <Icons.download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add Report Data</CardTitle>
          </CardHeader>
          <CardContent>
            <ReportsDataForm 
              period={selectedPeriod} 
              onSuccess={() => setShowForm(false)}
              onCancel={() => setShowForm(false)}
            />
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Icons.spinner className="h-8 w-8 animate-spin" />
        </div>
      ) : (
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
      )}
    </div>
  );
}
