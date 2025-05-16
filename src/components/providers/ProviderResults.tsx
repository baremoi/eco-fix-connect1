
import { Provider } from "@/services/providerService";
import { ProviderCard } from "./ProviderCard";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { MapPin } from "lucide-react";

interface ProviderResultsProps {
  providers: Provider[];
  loading: boolean;
  resetFilters: () => void;
}

export function ProviderResults({ providers, loading, resetFilters }: ProviderResultsProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner className="h-8 w-8 text-primary" />
        <span className="ml-2">Loading providers...</span>
      </div>
    );
  }
  
  if (providers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-3">
          <MapPin className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-lg font-semibold">No providers found</h3>
        <p className="mt-2 text-muted-foreground">
          Try adjusting your filters or search term
        </p>
        <Button className="mt-4" onClick={resetFilters}>
          Clear filters
        </Button>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {providers.map((provider) => (
        <ProviderCard key={provider.id} provider={provider} />
      ))}
    </div>
  );
}
