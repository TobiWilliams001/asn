'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import { SignupData, CurrentStatus } from '@/services/authService';

const COUNTRIES = [
  "Nigeria", "Kenya", "South Africa", "Ghana", "Ethiopia", "Tanzania",
  "Uganda", "Rwanda", "Egypt", "Morocco", "Cameroon", "Senegal", "Other"
];

const STATUS_OPTIONS: { value: CurrentStatus; label: string }[] = [
  { value: "student", label: "Student" },
  { value: "professional", label: "Working Professional" },
  { value: "entrepreneur", label: "Entrepreneur" },
  { value: "job_seeker", label: "Job Seeker" },
  { value: "other", label: "Other" }
];

const REFERRAL_OPTIONS = [
  { value: "social_media", label: "Social Media" },
  { value: "friend", label: "Friend/Colleague" },
  { value: "university", label: "University" },
  { value: "search", label: "Google Search" },
  { value: "event", label: "Event/Conference" },
  { value: "other", label: "Other" }
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
    currentStatus: '' as CurrentStatus | '',
    institution: '',
    referralSource: ''
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
      const signupData: SignupData = {
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        country: formData.country,
        currentStatus: formData.currentStatus as CurrentStatus,
        institution: formData.institution || undefined,
        referralSource: formData.referralSource || undefined
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
    if (formData.currentStatus === 'professional' || formData.currentStatus === 'entrepreneur') return 'Company/Organization';
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
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Join ASN</h1>
          <p className="text-gray-400 text-sm sm:text-base">Create your free account</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#261c1c] rounded-xl p-5 sm:p-8 space-y-4 sm:space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-gray-300 text-sm mb-1.5 sm:mb-2">Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full bg-[#181111] border border-gray-700 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:border-[#CC2630]"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-1.5 sm:mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-[#181111] border border-gray-700 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:border-[#CC2630]"
              placeholder="Enter your email"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 text-sm mb-1.5 sm:mb-2">Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-[#181111] border border-gray-700 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:border-[#CC2630]"
                placeholder="Min 6 characters"
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
                className="w-full bg-[#181111] border border-gray-700 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:border-[#CC2630]"
                placeholder="Confirm password"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 text-sm mb-1.5 sm:mb-2">Country *</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="w-full bg-[#181111] border border-gray-700 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:border-[#CC2630]"
              >
                <option value="">Select country</option>
                {COUNTRIES.map(country => (
                  <option key={country} value={country}>{country}</option>
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
                className="w-full bg-[#181111] border border-gray-700 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:border-[#CC2630]"
              >
                <option value="">Select status</option>
                {STATUS_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-1.5 sm:mb-2">{getInstitutionLabel()}</label>
            <input
              type="text"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              className="w-full bg-[#181111] border border-gray-700 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:border-[#CC2630]"
              placeholder="Enter your institution or organization"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-1.5 sm:mb-2">How did you hear about us?</label>
            <select
              name="referralSource"
              value={formData.referralSource}
              onChange={handleChange}
              className="w-full bg-[#181111] border border-gray-700 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:border-[#CC2630]"
            >
              <option value="">Select option</option>
              {REFERRAL_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#ea2a33] hover:bg-[#c41f27] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 sm:py-3 rounded-lg transition-colors text-sm sm:text-base"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>

          <p className="text-center text-gray-400 text-sm">
            Already have an account?{' '}
            <Link href="/learn/auth/login" className="text-[#ea2a33] hover:underline">
              Log in
            </Link>
          </p>

          <p className="text-center text-gray-500 text-xs sm:text-sm">
            <Link href="/" className="hover:text-white transition-colors">
              Back to Main Site
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}