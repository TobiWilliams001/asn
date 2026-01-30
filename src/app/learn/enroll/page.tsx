// src/app/learn/enroll/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EnrollPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    university: '',
    program: 'asap'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock enrollment process (simulate API call)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In real implementation, this would call Firebase
    console.log('Enrollment data:', formData);

    // Redirect to success page
    router.push('/learn/enroll/success');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-[#181111] text-white">
      <div className="max-w-2xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-10">
          <Link 
            href="/learn"
            className="inline-flex items-center text-[#b89d9f] hover:text-white mb-4 text-sm"
          >
            &larr; Back to Learning Platform
          </Link>
          <h1 className="text-4xl font-black mb-2">Enroll in ASAP</h1>
          <p className="text-[#b89d9f]">Join the African Student Accelerator Program</p>
        </div>

        {/* Program Info Card */}
        <div className="bg-[#261c1c] border border-[#382929] rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">What You'll Get</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-[#ea2a33] mt-1">&check;</span>
              <span className="text-[#b89d9f]">12-week structured curriculum with 5 core modules</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#ea2a33] mt-1">&check;</span>
              <span className="text-[#b89d9f]">Video lessons and downloadable resources</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#ea2a33] mt-1">&check;</span>
              <span className="text-[#b89d9f]">Professional portfolio deliverables</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#ea2a33] mt-1">&check;</span>
              <span className="text-[#b89d9f]">Access to Resource Lab materials</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#ea2a33] mt-1">&check;</span>
              <span className="text-[#b89d9f]">Progress tracking and completion certificates</span>
            </li>
          </ul>
        </div>

        {/* Enrollment Form */}
        <div className="bg-[#261c1c] border border-[#382929] rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Enrollment Form</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-bold mb-2">
                Full Name <span className="text-[#ea2a33]">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#181111] border border-[#382929] rounded-lg text-white placeholder-[#b89d9f] focus:outline-none focus:border-[#ea2a33]"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold mb-2">
                Email Address <span className="text-[#ea2a33]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#181111] border border-[#382929] rounded-lg text-white placeholder-[#b89d9f] focus:outline-none focus:border-[#ea2a33]"
                placeholder="your.email@example.com"
              />
            </div>

            {/* University */}
            <div>
              <label htmlFor="university" className="block text-sm font-bold mb-2">
                University/Institution <span className="text-[#ea2a33]">*</span>
              </label>
              <input
                type="text"
                id="university"
                name="university"
                required
                value={formData.university}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#181111] border border-[#382929] rounded-lg text-white placeholder-[#b89d9f] focus:outline-none focus:border-[#ea2a33]"
                placeholder="Enter your university name"
              />
            </div>

            {/* Program Selection */}
            <div>
              <label htmlFor="program" className="block text-sm font-bold mb-2">
                Select Program <span className="text-[#ea2a33]">*</span>
              </label>
              <select
                id="program"
                name="program"
                required
                value={formData.program}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#181111] border border-[#382929] rounded-lg text-white focus:outline-none focus:border-[#ea2a33]"
              >
                <option value="asap">African Student Accelerator Program (ASAP)</option>
              </select>
              <p className="text-xs text-[#b89d9f] mt-2">
                More programs coming soon
              </p>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3 pt-4">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 w-4 h-4 accent-[#ea2a33]"
              />
              <label htmlFor="terms" className="text-sm text-[#b89d9f]">
                I agree to the ASN Learning Platform terms and conditions, and I commit to 
                actively participating in the program.
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-[#ea2a33] hover:bg-[#c41f27] text-white text-lg font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing Enrollment...' : 'Complete Enrollment'}
              </button>
            </div>
          </form>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-[#b89d9f]">
            Questions about enrollment?{' '}
            <a href="mailto:info@asnafrica.org" className="text-[#ea2a33] hover:underline">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}