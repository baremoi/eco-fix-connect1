
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarRating } from "./StarRating";
import { Icons } from "@/components/ui/icons";
import { Review, reviewService } from "@/services/reviewService";
import { formatDistanceToNow } from "date-fns";

interface ReviewListProps {
  tradespersonId: string;
}

export function ReviewList({ tradespersonId }: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState({ avg_rating: 0, review_count: 0 });
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadReviews = async () => {
      setIsLoading(true);
      try {
        const [reviewData, statsData] = await Promise.all([
          reviewService.getReviewsByTradesperson(tradespersonId),
          reviewService.getReviewStats(tradespersonId)
        ]);
        
        setReviews(reviewData);
        setStats(statsData);
      } catch (error) {
        console.error("Error loading reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadReviews();
  }, [tradespersonId]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Icons.spinner className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }
  
  if (reviews.length === 0) {
    return (
      <Card>
        <CardContent className="py-6 text-center text-muted-foreground">
          <p>No reviews yet</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="flex items-center space-x-2">
          <StarRating rating={stats.avg_rating} size="lg" />
          <span className="text-lg font-medium">{stats.avg_rating.toFixed(1)}</span>
          <span className="text-muted-foreground">({stats.review_count} reviews)</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="py-4">
              <div className="flex justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={review.user_avatar || undefined} />
                    <AvatarFallback>{review.user_name?.substring(0, 2).toUpperCase() || 'UN'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{review.user_name}</div>
                    <div className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
                    </div>
                  </div>
                </div>
                <StarRating rating={review.rating} size="sm" />
              </div>
              
              {review.comment && (
                <div className="mt-4">
                  <p className="text-sm">{review.comment}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
