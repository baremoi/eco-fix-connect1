import { useState } from "react";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/AuthContext";

interface ServiceRequest {
  id: string;
  service: string;
  provider: string;
  status: "pending" | "accepted" | "in-progress" | "completed";
  date: string;
}

interface EcoMetric {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
}

const mockRequests: ServiceRequest[] = [
  {
    id: "1",
    service: "Solar Panel Maintenance",
    provider: "EcoSolar Solutions",
    status: "pending",
    date: "2024-04-15"
  },
  {
    id: "2",
    service: "Energy Audit",
    provider: "GreenAudit Pro",
    status: "accepted",
    date: "2024-04-20"
  },
  {
    id: "3",
    service: "Smart Thermostat Installation",
    provider: "SmartHome Eco",
    status: "completed",
    date: "2024-04-10"
  }
];

const ecoMetrics: EcoMetric[] = [
  {
    label: "Energy Savings",
    value: "450 kWh",
    change: "+15%",
    trend: "up"
  },
  {
    label: "Carbon Footprint",
    value: "2.5 tons",
    change: "-20%",
    trend: "down"
  },
  {
    label: "Water Usage",
    value: "12,000 L",
    change: "-10%",
    trend: "down"
  }
];

export default function Dashboard() {
  const { profile } = useAuth();
  const [requests] = useState<ServiceRequest[]>(mockRequests);

  const getStatusColor = (status: ServiceRequest["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-purple-100 text-purple-800";
      case "completed":
        return "bg-green-100 text-green-800";
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {profile?.full_name || 'User'}</h1>
          <p className="text-muted-foreground">Here's your eco-home overview</p>
        </div>
        <Button>
          <Icons.plus className="mr-2 h-4 w-4" />
          New Service Request
        </Button>
      </div>

      {/* Eco Metrics */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {ecoMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{metric.value}</div>
                <Badge variant={metric.trend === "up" ? "default" : "secondary"}>
                  {metric.trend === "up" ? (
                    <Icons.trendingUp className="mr-1 h-4 w-4" />
                  ) : (
                    <Icons.trendingDown className="mr-1 h-4 w-4" />
                  )}
                  {metric.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Service Requests */}
      <h2 className="text-xl font-semibold mb-4">Recent Service Requests</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {requests.map((request) => (
          <Card key={request.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{request.service}</CardTitle>
                <Badge className={getStatusColor(request.status)}>
                  {request.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Provider</p>
                  <p className="font-medium">{request.provider}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">
                    {new Date(request.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Icons.message className="mr-2 h-4 w-4" />
                    Contact
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icons.info className="mr-2 h-4 w-4" />
                    Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
