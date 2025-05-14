
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setError('No token provided');
        setIsLoading(false);
        return;
      }

      try {
        // Replace with actual implementation when useVerifyEmail is available
        // await useVerifyEmail(token);
        console.log("Verifying email with token:", token);
        toast.success('Email verified successfully!');
      } catch (err) {
        setError('Failed to verify email. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <div className="flex flex-col items-center">
          <AlertTriangle className="h-6 w-6 text-red-500" />
          <p className="text-red-500">{error}</p>
          <Link to="/login">
            <Button>Go to Login</Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <CheckCircle className="h-6 w-6 text-green-500" />
          <p className="text-green-500">Your email has been verified!</p>
          <Link to="/login">
            <Button>Go to Login</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
