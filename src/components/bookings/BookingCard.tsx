
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, XCircle, CalendarIcon, Star, Ban } from "lucide-react";

interface BookingCardProps {
  booking: any;
  onCancel: (id: string) => void;
  onComplete: (id: string) => void;
  onReview: (booking: any) => void;
}

export function BookingCard({ booking, onCancel, onComplete, onReview }: BookingCardProps) {
  const isPast = booking.status === 'completed' || booking.status === 'cancelled';
  const canReview = booking.status === 'completed';
  const canCancel = booking.status === 'pending' || booking.status === 'confirmed';
  const canComplete = booking.status === 'confirmed';
  
  const getStatusIcon = () => {
    switch (booking.status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'confirmed':
        return <CheckCircle2 className="h-5 w-5 text-blue-500" />;
      default:
        return <Clock className="h-5 w-5 text-orange-500" />;
    }
  };

  const getStatusColor = () => {
    switch (booking.status) {
      case 'completed': return "bg-green-100 text-green-800 hover:bg-green-200";
      case 'cancelled': return "bg-red-100 text-red-800 hover:bg-red-200";
      case 'confirmed': return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      default: return "bg-orange-100 text-orange-800 hover:bg-orange-200";
    }
  };

  const getPaymentStatusBadge = () => {
    if (!booking.paymentStatus) return null;

    switch (booking.paymentStatus) {
      case 'paid':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Payment Complete</Badge>;
      case 'processing':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Processing</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-orange-100 text-orange-800">Payment Pending</Badge>;
      case 'failed':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Payment Failed</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold mb-2">{booking.serviceName}</h3>
            <p className="text-muted-foreground mb-1">Provider: {booking.providerName}</p>
            
            <div className="flex items-center gap-1 text-muted-foreground mb-1">
              <CalendarIcon className="h-4 w-4" />
              <span>{new Date(booking.date).toLocaleDateString()} at {booking.time}</span>
            </div>

            {booking.notes && (
              <p className="text-sm text-muted-foreground mt-2 italic">
                "{booking.notes}"
              </p>
            )}

            <div className="flex flex-wrap gap-2 mt-3">
              <Badge className={getStatusColor()}>
                <span className="flex items-center gap-1">
                  {getStatusIcon()}
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </Badge>
              
              {getPaymentStatusBadge()}
            </div>
          </div>

          <div className="text-right">
            {booking.paymentAmount && (
              <div className="bg-slate-100 px-3 py-1 rounded-md mb-2">
                <p className="text-lg font-medium">£{booking.paymentAmount.toFixed(2)}</p>
                {booking.paymentDate && (
                  <p className="text-xs text-muted-foreground">
                    Paid on {new Date(booking.paymentDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-6 py-4 bg-muted/50 flex flex-wrap gap-2">
        {canReview && (
          <Button size="sm" variant="outline" onClick={() => onReview(booking)} className="gap-1">
            <Star className="h-4 w-4" />
            Leave Review
          </Button>
        )}
        
        {canComplete && (
          <Button size="sm" variant="outline" onClick={() => onComplete(booking.id)}>
            <CheckCircle2 className="h-4 w-4 mr-1" />
            Mark Complete
          </Button>
        )}
        
        {canCancel && (
          <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700" onClick={() => onCancel(booking.id)}>
            <Ban className="h-4 w-4 mr-1" />
            Cancel
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
