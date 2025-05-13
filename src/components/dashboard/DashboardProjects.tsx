import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Project = {
  id: string;
  title: string;
  tradesperson: string;
  startDate: string;
  expectedEndDate: string;
  progress: number;
  status: 'planning' | 'in_progress' | 'on_hold' | 'completed';
  description: string;
};

const DashboardProjects = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "P001",
      title: "Kitchen Renovation",
      tradesperson: "Bob's Construction",
      startDate: "2024-03-01",
      expectedEndDate: "2024-04-15",
      progress: 35,
      status: "in_progress",
      description: "Complete kitchen renovation including cabinets and countertops"
    },
    {
      id: "P002",
      title: "Bathroom Plumbing",
      tradesperson: "Mike's Plumbing",
      startDate: "2024-03-10",
      expectedEndDate: "2024-03-20",
      progress: 75,
      status: "in_progress",
      description: "Fix leaking pipes and install new shower"
    }
  ]);

  const getStatusColor = (status: Project['status']) => {
    const colors = {
      planning: "bg-blue-100 text-blue-800",
      in_progress: "bg-yellow-100 text-yellow-800",
      on_hold: "bg-orange-100 text-orange-800",
      completed: "bg-green-100 text-green-800"
    };
    return colors[status];
  };

  return (
    <div className="space-y-6">
      {projects.map((project) => (
        <Card key={project.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{project.title}</CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  Tradesperson: {project.tradesperson}
                </p>
              </div>
              <Badge className={getStatusColor(project.status)}>
                {project.status.replace('_', ' ')}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Progress</p>
                <div className="flex items-center gap-4">
                  <Progress value={project.progress} className="flex-1" />
                  <span className="text-sm font-medium">{project.progress}%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Start Date</p>
                  <p>{project.startDate}</p>
                </div>
                <div>
                  <p className="font-medium">Expected Completion</p>
                  <p>{project.expectedEndDate}</p>
                </div>
              </div>

              <div>
                <p className="font-medium mb-1">Description</p>
                <p className="text-sm text-gray-600">{project.description}</p>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button variant="outline" size="sm">
                  Contact Tradesperson
                </Button>
                {project.status !== 'completed' && (
                  <Button variant="destructive" size="sm">
                    Report Issue
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardProjects; 