
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { bookingService, Review } from "@/services/bookingService";
import { toast } from "sonner";
import { useMockAuth } from "@/lib/mockAuth";

interface ReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingId: string;
  providerId: string;
  providerName: string;
}

export function ReviewDialog({
  open,
  onOpenChange,
  bookingId,
  providerId,
  providerName
}: ReviewDialogProps) {
  const { user } = useMockAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitReviewMutation = useMutation({
    mutationFn: (reviewData: Omit<Review, "id" | "date">) => {
      return bookingService.submitReview(reviewData);
    },
    onSuccess: () => {
      toast.success("Review submitted successfully!");
      resetForm();
      onOpenChange(false);
    },
    onError: (error) => {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again.");
      setIsSubmitting(false);
    }
  });

  const resetForm = () => {
    setRating(0);
    setComment("");
    setIsSubmitting(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in to submit a review.");
      return;
    }
    
    if (rating === 0) {
      toast.error("Please select a rating before submitting.");
      return;
    }
    
    setIsSubmitting(true);
    
    const reviewData = {
      bookingId,
      providerId,
      userId: user.id,
      userName: user.name || "Anonymous User",
      userAvatar: user.avatar,
      rating,
      comment
    };
    
    submitReviewMutation.mutate(reviewData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rate your experience</DialogTitle>
          <DialogDescription>
            Share your experience with {providerName}. Your feedback helps others make informed decisions.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-medium">Your Rating</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="p-1"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoverRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {rating > 0 ? `${rating} out of 5 stars` : "Select a rating"}
            </span>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Your Review (Optional)
            </label>
            <Textarea
              placeholder="Share your experience with this service provider..."
              className="min-h-[120px]"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
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
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
