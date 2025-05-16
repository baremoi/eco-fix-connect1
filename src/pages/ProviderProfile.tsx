
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProviderById, Provider } from "@/services/providerService";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { ServiceCard } from "@/components/services/ServiceCard";
import { servicesData } from "@/data/services";
import { Calendar, CheckCircle, MapPin, Phone, Mail, ArrowLeft, Star } from "lucide-react";
import { toast } from "sonner";

export default function ProviderProfile() {
  const { id } = useParams<{ id: string }>();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProvider = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await getProviderById(id);
        setProvider(data || null);
      } catch (error) {
        console.error("Error fetching provider details:", error);
        toast.error("Failed to load provider details");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProvider();
  }, [id]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Spinner className="h-8 w-8 text-primary" />
      </div>
    );
  }
  
  if (!provider) {
    return (
      <div className="container mx-auto py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Provider Not Found</h2>
        <p className="text-muted-foreground mb-8">The provider you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/providers">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Providers
          </Link>
        </Button>
      </div>
    );
  }
  
  // Get some sample services for this provider
  const providerServices = servicesData
    .filter(service => provider.services.includes(service.category))
    .slice(0, 3);

  const handleContactProvider = () => {
    toast.success(`Your message has been sent to ${provider.name}`);
  };
  
  const handleBookProvider = () => {
    toast.success(`Booking request sent to ${provider.name}`);
  };
  
  return (
    <div className="container mx-auto py-8">
      <Link to="/providers" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Providers
      </Link>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 border">
                  <AvatarImage src={provider.avatar_url} alt={provider.name} />
                  <AvatarFallback className="text-xl">{provider.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <h1 className="mt-4 text-xl font-bold">{provider.name}</h1>
                
                <div className="flex items-center mt-2">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span className="ml-1 font-medium">{provider.rating}</span>
                  <span className="text-sm text-muted-foreground ml-1">
                    ({provider.completedProjects} projects)
                  </span>
                </div>
                
                <div className="flex items-center mt-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{provider.location}</span>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <h3 className="font-medium">Contact Information</h3>
                
                {provider.phone && (
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
                    <span>{provider.phone}</span>
                  </div>
                )}
                
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
                  <span>{provider.email}</span>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <h3 className="font-medium">Specialties</h3>
                <div className="space-y-2">
                  {provider.specialties.map((specialty) => (
                    <div key={specialty} className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-3 text-green-600 translate-y-0.5" />
                      <span>{specialty}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <h3 className="font-medium">Services</h3>
                <div className="flex flex-wrap gap-2">
                  {provider.services.map((service) => (
                    <Badge key={service} variant="outline">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <Button className="w-full" onClick={handleBookProvider}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Now
                </Button>
                <Button variant="outline" className="w-full" onClick={handleContactProvider}>
                  Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="about">
            <TabsList className="mb-6">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about">
              <Card>
                <CardHeader>
                  <CardTitle>About {provider.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-line">{provider.bio}</p>
                  
                  <h3 className="font-medium mt-6 mb-3">Credentials & Experience</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-3 text-green-600 translate-y-0.5" />
                      <span>{provider.completedProjects}+ completed eco-friendly projects</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-3 text-green-600 translate-y-0.5" />
                      <span>Eco-Fix Certified Professional</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-3 text-green-600 translate-y-0.5" />
                      <span>10+ years of experience in sustainable services</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="services">
              <Card>
                <CardHeader>
                  <CardTitle>Services Offered</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {providerServices.map((service) => (
                      <ServiceCard key={service.id} service={service} />
                    ))}
                  </div>
                  
                  {providerServices.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No services listed yet.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle>Client Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Mock reviews */}
                  <div className="space-y-6">
                    <div className="border-b pb-6">
                      <div className="flex justify-between mb-2">
                        <div className="font-medium">John D.</div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < 5 ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">3 weeks ago</p>
                      <p className="mt-2">
                        Excellent service! Very knowledgeable about eco-friendly solutions and helped me reduce my energy bills significantly.
                      </p>
                    </div>
                    
                    <div className="border-b pb-6">
                      <div className="flex justify-between mb-2">
                        <div className="font-medium">Sarah M.</div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < 5 ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">2 months ago</p>
                      <p className="mt-2">
                        Professional, punctual, and did a fantastic job on our home project. Would definitely hire again!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="portfolio">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio & Past Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-md overflow-hidden">
                      <div className="aspect-video bg-muted" />
                      <div className="p-4">
                        <h4 className="font-medium">Eco-Friendly Home Renovation</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Complete sustainable renovation with solar integration and natural materials.
                        </p>
                      </div>
                    </div>
                    
                    <div className="border rounded-md overflow-hidden">
                      <div className="aspect-video bg-muted" />
                      <div className="p-4">
                        <h4 className="font-medium">Water Conservation System</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Rainwater harvesting and greywater recycling system for a modern home.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
