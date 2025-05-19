
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { StarRating } from "@/components/reviews/StarRating";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Icons } from "@/components/ui/icons";
import { SearchProps } from "./TradeTypes";

export function SearchFilters({
  loading,
  categories,
  filters,
  onUpdateFilter,
  onSearch,
  onResetFilters
}: SearchProps) {
  const [showFilters, setShowFilters] = useState(false);
  
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4">Search for tradespeople</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Trade
          </label>
          <Select 
            value={filters.selectedCategory} 
            onValueChange={(value) => onUpdateFilter("selectedCategory", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a trade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All trades</SelectItem>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Postcode
          </label>
          <Input
            type="text"
            placeholder="Enter your postcode"
            value={filters.postcode}
            onChange={(e) => onUpdateFilter("postcode", e.target.value)}
          />
        </div>
        <div className="flex items-end">
          <Button
            className="w-full"
            onClick={onSearch}
            disabled={loading}
          >
            {loading ? (
              <>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Search
              </>
            )}
          </Button>
        </div>
      </div>
      
      {/* Advanced Filters */}
      <Collapsible open={showFilters} onOpenChange={setShowFilters} className="mt-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild>
            <CollapsibleTrigger className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Advanced Filters</span>
              {showFilters ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </CollapsibleTrigger>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onResetFilters}
            className="text-muted-foreground"
          >
            Reset all
          </Button>
        </div>
        
        <CollapsibleContent className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Price Range (£ per hour)
                </label>
                <div className="px-2">
                  <Slider 
                    defaultValue={filters.priceRange} 
                    min={0} 
                    max={200} 
                    step={5} 
                    value={filters.priceRange}
                    onValueChange={(value) => onUpdateFilter("priceRange", value as [number, number])}
                  />
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>£{filters.priceRange[0]}</span>
                    <span>£{filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Minimum Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Button 
                      key={rating}
                      variant={filters.ratingFilter === rating ? "default" : "outline"}
                      size="sm"
                      onClick={() => onUpdateFilter("ratingFilter", filters.ratingFilter === rating ? 0 : rating)}
                      className="px-3"
                    >
                      <StarRating rating={rating} size="sm" showEmpty={false} />
                      {rating === 1 && "+"}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Sort By
                </label>
                <Select 
                  value={filters.sortBy} 
                  onValueChange={(value) => onUpdateFilter("sortBy", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rating</SelectItem>
                    <SelectItem value="price_low">Price: Low to High</SelectItem>
                    <SelectItem value="price_high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2 pt-4">
                <Checkbox 
                  id="availability" 
                  checked={filters.availabilityFilter} 
                  onCheckedChange={(checked) => 
                    onUpdateFilter("availabilityFilter", checked === true)
                  }
                />
                <label
                  htmlFor="availability"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Show only available tradespeople
                </label>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
