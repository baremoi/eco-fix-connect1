
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TradeRequest = {
  id: string;
  service: string;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  date: string;
  tradesperson: string;
  description: string;
};

const DashboardTrades = () => {
  const [tradeRequests, setTradeRequests] = useState<TradeRequest[]>([
    {
      id: "TR001",
      service: "Plumbing Repair",
      status: "pending",
      date: "15/03/2024", // UK date format
      tradesperson: "Mike Smith",
      description: "Leaking kitchen sink"
    },
    {
      id: "TR002",
      service: "Electrical Installation",
      status: "in_progress",
      date: "14/03/2024", // UK date format
      tradesperson: "Sarah Johnson",
      description: "New light fixtures installation"
    },
    {
      id: "TR003",
      service: "Carpentry",
      status: "completed",
      date: "10/03/2024", // UK date format
      tradesperson: "John Brown",
      description: "Custom cabinet building"
    }
  ]);

  const getStatusColor = (status: TradeRequest['status']) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-blue-100 text-blue-800";
      case "in_progress":
        return "bg-purple-100 text-purple-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
    }
  };

  const handleCancelRequest = (id: string) => {
    setTradeRequests(requests =>
      requests.map(request =>
        request.id === id ? { ...request, status: 'cancelled' as const } : request
      )
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Trade Requests</CardTitle>
          <Button>New Request</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Tradesperson</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tradeRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.id}</TableCell>
                <TableCell>{request.service}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(request.status)}>
                    {request.status.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>{request.date}</TableCell>
                <TableCell>{request.tradesperson}</TableCell>
                <TableCell>{request.description}</TableCell>
                <TableCell>
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {/* TODO: View details */}}
                    >
                      View
                    </Button>
                    {request.status === 'pending' && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleCancelRequest(request.id)}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DashboardTrades;
