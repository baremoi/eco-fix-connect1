
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ChangeEvent, KeyboardEvent } from "react";

interface ProviderSearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  applyFilters: () => void;
}

export function ProviderSearch({ searchTerm, setSearchTerm, applyFilters }: ProviderSearchProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      applyFilters();
    }
  };
  
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search for services or specialties..."
        className="pl-10"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
