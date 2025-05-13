import { Link } from "react-router-dom";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">How It Works</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
              1
            </div>
            <h2 className="text-xl font-semibold mb-4">Create an Account</h2>
            <p className="text-muted-foreground">
              Sign up as a homeowner or tradesperson to get started with our platform.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
              2
            </div>
            <h2 className="text-xl font-semibold mb-4">Connect</h2>
            <p className="text-muted-foreground">
              Browse profiles, post jobs, or bid on projects depending on your role.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
              3
            </div>
            <h2 className="text-xl font-semibold mb-4">Get Things Done</h2>
            <p className="text-muted-foreground">
              Complete projects, leave reviews, and build your reputation on the platform.
            </p>
          </div>
        </div>
        <div className="text-center mt-12">
          <Link
            to="/register"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90"
          >
            Get Started Now
          </Link>
        </div>
      </main>
    </div>
  );
};

export default HowItWorks;
