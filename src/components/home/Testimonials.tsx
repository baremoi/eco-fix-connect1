
import { Card, CardContent } from '@/components/ui/card';

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: 'Emma Thompson',
    location: 'London',
    text: 'EcoFix helped me find a reliable plumber within hours. The service was excellent and the pricing transparent. Highly recommend!',
    image: 'https://i.pravatar.cc/150?img=1',
    trade: 'Plumbing',
  },
  {
    id: 2,
    name: 'James Wilson',
    location: 'Manchester',
    text: 'I needed an electrician for my eco-home and EcoFix connected me with someone who specializes in renewable energy systems. Very impressed!',
    image: 'https://i.pravatar.cc/150?img=2',
    trade: 'Electrical',
  },
  {
    id: 3,
    name: 'Sarah Ahmed',
    location: 'Birmingham',
    text: 'The gardener I found through EcoFix transformed my yard into a sustainable garden. Professional, knowledgeable, and eco-conscious.',
    image: 'https://i.pravatar.cc/150?img=3',
    trade: 'Gardening',
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-3">What Our Customers Say</h2>
        <p className="text-center text-muted-foreground mb-12">Trusted by homeowners across the UK</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                <div className="text-sm text-primary">Service: {testimonial.trade}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
