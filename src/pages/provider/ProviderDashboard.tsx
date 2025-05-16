import { useState } from "react";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/AuthContext";
import { NewProjectDialog } from "@/components/projects/NewProjectDialog";

interface Project {
  id: string;
  title: string;
  client: string;
  status: "pending" | "in-progress" | "completed";
  dueDate: string;
  description: string;
}

interface Metric {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
}

const mockProjects: Project[] = [
  {
    id: "1",
    title: "Solar Panel Installation",
    client: "John Smith",
    status: "in-progress",
    dueDate: "2024-04-15",
    description: "Installation of 10kW solar panel system with battery storage."
  },
  {
    id: "2",
    title: "Smart Thermostat Setup",
    client: "Sarah Johnson",
    status: "pending",
    dueDate: "2024-04-20",
    description: "Installation and configuration of smart home temperature control system."
  },
  {
    id: "3",
    title: "Water Conservation System",
    client: "Mike Brown",
    status: "completed",
    dueDate: "2024-04-10",
    description: "Installation of water recycling and conservation system."
  }
];

const metrics: Metric[] = [
  {
    label: "Active Projects",
    value: "5",
    change: "+2",
    trend: "up"
  },
  {
    label: "Completed Projects",
    value: "23",
    change: "+3",
    trend: "up"
  },
  {
    label: "Client Satisfaction",
    value: "4.8/5",
    change: "+0.2",
    trend: "up"
  }
];

export default function ProviderDashboard() {
  const { profile } = useAuth();
  const [projects] = useState<Project[]>(mockProjects);
  const [newProjectDialogOpen, setNewProjectDialogOpen] = useState(false);

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {profile?.full_name || 'Provider'}</h1>
          <p className="text-muted-foreground">Here's your project overview</p>
        </div>
        <Button onClick={() => setNewProjectDialogOpen(true)}>
          <Icons.plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Provider Metrics */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {metrics.map((metric, index) => (
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
                  ) : metric.trend === "down" ? (
                    <Icons.trendingDown className="mr-1 h-4 w-4" />
                  ) : (
                    <Icons.minus className="mr-1 h-4 w-4" />
                  )}
                  {metric.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Projects */}
      <h2 className="text-xl font-semibold mb-4">Current Projects</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Client</p>
                  <p className="font-medium">{project.client}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Due Date</p>
                  <p className="font-medium">
                    {new Date(project.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="text-sm">{project.description}</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Icons.edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icons.message className="mr-2 h-4 w-4" />
                    Message
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <NewProjectDialog 
        open={newProjectDialogOpen}
        onOpenChange={setNewProjectDialogOpen}
      />
    </div>
  );
}
