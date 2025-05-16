
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardProfile from "@/components/dashboard/DashboardProfile";

export default function Settings() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 md:grid-cols-3 mb-6">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <DashboardProfile />
        </TabsContent>

        <TabsContent value="security">
          <div className="card p-6 bg-white border rounded-lg shadow">
            <h3 className="text-lg font-medium">Security Settings</h3>
            <p className="text-muted-foreground">
              For detailed security settings, please visit your profile page.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="appearance">
          <div className="card p-6 bg-white border rounded-lg shadow">
            <h3 className="text-lg font-medium">Appearance Settings</h3>
            <p className="text-muted-foreground">
              Customize the appearance of the application.
            </p>
            <div className="mt-4">
              <p>Theme preferences and other appearance settings will be available here.</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
