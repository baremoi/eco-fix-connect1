
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Star } from "lucide-react";
import { bookingService } from "@/services/bookingService";

interface ReviewListProps {
  providerId: string;
}

export function ReviewList({ providerId }: ReviewListProps) {
  const {
    data: reviews = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ["providerReviews", providerId],
    queryFn: () => bookingService.getReviewsForProvider(providerId)
  });

  const {
    data: reviewStats,
    isLoading: isLoadingStats
  } = useQuery({
    queryKey: ["providerReviewStats", providerId],
    queryFn: () => bookingService.getReviewStats(providerId)
  });

  if (isLoading) {
    return (
      <div className="py-8 flex justify-center">
        <Spinner className="h-8 w-8 text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-lg mb-2">Error Loading Reviews</h3>
        <p className="text-muted-foreground">
          We encountered an error while loading reviews. Please try again later.
        </p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-lg mb-2">No Reviews Yet</h3>
        <p className="text-muted-foreground">
          This service provider hasn't received any reviews yet.
        </p>
      </div>
    );
  }

  return (
    <div>
      {!isLoadingStats && reviewStats && (
        <div className="mb-8 p-6 bg-gray-50 rounded-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold">{reviewStats.averageRating.toFixed(1)} / 5</h3>
              <div className="flex mt-1">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.round(reviewStats.averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
              </div>
              <p className="text-muted-foreground mt-1">Based on {reviewStats.totalReviews} reviews</p>
            </div>
            
            <div className="grid grid-cols-5 gap-1 w-full max-w-md">
              {[5, 4, 3, 2, 1].map((starCount) => {
                // Calculate percentage based on actual data
                const reviewsWithThisRating = reviews.filter(review => review.rating === starCount).length;
                const percentage = (reviewsWithThisRating / reviews.length) * 100;
                
                return (
                  <div key={starCount} className="flex items-center gap-2">
                    <div className="text-sm">{starCount}</div>
                    <div className="h-2 flex-grow bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-yellow-400 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-muted-foreground">{Math.round(percentage)}%</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={review.userAvatar} alt={review.userName} />
                  <AvatarFallback>{review.userName.substr(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{review.userName}</div>
                  <div className="text-sm text-muted-foreground">{review.date}</div>
                </div>
              </div>
              <div className="flex mt-2">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
              </div>
            </CardHeader>
            <CardContent>
              <p>{review.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
