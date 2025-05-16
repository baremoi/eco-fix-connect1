
import { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const type = searchParams.get('type');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setError('No verification token provided');
        setIsLoading(false);
        return;
      }

      try {
        // Handle email verification based on the type parameter
        if (type === 'signup' || !type) {
          const { error: verifyError } = await supabase.auth.verifyOtp({
            token_hash: token,
            type: 'signup',
          });

          if (verifyError) throw verifyError;
          
          // Remove any stored email from previous verification attempts
          sessionStorage.removeItem('pendingEmail');
          
          toast.success('Email verified successfully!');
          
          // Redirect to login after a short delay
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        } 
        else if (type === 'recovery') {
          // Handle password recovery verification
          const { error: verifyError } = await supabase.auth.verifyOtp({
            token_hash: token,
            type: 'recovery',
          });

          if (verifyError) throw verifyError;
          
          toast.success('Password recovery verified!');
          
          // Redirect to reset password page
          setTimeout(() => {
            navigate('/reset-password');
          }, 2000);
        }
      } catch (err: any) {
        console.error('Verification error:', err);
        setError(err.message || 'Failed to verify email. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    verifyEmail();
  }, [token, type, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full bg-card p-8 rounded-lg shadow-lg text-center">
        {isLoading ? (
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
            <p className="text-lg">Processing your verification...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center space-y-4">
            <AlertTriangle className="h-12 w-12 text-destructive" />
            <h2 className="text-2xl font-bold">Verification Failed</h2>
            <p className="text-muted-foreground">{error}</p>
            <Link to="/login" className="mt-4">
              <Button>Return to Login</Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
            <h2 className="text-2xl font-bold">Verification Successful</h2>
            <p className="text-muted-foreground">
              Your email has been verified successfully!
            </p>
            <Link to="/login" className="mt-4">
              <Button>Go to Login</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
