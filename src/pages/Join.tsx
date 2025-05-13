
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/layout/Layout';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, CheckCircle } from 'lucide-react';

// Create a schema for provider registration
const providerSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters' }),
  businessName: z.string().min(2, { message: 'Business name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  trade: z.string().min(1, { message: 'Please select your primary trade' }),
  location: z.string().min(5, { message: 'Please enter your service area' }),
  experience: z.string().min(1, { message: 'Please select your experience level' }),
  about: z.string().min(50, { message: 'Please provide at least 50 characters about your services' }),
  ecoFriendly: z.string().min(20, { message: 'Please provide at least 20 characters about your eco-friendly practices' }),
});

type ProviderFormValues = z.infer<typeof providerSchema>;

const Join = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProviderFormValues>({
    resolver: zodResolver(providerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      businessName: '',
      email: '',
      phone: '',
      trade: '',
      location: '',
      experience: '',
      about: '',
      ecoFriendly: '',
    },
  });

  const onSubmit = async (values: ProviderFormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to register the provider
      console.log('Provider registration values:', values);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Application submitted!",
        description: "We'll review your application and get back to you within 48 hours.",
      });
      
      setIsSubmitted(true);
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was a problem with your application. Please try again.",
        variant: "destructive",
      });
      console.error('Provider registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    'Connect with eco-conscious customers seeking your services',
    'Flexible scheduling - you choose which jobs to quote on',
    'Secure, on-time payments for completed work',
    'Showcase your sustainable practices and expertise',
    'Free profile listing and job matching service',
  ];

  const trades = [
    'Plumbing',
    'Electrical',
    'Carpentry',
    'Gardening',
    'Painting & Decorating',
    'Building & Construction',
    'Heating & Cooling',
    'Renewable Energy Installation',
    'Insulation',
    'Roofing',
    'Other'
  ];

  return (
    <Layout>
      {/* Hero section */}
      <div className="bg-eco-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">Become an EcoFix Provider</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our network of eco-conscious tradespeople and grow your business while promoting sustainable practices.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Benefits section */}
            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <h2 className="text-2xl font-semibold mb-6">Why Join EcoFix?</h2>
                
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-eco-600 mr-2 shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8 p-6 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-2">Already Registered?</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    If you already have an account, you can log in to access your provider dashboard.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/login">Log In</Link>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Application form */}
            <div className="lg:col-span-3">
              {isSubmitted ? (
                <Card>
                  <CardContent className="py-10 text-center">
                    <div className="mx-auto w-16 h-16 bg-eco-50 rounded-full flex items-center justify-center mb-6">
                      <Check className="h-8 w-8 text-eco-600" />
                    </div>
                    <h2 className="text-2xl font-semibold mb-2">Application Submitted!</h2>
                    <p className="text-muted-foreground mb-6">
                      Thank you for applying to join the EcoFix network. Our team will review your application and contact you within 48 hours.
                    </p>
                    <Button asChild>
                      <Link to="/">Return to Home</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Provider Application</h2>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <Card>
                        <CardContent className="pt-6">
                          <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="firstName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>First Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="John" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="lastName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Last Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Doe" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="mt-4">
                            <FormField
                              control={form.control}
                              name="businessName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Business Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Your Business Ltd." {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input type="email" placeholder="john@example.com" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone Number</FormLabel>
                                  <FormControl>
                                    <Input placeholder="07700 900000" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="pt-6">
                          <h3 className="text-lg font-medium mb-4">Business Details</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="trade"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Primary Trade</FormLabel>
                                  <Select 
                                    onValueChange={field.onChange} 
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select your trade" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {trades.map((trade) => (
                                        <SelectItem key={trade} value={trade}>
                                          {trade}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="experience"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Years of Experience</FormLabel>
                                  <Select 
                                    onValueChange={field.onChange} 
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select experience" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="1-2">1-2 years</SelectItem>
                                      <SelectItem value="3-5">3-5 years</SelectItem>
                                      <SelectItem value="6-10">6-10 years</SelectItem>
                                      <SelectItem value="10+">10+ years</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="mt-4">
                            <FormField
                              control={form.control}
                              name="location"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Service Area</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="e.g., London, Manchester, Birmingham" 
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Enter the cities or postcodes where you offer your services
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="mt-4">
                            <FormField
                              control={form.control}
                              name="about"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>About Your Services</FormLabel>
                                  <FormControl>
                                    <Textarea 
                                      placeholder="Describe the services you offer and your expertise..." 
                                      className="min-h-[120px]" 
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="mt-4">
                            <FormField
                              control={form.control}
                              name="ecoFriendly"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Eco-Friendly Practices</FormLabel>
                                  <FormControl>
                                    <Textarea 
                                      placeholder="Describe how your business incorporates sustainable or eco-friendly practices..." 
                                      className="min-h-[120px]" 
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Tell us how you incorporate sustainable materials, reduce waste, or use eco-friendly techniques
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
                        {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                      </Button>
                      
                      <p className="text-sm text-muted-foreground text-center">
                        By submitting this application, you agree to our{' '}
                        <Link to="/terms" className="text-primary hover:underline">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>.
                      </p>
                    </form>
                  </Form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Join;
