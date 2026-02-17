'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { resetPassword } from '@/services/authService';
import { Loader2, AlertCircle, Mail, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (err: any) {
      console.error('Password reset error:', err);
      
      // Better error messages
      const errorMessage = err.message || '';
      
      if (errorMessage.includes('user-not-found')) {
        setError('No account found with this email address.');
      } else if (errorMessage.includes('invalid-email')) {
        setError('Please enter a valid email address.');
      } else if (errorMessage.includes('too-many-requests')) {
        setError('Too many requests. Please try again later.');
      } else {
        setError('Unable to send reset email. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0506] via-[#181111] to-[#0f0909] flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[150px] opacity-20"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-[150px] opacity-20"></div>
        </div>

        <div className="max-w-lg text-center relative z-10">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl backdrop-blur-xl border border-blue-500/30 mb-8 animate-in zoom-in duration-500">
            <CheckCircle className="text-blue-400" size={48} strokeWidth={1.5} />
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-4 animate-in fade-in slide-in-from-bottom-3 duration-500 delay-100">
            Check your email
          </h2>
          
          <div className="bg-[#1a1314]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8 animate-in fade-in slide-in-from-bottom-3 duration-500 delay-200">
            <p className="text-gray-300 text-lg leading-relaxed">
              We've sent a password reset link to{' '}
              <span className="text-white font-semibold">{email}</span>
            </p>
            <p className="text-gray-400 mt-3">
              Click the link in the email to reset your password. The link will expire in 1 hour.
            </p>
          </div>

          <div className="flex flex-col gap-4 items-center">
            <Link 
              href="/learn/auth/login" 
              className="inline-flex items-center gap-2 text-[#ea2a33] font-semibold hover:text-[#ff3944] transition-colors group"
            >
              <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
              <span>Back to Login</span>
            </Link>
            
            <button
              onClick={() => {
                setSuccess(false);
                setEmail('');
              }}
              className="text-gray-400 text-sm hover:text-gray-300 transition-colors"
            >
              Send to a different email
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0506] via-[#181111] to-[#0f0909] flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-[#ea2a33] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 -right-20 w-72 h-72 bg-[#c41e3a] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-72 h-72 bg-[#8b1625] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Logo */}
      <Link href="/" className="mb-12 relative z-10 group">
        <div className="transition-transform duration-300 group-hover:scale-105">
          <Image src="/Group.svg" alt="ASN Logo" width={140} height={60} priority />
        </div>
      </Link>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#1a1314]/80 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Glass morphism accent */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-blue-500/20">
              <Mail className="text-blue-400" size={28} strokeWidth={1.5} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">
              Reset Password
            </h1>
            <p className="text-gray-400 text-base leading-relaxed">
              Enter your email and we'll send you a link to reset your password
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-500/10 backdrop-blur-sm border border-red-500/30 text-red-300 px-4 py-3.5 rounded-2xl text-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <span className="leading-relaxed">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-gray-300 text-sm font-medium ml-1">
                Email Address
              </label>
              <input 
                type="email" 
                name="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="w-full bg-[#0f0a0b]/50 border border-white/10 text-white px-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ea2a33] focus:border-transparent transition-all placeholder:text-gray-500 backdrop-blur-sm" 
                placeholder="you@example.com" 
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading} 
              className="w-full bg-gradient-to-r from-[#ea2a33] to-[#c41e3a] text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#ea2a33]/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <Mail size={18} />
                  <span>Send Reset Link</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link 
              href="/learn/auth/login" 
              className="inline-flex items-center gap-2 text-gray-400 text-sm hover:text-gray-300 transition-colors group"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              <span>Back to Login</span>
            </Link>
          </div>
        </div>

        {/* Subtle bottom glow */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-blue-500/10 blur-3xl rounded-full pointer-events-none"></div>
      </div>
    </div>
  );
}