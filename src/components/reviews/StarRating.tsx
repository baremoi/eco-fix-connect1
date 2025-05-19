
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showEmpty?: boolean;
  className?: string;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  showEmpty = true,
  className,
  interactive = false,
  onRatingChange
}: StarRatingProps) {
  const stars = Array.from({ length: maxRating }, (_, i) => i + 1);
  
  const sizeClass = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-6 h-6",
  };
  
  const handleClick = (value: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(value);
    }
  };

  return (
    <div className={cn("flex items-center", className)}>
      {stars.map((star) => (
        <Star
          key={star}
          className={cn(
            sizeClass[size],
            "transition-colors",
            star <= rating 
              ? "text-yellow-500 fill-yellow-500" 
              : showEmpty 
                ? "text-gray-300" 
                : "hidden",
            interactive && "cursor-pointer hover:text-yellow-400"
          )}
          onClick={() => handleClick(star)}
        />
      ))}
    </div>
  );
}
