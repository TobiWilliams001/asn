'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuthContext } from '@/context/AuthContext';

export default function EnrollPage() {
  return (
    <ProtectedRoute>
      <EnrollContent />
    </ProtectedRoute>
  );
}

function EnrollContent() {
  const router = useRouter();
  const { user, userProfile } = useAuthContext();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    university: '',
    yearOfStudy: '',
    program: 'asap'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user || userProfile) {
      setFormData(prev => ({
        ...prev,
        fullName: userProfile?.fullName || user?.displayName || prev.fullName,
        email: userProfile?.email || user?.email || prev.email,
        university: userProfile?.institution || prev.university,
      }));
    }
  }, [user, userProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Enrollment data:', formData);
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
      <div className="relative bg-gradient-to-br from-[#2d1f1f] via-[#261c1c] to-[#181111] border-b border-[#382929]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 text-center">
          <Link
            href="/learn"
            className="inline-flex items-center text-[#b89d9f] hover:text-white mb-4 sm:mb-6 text-sm"
          >
            &larr; Back to Learning Platform
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4">
            Join the <span className="text-[#ea2a33]">ASAP</span> Program
          </h1>
          <p className="text-base sm:text-xl text-[#b89d9f] max-w-2xl mx-auto">
            Transform your career in 12 weeks with Africa&apos;s premier student accelerator
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-10">

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#261c1c] border border-[#382929] rounded-xl p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-bold text-sm">ENROLLING NOW</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Cohort 2025</h3>
              <p className="text-[#b89d9f] text-sm mb-4">Next cohort starts February 2025</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between gap-2">
                  <span className="text-[#b89d9f]">Duration</span>
                  <span className="font-bold">12 Weeks</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-[#b89d9f]">Modules</span>
                  <span className="font-bold">5 Core</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-[#b89d9f]">Format</span>
                  <span className="font-bold">Online</span>
                </div>
              </div>
            </div>

            <div className="bg-[#261c1c] border border-[#382929] rounded-xl p-5 sm:p-6">
              <h3 className="text-lg font-bold mb-4">What You&apos;ll Get</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#ea2a33]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-[#ea2a33]">&#9654;</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Video Lessons</p>
                    <p className="text-xs text-[#b89d9f]">Expert-led content for each module</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#ea2a33]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-[#ea2a33]">&#128196;</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Resource Library</p>
                    <p className="text-xs text-[#b89d9f]">Templates, guides, and frameworks</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#ea2a33]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-[#ea2a33]">&#127942;</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Portfolio Deliverables</p>
                    <p className="text-xs text-[#b89d9f]">Resume, career map, research paper</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#ea2a33]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-[#ea2a33]">&#128101;</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Community Access</p>
                    <p className="text-xs text-[#b89d9f]">Connect with fellow African students</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-[#261c1c] border border-[#382929] rounded-xl p-5 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Enrollment Form</h2>
              <p className="text-[#b89d9f] text-sm mb-6">Fill in your details to secure your spot</p>

              <form onSubmit={handleSubmit} className="space-y-5">
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
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#181111] border border-[#382929] rounded-lg text-white placeholder-[#b89d9f] text-sm sm:text-base focus:outline-none focus:border-[#ea2a33] transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

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
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#181111] border border-[#382929] rounded-lg text-white placeholder-[#b89d9f] text-sm sm:text-base focus:outline-none focus:border-[#ea2a33] transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

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
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#181111] border border-[#382929] rounded-lg text-white placeholder-[#b89d9f] text-sm sm:text-base focus:outline-none focus:border-[#ea2a33] transition-colors"
                    placeholder="Enter your university name"
                  />
                </div>

                <div>
                  <label htmlFor="yearOfStudy" className="block text-sm font-bold mb-2">
                    Year of Study <span className="text-[#ea2a33]">*</span>
                  </label>
                  <select
                    id="yearOfStudy"
                    name="yearOfStudy"
                    required
                    value={formData.yearOfStudy}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#181111] border border-[#382929] rounded-lg text-white text-sm sm:text-base focus:outline-none focus:border-[#ea2a33] transition-colors"
                  >
                    <option value="">Select your year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                    <option value="5">5th Year+</option>
                    <option value="postgrad">Postgraduate</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="program" className="block text-sm font-bold mb-2">
                    Program <span className="text-[#ea2a33]">*</span>
                  </label>
                  <select
                    id="program"
                    name="program"
                    required
                    value={formData.program}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#181111] border border-[#382929] rounded-lg text-white text-sm sm:text-base focus:outline-none focus:border-[#ea2a33] transition-colors"
                  >
                    <option value="asap">African Student Accelerator Program (ASAP)</option>
                  </select>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="mt-1 w-4 h-4 accent-[#ea2a33]"
                  />
                  <label htmlFor="terms" className="text-xs sm:text-sm text-[#b89d9f]">
                    I agree to the ASN Learning Platform terms and commit to actively
                    participating in the 12-week program.
                  </label>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-3 sm:py-4 bg-[#ea2a33] hover:bg-[#c41f27] text-white text-base sm:text-lg font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        Processing...
                      </span>
                    ) : (
                      'Complete Enrollment'
                    )}
                  </button>
                </div>
              </form>

              <p className="text-center text-xs text-[#b89d9f] mt-6">
                Questions? Email <a href="mailto:info@asnafrica.org" className="text-[#ea2a33] hover:underline">info@asnafrica.org</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}