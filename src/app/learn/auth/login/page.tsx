'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import { loginWithGoogle } from '@/services/authService';
import { Loader2, AlertCircle, LogIn, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, user, userProfile } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    // Logic: If user is logged in, check if they finished onboarding
    if (user && user.emailVerified) {
      if (userProfile && !userProfile.onboardingComplete) {
        router.push('/onboarding');
      } else {
        router.push('/learn/dashboard');
      }
    }
  }, [user, userProfile, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      await loginWithGoogle();

    } catch (err: any) {
      console.error('Google sign-in error:', err);
      setError('Unable to sign in with Google. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
    } catch (err: any) {
      console.error('Login error:', err);
      
      // error messages based on Firebase error codes
      const errorMessage = err.message || '';
      
      if (errorMessage.includes('verify your email')) {
        setError('Please verify your email address. Check your inbox for the verification link.');
      } else if (errorMessage.includes('user-not-found') || errorMessage.includes('wrong-password')) {
        setError('Invalid email or password. Please check your credentials and try again.');
      } else if (errorMessage.includes('invalid-email')) {
        setError('Please enter a valid email address.');
      } else if (errorMessage.includes('too-many-requests')) {
        setError('Too many failed attempts. Please try again later or reset your password.');
      } else if (errorMessage.includes('invalid-credential')) {
        setError('Invalid email or password. Please check your credentials and try again.');
      } else {
        setError('Unable to sign in. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0506] via-[#181111] to-[#0f0909] flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-[#ea2a33] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 -right-20 w-72 h-72 bg-[#c41e3a] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-72 h-72 bg-[#8b1625] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Official Logo */}
      <Link href="/" className="mb-12 relative z-10 group">
        <div className="transition-transform duration-300 group-hover:scale-105">
          <Image src="/Group.svg" alt="ASN Logo" width={140} height={60} priority />
        </div>
      </Link>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#1a1314]/80 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Glass morphism accent */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-gray-400 text-base">
              Continue your learning journey
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-500/10 backdrop-blur-sm border border-red-500/30 text-red-300 px-4 py-3.5 rounded-2xl text-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <span className="leading-relaxed">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-gray-300 text-sm font-medium ml-1">
                Email Address
              </label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                className="w-full bg-[#0f0a0b]/50 border border-white/10 text-white px-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ea2a33] focus:border-transparent transition-all placeholder:text-gray-500 backdrop-blur-sm" 
                placeholder="you@example.com" 
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="block text-gray-300 text-sm font-medium">
                  Password
                </label>
                <Link 
                  href="/learn/auth/forgot-password" 
                  className="text-sm text-[#ea2a33] hover:text-[#ff3944] transition-colors font-medium"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  required 
                  className="w-full bg-[#0f0a0b]/50 border border-white/10 text-white px-4 py-3.5 pr-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ea2a33] focus:border-transparent transition-all placeholder:text-gray-500 backdrop-blur-sm" 
                  placeholder="••••••••" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading} 
              className="w-full bg-gradient-to-r from-[#ea2a33] to-[#c41e3a] text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#ea2a33]/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-8 group"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <LogIn size={18} />
                  <span>Sign In</span>
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#1a1314] px-4 text-gray-400 font-medium uppercase tracking-wider">
                Or continue with
              </span>
            </div>
          </div>

          <button 
            onClick={handleGoogleSignIn}
            type="button" 
            className="w-full bg-white/5 backdrop-blur-sm border border-white/10 text-white py-3.5 rounded-xl font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-3 group"
          >
            <img 
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
              className="w-5 h-5 transition-transform group-hover:scale-110" 
              alt="" 
            />
            <span>Google</span>
          </button>

          <p className="text-center mt-8 text-sm text-gray-400">
            Don&apos;t have an account?{' '}
            <Link 
              href="/learn/auth/signup" 
              className="text-[#ea2a33] font-semibold hover:text-[#ff3944] transition-colors ml-1"
            >
              Create one
            </Link>
          </p>
        </div>

        {/* Subtle bottom glow */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#ea2a33]/10 blur-3xl rounded-full pointer-events-none"></div>
      </div>
    </div>
  );
}