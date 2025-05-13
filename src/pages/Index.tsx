import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">Welcome to Eco-Fix-Connect</h1>
        <p className="text-center text-lg mb-8">
          Connect with skilled technicians and get your appliances fixed sustainably.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90"
          >
            Get Started
          </Link>
          <Link
            to="/how-it-works"
            className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg hover:bg-secondary/90"
          >
            Learn More
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Index;
