'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';

const COUNTRIES = [
  'Nigeria', 'Kenya', 'South Africa', 'Ghana', 'Ethiopia', 'Tanzania',
  'Uganda', 'Rwanda', 'Egypt', 'Morocco', 'Cameroon', 'Senegal', 'Other',
];

const STATUS_OPTIONS = [
  { value: 'student', label: 'Student' },
  { value: 'professional', label: 'Working Professional' },
  { value: 'entrepreneur', label: 'Entrepreneur' },
  { value: 'job_seeker', label: 'Job Seeker' },
  { value: 'other', label: 'Other' },
];

const REFERRAL_OPTIONS = [
  { value: 'social_media', label: 'Social Media' },
  { value: 'friend', label: 'Friend/Colleague' },
  { value: 'university', label: 'University' },
  { value: 'search', label: 'Google Search' },
  { value: 'event', label: 'Event/Conference' },
  { value: 'other', label: 'Other' },
];

export default function SignupPage() {
  const router = useRouter();
  const { signup, user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    currentStatus: '',
    institution: '',
    referralSource: '',
  });

  React.useEffect(() => {
    if (user) {
      router.push('/learn/dashboard');
    }
  }, [user, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!formData.currentStatus) {
      setError('Please select your current status');
      return;
    }

    setIsLoading(true);

    try {
      const signupData = {
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        country: formData.country,
        currentStatus: formData.currentStatus,
        institution: formData.institution || undefined,
        referralSource: formData.referralSource || undefined,
      };

      await signup(signupData);
      setSuccess(true);
      setTimeout(() => {
        router.push('/learn/dashboard');
      }, 1500);
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists');
      } else {
        setError(err.message || 'Failed to create account');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getInstitutionLabel = () => {
    if (formData.currentStatus === 'student') return 'University/Institution';
    if (formData.currentStatus === 'professional' || formData.currentStatus === 'entrepreneur')
      return 'Company/Organization';
    return 'Organization (Optional)';
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#181111] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Account Created!</h2>
          <p className="text-gray-400">Redirecting you to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#181111] flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#CC2630] to-[#ea2a33] flex items-center justify-center text-white font-black text-lg mx-auto mb-4">
            A
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Join ASN</h1>
          <p className="text-gray-400 text-sm sm:text-base">Create your free account</p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#261c1c] rounded-xl p-5 sm:p-8 space-y-4 sm:space-y-5"
        >
          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="block text-gray-300 text-sm mb-1.5 sm:mb-2">Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full bg-[#181111] border border-[#382929] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:border-[#CC2630] transition-colors"
              placeholder="Enter your full name"
              data-testid="input-signup-fullname"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-300 text-sm mb-1.5 sm:mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-[#181111] border border-[#382929] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:border-[#CC2630] transition-colors"
              placeholder="Enter your email"
              data-testid="input-signup-email"
            />
          </div>

          {/* Password Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 text-sm mb-1.5 sm:mb-2">Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-[#181111] border border-[#382929] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:border-[#CC2630] transition-colors"
                placeholder="Min 6 characters"
                data-testid="input-signup-password"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-1.5 sm:mb-2">Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className={`w-full bg-[#181111] border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm sm:text-base focus:outline-none transition-colors ${
                  formData.confirmPassword.length > 0 && formData.confirmPassword !== formData.password
                    ? 'border-red-500/50 focus:border-red-500'
                    : 'border-[#382929] focus:border-[#CC2630]'
                }`}
                placeholder="Confirm password"
                data-testid="input-signup-confirm-password"
              />
            </div>
          </div>

          {/* Password Strength Indicator */}
          {formData.password.length > 0 && (
            <div>
              <div className="flex gap-1">
                <div
                  className={`h-1 flex-1 rounded-full ${
                    formData.password.length >= 2 ? 'bg-red-400' : 'bg-[#382929]'
                  }`}
                />
                <div
                  className={`h-1 flex-1 rounded-full ${
                    formData.password.length >= 6 ? 'bg-amber-400' : 'bg-[#382929]'
                  }`}
                />
                <div
                  className={`h-1 flex-1 rounded-full ${
                    formData.password.length >= 10 ? 'bg-green-400' : 'bg-[#382929]'
                  }`}
                />
              </div>
              <p className="text-gray-500 text-xs mt-1">
                {formData.password.length < 6
                  ? 'Too short - minimum 6 characters'
                  : formData.password.length < 10
                  ? 'Good'
                  : 'Strong'}
              </p>
            </div>
          )}

          {/* Confirm Password Mismatch Warning */}
          {formData.confirmPassword.length > 0 && formData.confirmPassword !== formData.password && (
            <p className="text-red-400 text-xs -mt-2">Passwords do not match</p>
          )}

          {/* Country + Status Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 text-sm mb-1.5 sm:mb-2">Country *</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="w-full bg-[#181111] border border-[#382929] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:border-[#CC2630] transition-colors"
                data-testid="select-signup-country"
              >
                <option value="">Select country</option>
                {COUNTRIES.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-1.5 sm:mb-2">Current Status *</label>
              <select
                name="currentStatus"
                value={formData.currentStatus}
                onChange={handleChange}
                required
                className="w-full bg-[#181111] border border-[#382929] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:border-[#CC2630] transition-colors"
                data-testid="select-signup-status"
              >
                <option value="">Select status</option>
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Institution - Dynamic Label */}
          <div>
            <label className="block text-gray-300 text-sm mb-1.5 sm:mb-2">{getInstitutionLabel()}</label>
            <input
              type="text"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              className="w-full bg-[#181111] border border-[#382929] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:border-[#CC2630] transition-colors"
              placeholder="Enter your institution or organization"
              data-testid="input-signup-institution"
            />
          </div>

          {/* Referral Source */}
          <div>
            <label className="block text-gray-300 text-sm mb-1.5 sm:mb-2">How did you hear about us?</label>
            <select
              name="referralSource"
              value={formData.referralSource}
              onChange={handleChange}
              className="w-full bg-[#181111] border border-[#382929] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:border-[#CC2630] transition-colors"
              data-testid="select-signup-referral"
            >
              <option value="">Select option</option>
              {REFERRAL_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#ea2a33] hover:bg-[#c41f27] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 sm:py-3 rounded-lg transition-colors text-sm sm:text-base"
            data-testid="button-signup-submit"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating Account...
              </span>
            ) : (
              'Create Account'
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-[#382929]" />
            <span className="text-xs text-gray-500">or</span>
            <div className="flex-1 h-px bg-[#382929]" />
          </div>

          {/* Google Sign Up */}
          <button
            type="button"
            className="w-full bg-[#181111] border border-[#382929] hover:bg-[#2d1f1f] text-white py-2.5 sm:py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
            data-testid="button-signup-google"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-gray-400 text-sm">
            Already have an account?{' '}
            <Link href="/learn/auth/login" className="text-[#ea2a33] hover:underline font-semibold">
              Log in
            </Link>
          </p>

          <p className="text-center text-gray-500 text-xs sm:text-sm">
            <Link href="/" className="hover:text-white transition-colors">
              Back to Main Site
            </Link>
          </p>
        </form>

        {/* Enrollment Disclaimer */}
        <div className="mt-4 bg-[#261c1c]/50 border border-[#382929]/50 rounded-xl px-4 py-3 text-center">
          <p className="text-gray-500 text-xs">
            Creating an account does not automatically enroll you in ASAP. After signing up, you
            can browse resources freely and enroll in the program separately when you&apos;re
            ready.
          </p>
        </div>
      </div>
    </div>
  );
}