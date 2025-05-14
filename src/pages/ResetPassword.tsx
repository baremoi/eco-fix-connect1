
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = async () => {
    setIsLoading(true);
    try {
      // Replace with actual implementation when useResetPassword is available
      // await useResetPassword(token, password);
      console.log("Reset password with token:", token, "new password:", password);
      toast.success('Password reset successfully!');
    } catch (error) {
      toast.error('Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Reset Password</h1>
      <div className="mt-4">
        <Label htmlFor="password">New Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button
        className="mt-4"
        onClick={resetPassword}
        disabled={isLoading}
      >
        {isLoading ? 'Resetting...' : 'Reset Password'}
      </Button>
      <AlertTriangle className="mt-4 h-6 w-6 text-red-500" />
    </div>
  );
};

export default ResetPassword;
