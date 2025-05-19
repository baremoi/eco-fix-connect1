
import { useState } from "react";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NewProjectDialog } from "@/components/projects/NewProjectDialog";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";

interface Project {
  id: string;
  title: string;
  client: string;
  status: "pending" | "in-progress" | "completed";
  dueDate: string;
  description: string;
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

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [newProjectDialogOpen, setNewProjectDialogOpen] = useState(false);
  const { profile } = useAuth();

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

  const handleCreateProject = (projectData: any) => {
    const newProject = {
      id: (projects.length + 1).toString(),
      title: projectData.title,
      client: projectData.clientName,
      status: "pending" as const,
      dueDate: projectData.dueDate.toISOString().split('T')[0],
      description: projectData.description
    };
    
    setProjects([newProject, ...projects]);
    toast.success(`Project "${projectData.title}" created successfully!`);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Button onClick={() => setNewProjectDialogOpen(true)}>
          <Icons.plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{project.title}</CardTitle>
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
                  <p className="font-medium">{new Date(project.dueDate).toLocaleDateString()}</p>
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
                  <Button 
                    variant="outline" 
                    size="sm"
                    as={Link}
                    to={`/messages/project/${project.id}`}
                  >
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
        onCreateProject={handleCreateProject}
      />
    </div>
  );
}
