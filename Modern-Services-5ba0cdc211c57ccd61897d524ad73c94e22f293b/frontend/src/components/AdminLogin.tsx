import { useState } from 'react';
import { Button } from './ui/button';
import { loginAdmin } from '../lib/auth';
import { Lock, Mail, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await loginAdmin(email, password);
      onLoginSuccess();
    } catch (err: any) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F5F7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-[#0A1A2F] mb-4">
            <Lock className="h-8 w-8 text-[#C8A75B]" />
          </div>
          <h2 className="text-3xl font-bold text-[#0A1A2F]">Admin Login</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to manage testimonials
          </p>
        </div>

        <form className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg flex items-center space-x-2">
              <AlertCircle size={20} />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#C8A75B] transition-colors"
                  placeholder="admin@modernservices.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#C8A75B] transition-colors"
                  placeholder="Enter your password"
                />
              </div>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              disabled={loading}
              fullWidth
              className="w-full bg-[#C8A75B] text-white hover:bg-[#B8964A] disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Admin access only. Unauthorized access is prohibited.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

