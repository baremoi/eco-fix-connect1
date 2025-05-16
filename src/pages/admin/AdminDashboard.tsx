import { useAuth } from "@/lib/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

interface Metric {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
}

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "tradesperson";
  joinDate: string;
}

const metrics: Metric[] = [
  {
    label: "Total Users",
    value: "124",
    change: "+12",
    trend: "up"
  },
  {
    label: "Active Projects",
    value: "38",
    change: "+5",
    trend: "up"
  },
  {
    label: "Average Rating",
    value: "4.7/5",
    change: "+0.3",
    trend: "up"
  },
  {
    label: "Service Providers",
    value: "21",
    change: "+2",
    trend: "up"
  }
];

const recentUsers: User[] = [
  {
    id: "u1",
    name: "John Doe",
    email: "john@example.com",
    role: "tradesperson",
    joinDate: "2024-04-14"
  },
  {
    id: "u2",
    name: "Alice Smith",
    email: "alice@example.com",
    role: "user",
    joinDate: "2024-04-13"
  },
  {
    id: "u3",
    name: "Robert Brown",
    email: "robert@example.com",
    role: "user",
    joinDate: "2024-04-11"
  },
  {
    id: "u4",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "tradesperson",
    joinDate: "2024-04-10"
  },
  {
    id: "u5",
    name: "Michael Wilson",
    email: "michael@example.com",
    role: "user",
    joinDate: "2024-04-08"
  }
];

export default function AdminDashboard() {
  const { profile } = useAuth();
  const [users] = useState<User[]>(recentUsers);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {profile?.full_name || 'Admin'}</p>
        </div>
      </div>

      {/* Admin Metrics */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
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

      {/* Recent Users */}
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Users</CardTitle>
          <Link to="/admin/team">
            <Button variant="ghost" size="sm">
              View All
              <Icons.chevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === "tradesperson" ? "default" : "secondary"}>
                      {user.role === "tradesperson" ? "Provider" : "User"}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Icons.settings className="mr-2 h-4 w-4" />
                      Manage
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">View detailed platform performance metrics and user engagement statistics.</p>
            <Link to="/admin/analytics">
              <Button>
                <Icons.barChart className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Manage user accounts, permissions, and roles for platform access.</p>
            <Link to="/admin/team">
              <Button>
                <Icons.team className="mr-2 h-4 w-4" />
                Manage Users
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>System Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Configure platform settings, notifications, and application parameters.</p>
            <Link to="/dashboard/settings">
              <Button>
                <Icons.settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
