
import { Link } from "react-router-dom";
import { Card, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarIcon, MapPin, CheckCircle } from "lucide-react";
import { Provider } from "@/services/providerService";

interface ProviderCardProps {
  provider: Provider;
}

export function ProviderCard({ provider }: ProviderCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 border">
            <AvatarImage src={provider.avatar_url} alt={provider.name} />
            <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">{provider.name}</h3>
            <div className="flex items-center mt-1 gap-1">
              <StarIcon className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              <span className="font-medium">{provider.rating}</span>
              <span className="text-muted-foreground text-sm">
                ({provider.completedProjects} projects)
              </span>
            </div>
            <div className="flex items-center mt-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              <span>{provider.location}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-muted-foreground line-clamp-2">{provider.bio}</p>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-1">
          {provider.services.slice(0, 3).map((service) => (
            <Badge key={service} variant="outline" className="bg-muted/50">
              {service}
            </Badge>
          ))}
          {provider.services.length > 3 && (
            <Badge variant="outline" className="bg-muted/50">
              +{provider.services.length - 3} more
            </Badge>
          )}
        </div>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-1.5">Top Specialties</h4>
          <ul className="space-y-1">
            {provider.specialties.slice(0, 2).map((specialty) => (
              <li key={specialty} className="text-sm flex items-center">
                <CheckCircle className="h-3.5 w-3.5 mr-1.5 text-green-600" />
                {specialty}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <CardFooter className="px-6 py-4 bg-muted/10 flex justify-between border-t">
        <Button variant="outline" asChild>
          <Link to={`/providers/${provider.id}`}>View Profile</Link>
        </Button>
        <Button>Request Quote</Button>
      </CardFooter>
    </Card>
  );
}
