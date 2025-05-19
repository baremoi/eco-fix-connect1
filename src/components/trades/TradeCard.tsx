
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { MessageButton } from "@/components/messaging/MessageButton";
import { StarRating } from "@/components/reviews/StarRating";
import { TradeCardProps } from "./TradeTypes";

export function TradeCard({ tradesperson }: TradeCardProps) {
  return (
    <Card key={tradesperson.id} className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center overflow-hidden">
            {tradesperson.avatar_url ? (
              <img src={tradesperson.avatar_url} alt={tradesperson.full_name} className="w-full h-full object-cover" />
            ) : (
              <Icons.user className="h-6 w-6 text-muted-foreground" />
            )}
          </div>
          <div>
            <h3 className="font-medium">{tradesperson.full_name}</h3>
            <p className="text-sm text-muted-foreground">{tradesperson.serviceCategory}</p>
            <div className="flex items-center gap-2 mt-1">
              <StarRating rating={tradesperson.avg_rating || 0} size="sm" />
              <span className="text-xs text-muted-foreground">
                ({tradesperson.review_count || 0} reviews)
              </span>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {tradesperson.bio || "No bio available."}
        </p>
        
        <div className="flex justify-between items-center">
          <div>
            {tradesperson.hourlyRate && (
              <p className="text-sm font-medium">£{tradesperson.hourlyRate}/hour</p>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              View Profile
            </Button>
            <MessageButton userId={tradesperson.id} label="Contact" size="sm" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
