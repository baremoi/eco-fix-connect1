import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/ui/icons';
import { toast } from 'sonner';
import { AlertTriangle } from 'lucide-react';
import { useResetPassword } from '@/lib/auth';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = async () => {
    setIsLoading(true);
    try {
      await useResetPassword(token, password);
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
