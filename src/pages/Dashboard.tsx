
import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardProjects from "@/components/dashboard/DashboardProjects";
import DashboardTrades from "@/components/dashboard/DashboardTrades";
import DashboardHistory from "@/components/dashboard/DashboardHistory";
import DashboardProfile from "@/components/dashboard/DashboardProfile";
import DashboardNotifications from "@/components/dashboard/DashboardNotifications";
import { useMockAuth } from "@/lib/mockAuth";
import { seedNotifications } from "@/services/seedNotifications";

export default function Dashboard() {
  const { user } = useMockAuth();

  // Seed initial notifications for demo purposes
  useEffect(() => {
    if (user?.id) {
      seedNotifications(user.id);
    }
  }, [user?.id]);

  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your account.
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="trades">Trades</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <DashboardProfile />
            <DashboardNotifications />
          </div>
          <DashboardHistory />
        </TabsContent>

        <TabsContent value="projects">
          <DashboardProjects />
        </TabsContent>

        <TabsContent value="trades">
          <DashboardTrades />
        </TabsContent>

        <TabsContent value="notifications">
          <DashboardNotifications />
        </TabsContent>
      </Tabs>
    </div>
  );
}
