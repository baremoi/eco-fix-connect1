
import { Dispatch, SetStateAction } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ProviderFiltersProps {
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  selectedLocation: string;
  setSelectedLocation: Dispatch<SetStateAction<string>>;
  minRating: number;
  setMinRating: Dispatch<SetStateAction<number>>;
  applyFilters: () => void;
  resetFilters: () => void;
  isMobileFiltersVisible: boolean;
  serviceCategories: string[];
  popularLocations: string[];
}

export function ProviderFilters({
  selectedCategory,
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
  minRating,
  setMinRating,
  applyFilters,
  resetFilters,
  isMobileFiltersVisible,
  serviceCategories,
  popularLocations
}: ProviderFiltersProps) {
  return (
    <div className={`${isMobileFiltersVisible ? 'block' : 'hidden'} md:block`}>
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Refine your search results</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Service Category</label>
            <Select 
              value={selectedCategory} 
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {serviceCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <Select 
              value={selectedLocation} 
              onValueChange={setSelectedLocation}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Locations</SelectItem>
                {popularLocations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Minimum Rating</label>
              <span className="text-sm text-muted-foreground">
                {minRating > 0 ? `${minRating}+ stars` : "Any rating"}
              </span>
            </div>
            <Slider
              min={0}
              max={5}
              step={1}
              value={[minRating]}
              onValueChange={(value) => setMinRating(value[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Any</span>
              <span>★★★★★</span>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex flex-col gap-2">
            <Button onClick={applyFilters}>Apply Filters</Button>
            <Button variant="outline" onClick={resetFilters}>Reset</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
