import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type HistoryItem = {
  id: string;
  type: 'trade' | 'project';
  title: string;
  tradesperson: string;
  date: string;
  cost: number;
  status: 'completed' | 'cancelled';
  rating?: number;
  review?: string;
};

const DashboardHistory = () => {
  // Use useState but omit the setter since it's not currently used
  const [history] = useState<HistoryItem[]>([
    {
      id: "H001",
      type: "trade",
      title: "Emergency Plumbing",
      tradesperson: "Mike's Plumbing",
      date: "2024-02-15",
      cost: 150,
      status: "completed",
      rating: 5,
      review: "Excellent service, fixed the issue quickly"
    },
    {
      id: "H002",
      type: "project",
      title: "Bathroom Renovation",
      tradesperson: "Home Renovations Inc",
      date: "2024-01-20",
      cost: 5000,
      status: "completed",
      rating: 4,
      review: "Great work overall, slight delay in completion"
    },
    {
      id: "H003",
      type: "trade",
      title: "Electrical Repair",
      tradesperson: "Elite Electricians",
      date: "2024-01-10",
      cost: 200,
      status: "cancelled"
    }
  ]);

  const getStatusColor = (status: HistoryItem['status']) => {
    return status === 'completed' ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  };

  const renderStars = (rating?: number) => {
    if (!rating) return null;
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  const filterByType = (type: HistoryItem['type']) => {
    return history.filter(item => item.type === type);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Service History</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All History</TabsTrigger>
            <TabsTrigger value="trades">Trades</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>

          {['all', 'trades', 'projects'].map((tab) => (
            <TabsContent key={tab} value={tab}>
              <div className="space-y-4">
                {(tab === 'all' ? history : filterByType(tab as 'trade' | 'project')).map((item) => (
                  <Card key={item.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-sm text-gray-500">{item.tradesperson}</p>
                          <p className="text-sm">Date: {item.date}</p>
                          <p className="text-sm">Cost: ${item.cost}</p>
                          {item.rating && (
                            <p className="text-sm text-yellow-500 mt-1">
                              {renderStars(item.rating)}
                            </p>
                          )}
                          {item.review && (
                            <p className="text-sm text-gray-600 mt-1">
                              "{item.review}"
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                          <div className="mt-2">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DashboardHistory;
