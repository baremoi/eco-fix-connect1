import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="mb-8">The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
