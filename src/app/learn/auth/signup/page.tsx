'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import { loginWithGoogle } from '@/services/authService';
import { CheckCircle, Loader2, Eye, EyeOff, AlertCircle, Sparkles } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const { signup, user, loading } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // After successful Google signup, redirect to onboarding
  // Email/password users will see success screen first
  useEffect(() => {
    // Don't do anything while loading
    if (loading) return;
    
    // Don't redirect if showing success screen for email signup
    if (success) return;
    
    // For Google users: redirect to onboarding after auth
    // (Email users must verify first, so they won't have emailVerified yet)
    if (user && user.emailVerified) {
      console.log('User authenticated via Google, redirecting to onboarding');
      router.push('/onboarding');
    }
  }, [user, loading, router, success]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoogle = async () => {
    setError('');
    try {
      await loginWithGoogle();
      // useEffect will handle redirect to onboarding
    } catch (err: any) {
      console.error('Google sign-in error:', err);
      setError('Unable to sign in with Google. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please check and try again.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError('Please enter your first and last name.');
      return;
    }

    setIsLoading(true);
    try {
      const signupData = {
        email: formData.email,
        password: formData.password,
        fullName: `${formData.firstName} ${formData.lastName}`.trim(),
      };

      await signup(signupData);
      setSuccess(true);
    } catch (err: any) {
      console.error('Signup error:', err);
      
      const errorMessage = err.message || '';
      
      if (errorMessage.includes('email-already-in-use')) {
        setError('This email is already registered. Try logging in instead.');
      } else if (errorMessage.includes('invalid-email')) {
        setError('Please enter a valid email address.');
      } else if (errorMessage.includes('weak-password')) {
        setError('Password is too weak. Use at least 6 characters with a mix of letters and numbers.');
      } else if (errorMessage.includes('network')) {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError('Unable to create account. Please try again.');
      }
      
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0506] via-[#181111] to-[#0f0909] flex items-center justify-center px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-[150px] opacity-20"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-[150px] opacity-20"></div>
        </div>

        <div className="max-w-lg relative z-10">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl backdrop-blur-xl border border-green-500/30 mb-8 animate-in zoom-in duration-500">
            <CheckCircle className="text-green-400" size={48} strokeWidth={1.5} />
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-4 animate-in fade-in slide-in-from-bottom-3 duration-500 delay-100">
            Check your email
          </h2>
          
          <div className="bg-[#1a1314]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8 animate-in fade-in slide-in-from-bottom-3 duration-500 delay-200">
            <p className="text-gray-300 text-lg leading-relaxed">
              We&apos;ve sent a verification link to{' '}
              <span className="text-white font-semibold">{formData.email}</span>
            </p>
            <p className="text-gray-400 mt-3">
              Please verify your email to activate your account and start your learning journey.
            </p>
          </div>

          <Link 
            href="/learn/auth/login" 
            className="inline-flex items-center gap-2 text-[#ea2a33] font-semibold hover:text-[#ff3944] transition-colors group animate-in fade-in duration-500 delay-300"
          >
            <span>Back to Login</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0506] via-[#181111] to-[#0f0909] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-[#ea2a33] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 -right-20 w-72 h-72 bg-[#c41e3a] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-72 h-72 bg-[#8b1625] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <Link href="/" className="mb-12 relative z-10 group">
        <div className="transition-transform duration-300 group-hover:scale-105">
          <Image src="/Group.svg" alt="ASN Logo" width={140} height={60} priority />
        </div>
      </Link>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#1a1314]/80 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <h1 className="text-3xl font-bold text-white tracking-tight">
                Join ASN
              </h1>
              <Sparkles className="text-[#ea2a33]" size={24} />
            </div>
            <p className="text-gray-400 text-base">
              Start your journey in seconds
            </p>
          </div>

          <button 
            onClick={handleGoogle} 
            className="w-full flex items-center justify-center gap-3 py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-all mb-8 group shadow-lg hover:shadow-xl"
          >
            <img 
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
              className="w-5 h-5 transition-transform group-hover:scale-110" 
              alt="" 
            />
            Continue with Google
          </button>

          <div className="relative mb-8 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <span className="relative bg-[#1a1314] px-4 text-xs text-gray-400 uppercase tracking-wider font-medium">
              Or sign up with email
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/30 text-red-300 p-4 rounded-2xl text-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <AlertCircle size={20} className="shrink-0 mt-0.5" />
                <span className="leading-relaxed">{error}</span>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-gray-300 text-sm font-medium ml-1">
                  First Name
                </label>
                <input 
                  type="text" 
                  name="firstName" 
                  placeholder="John" 
                  required 
                  className="w-full bg-[#0f0a0b]/50 border border-white/10 text-white px-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ea2a33] focus:border-transparent transition-all placeholder:text-gray-500 backdrop-blur-sm" 
                  onChange={handleChange}
                  value={formData.firstName}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-gray-300 text-sm font-medium ml-1">
                  Last Name
                </label>
                <input 
                  type="text" 
                  name="lastName" 
                  placeholder="Doe" 
                  required 
                  className="w-full bg-[#0f0a0b]/50 border border-white/10 text-white px-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ea2a33] focus:border-transparent transition-all placeholder:text-gray-500 backdrop-blur-sm" 
                  onChange={handleChange}
                  value={formData.lastName}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-gray-300 text-sm font-medium ml-1">
                Email Address
              </label>
              <input 
                type="email" 
                name="email" 
                placeholder="you@example.com" 
                required 
                className="w-full bg-[#0f0a0b]/50 border border-white/10 text-white px-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ea2a33] focus:border-transparent transition-all placeholder:text-gray-500 backdrop-blur-sm" 
                onChange={handleChange}
                value={formData.email}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-gray-300 text-sm font-medium ml-1">
                Password
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  name="password" 
                  placeholder="Min. 6 characters" 
                  required 
                  className="w-full bg-[#0f0a0b]/50 border border-white/10 text-white px-4 py-3.5 pr-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ea2a33] focus:border-transparent transition-all placeholder:text-gray-500 backdrop-blur-sm" 
                  onChange={handleChange}
                  value={formData.password}
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

            <div className="space-y-2">
              <label className="block text-gray-300 text-sm font-medium ml-1">
                Confirm Password
              </label>
              <div className="relative">
                <input 
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword" 
                  placeholder="Re-enter password" 
                  required 
                  className="w-full bg-[#0f0a0b]/50 border border-white/10 text-white px-4 py-3.5 pr-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ea2a33] focus:border-transparent transition-all placeholder:text-gray-500 backdrop-blur-sm" 
                  onChange={handleChange}
                  value={formData.confirmPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading} 
              className="w-full bg-gradient-to-r from-[#ea2a33] to-[#c41e3a] text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#ea2a33]/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-2 group"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <span>Create Account</span>
                  <Sparkles size={18} className="transition-transform group-hover:rotate-12" />
                </>
              )}
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-gray-400">
            Already have an account?{' '}
            <Link 
              href="/learn/auth/login" 
              className="text-[#ea2a33] font-semibold hover:text-[#ff3944] transition-colors"
            >
              Log in
            </Link>
          </p>
        </div>

        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#ea2a33]/10 blur-3xl rounded-full pointer-events-none"></div>
      </div>
    </div>
  );
}