
import { Report } from "@/hooks/useReports";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent
} from "@/components/ui/chart";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";

interface ReportDetailViewProps {
  report: Report;
}

export function ReportDetailView({ report }: ReportDetailViewProps) {
  // Transform report metrics into chart data
  const chartData = report.metrics.map(metric => ({
    name: metric.label,
    value: parseFloat(metric.value.replace(/[^0-9.]/g, '')) || 0,
    fullValue: metric.value,
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl capitalize">{report.type} Report Details</CardTitle>
        <p className="text-sm text-muted-foreground">{report.period}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Metrics display */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {report.metrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium text-muted-foreground">{metric.label}</h3>
                  <p className="text-3xl font-bold">{metric.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Chart */}
          <div className="h-80 mt-6">
            <ChartContainer
              config={{
                value: {
                  color: "#8B5CF6",
                },
              }}
            >
              <BarChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <ChartTooltipContent
                          active={active}
                          payload={payload}
                        />
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Bar dataKey="value" name="Value" fill="var(--color-value)" />
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
