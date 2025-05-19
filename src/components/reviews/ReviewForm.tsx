
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "./StarRating";
import { Icons } from "@/components/ui/icons";
import { reviewService } from "@/services/reviewService";
import { toast } from "sonner";

interface ReviewFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tradespersonId: string;
  bookingId: string;
  userId: string;
  tradespersonName: string;
  onReviewSubmitted?: () => void;
}

export function ReviewForm({
  open,
  onOpenChange,
  tradespersonId,
  bookingId,
  userId,
  tradespersonName,
  onReviewSubmitted
}: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await reviewService.createReview({
        booking_id: bookingId,
        user_id: userId,
        tradesperson_id: tradespersonId,
        rating,
        comment: comment.trim() || undefined
      });
      
      toast.success("Review submitted successfully");
      setRating(0);
      setComment("");
      onOpenChange(false);
      
      if (onReviewSubmitted) {
        onReviewSubmitted();
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rate your experience with {tradespersonName}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="flex flex-col items-center space-y-2">
            <StarRating 
              rating={rating} 
              size="lg" 
              interactive={true}
              onRatingChange={setRating}
              className="mb-2"
            />
            <p className="text-sm text-muted-foreground">
              {rating > 0 ? `You rated ${rating} out of 5 stars` : "Select a rating"}
            </p>
          </div>
          
          <div>
            <Textarea
              placeholder="Share your experience (optional)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={rating === 0 || isSubmitting}>
              {isSubmitting ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Review"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
