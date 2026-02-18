'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import { learnDb } from '@/firebase/learnConfig';
import { doc, setDoc } from 'firebase/firestore';
import { Globe, Briefcase, GraduationCap, ChevronRight, CheckCircle, Loader2, Building, Rocket, UserCircle, Sparkles } from 'lucide-react';
import Image from 'next/image';

const COUNTRIES = [
  'Nigeria', 
  'Kenya', 
  'Ghana', 
  'South Africa', 
  'Egypt',
  'United Kingdom', 
  'United States', 
  'Canada',
  'Germany',
  'France',
  'India',
  'Australia',
  'Other'
];

const STATUS_OPTIONS = [
  { 
    value: 'student', 
    label: 'Student', 
    icon: GraduationCap,
    description: 'Currently pursuing education',
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    value: 'professional', 
    label: 'Professional', 
    icon: Briefcase,
    description: 'Working in the industry',
    color: 'from-purple-500 to-pink-500'
  },
  { 
    value: 'entrepreneur', 
    label: 'Entrepreneur', 
    icon: Rocket,
    description: 'Building your own venture',
    color: 'from-orange-500 to-red-500'
  },
  { 
    value: 'job_seeker', 
    label: 'Job Seeker', 
    icon: UserCircle,
    description: 'Exploring opportunities',
    color: 'from-green-500 to-emerald-500'
  },
];

export default function OnboardingPage() {
  const { user, userProfile } = useAuthContext();
  const router = useRouter();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    country: '',
    currentStatus: '',
    institution: '',
  });

  // Redirect if already complete
  useEffect(() => {
    if (userProfile?.onboardingComplete) {
      router.push('/learn/dashboard');
    }
  }, [userProfile, router]);

  const handleComplete = async () => {
    if (!user) return;
    setLoading(true);

    try {
      console.log('🔄 Saving onboarding...', user.uid);

      const userRef = doc(learnDb, 'users', user.uid);

      // setDoc with merge works whether doc exists or not
      await setDoc(userRef, {
        country: formData.country,
        currentStatus: formData.currentStatus,
        institution: formData.institution || null,
        onboardingComplete: true,
        updatedAt: new Date(),
        // Also set base fields in case signup didn't create the doc yet
        id: user.uid,
        email: user.email || '',
        fullName: user.displayName || '',
        role: 'free',
      }, { merge: true });

      console.log('✅ Onboarding saved!');

      // DON'T await refreshProfile - it causes the long hang
      // Redirect immediately, dashboard will load fresh profile
      router.push('/learn/dashboard');

    } catch (err: any) {
      console.error('❌ Onboarding error:', err.code, err.message);
      if (err.code === 'permission-denied') {
        alert('Permission denied. Please log out and sign in again.');
      } else {
        alert(`Error: ${err.message}`);
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0506] via-[#181111] to-[#0f0909] flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#ea2a33] rounded-full mix-blend-multiply filter blur-[140px] opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-[#c41e3a] rounded-full mix-blend-multiply filter blur-[140px] opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-[#8b1625] rounded-full mix-blend-multiply filter blur-[140px] opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Logo and Progress */}
      <div className="mb-12 text-center relative z-10">
        <div className="mb-8 transform transition-transform hover:scale-105 duration-300">
          <Image src="/Group.svg" alt="ASN Logo" width={120} height={50} className="mx-auto" />
        </div>
        
        {/* Progress Indicator */}
        <div className="flex items-center gap-3 justify-center mb-4">
          {[1, 2].map((s) => (
            <div key={s} className="relative">
              <div className={`h-2 w-16 rounded-full transition-all duration-500 ${
                step >= s ? 'bg-gradient-to-r from-[#ea2a33] to-[#c41e3a]' : 'bg-white/10'
              }`} />
              {step >= s && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#ea2a33] to-[#c41e3a] rounded-full animate-pulse opacity-50 blur-sm" />
              )}
            </div>
          ))}
        </div>
        <p className="text-gray-400 text-sm font-medium">Step {step} of 2</p>
      </div>

      <div className="w-full max-w-lg relative z-10">
        <div className="bg-[#1a1314]/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Glass morphism accent */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          
          {step === 1 ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              {/* Header */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#ea2a33]/20 to-[#c41e3a]/20 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/10 shadow-lg">
                  <Globe className="text-[#ea2a33]" size={36} strokeWidth={1.5} />
                </div>
                <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">
                  Welcome! Let&apos;s get started
                </h1>
                <p className="text-gray-400 text-base leading-relaxed">
                  Help us personalize your experience by sharing where you&apos;re from
                </p>
              </div>

              {/* Country Selection */}
              <div className="space-y-3">
                <label className="block text-gray-300 text-sm font-medium ml-1">
                  Select Your Country
                </label>
                <div className="relative">
                  <select 
                    className="w-full bg-[#0f0a0b]/50 border border-white/10 text-white px-4 py-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ea2a33] focus:border-transparent transition-all appearance-none backdrop-blur-sm cursor-pointer hover:bg-[#0f0a0b]/70"
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                  >
                    <option value="" className="bg-[#1a1314] text-gray-400">Choose a country...</option>
                    {COUNTRIES.map(c => (
                      <option key={c} value={c} className="bg-[#1a1314] text-white">
                        {c}
                      </option>
                    ))}
                  </select>
                  <ChevronRight 
                    size={20} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 rotate-90 pointer-events-none" 
                  />
                </div>
              </div>

              {/* Continue Button */}
              <button 
                disabled={!formData.country}
                onClick={() => setStep(2)}
                className="w-full bg-gradient-to-r from-[#ea2a33] to-[#c41e3a] text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-[#ea2a33]/20 transition-all active:scale-[0.98] group mt-8"
              >
                <span>Continue</span>
                <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              {/* Header */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-blue-500/20 shadow-lg">
                  <Sparkles className="text-blue-400" size={36} strokeWidth={1.5} />
                </div>
                <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">
                  Tell us about yourself
                </h1>
                <p className="text-gray-400 text-base leading-relaxed">
                  This helps us tailor content to your needs
                </p>
              </div>

              {/* Status Selection */}
              <div className="space-y-4">
                <label className="block text-gray-300 text-sm font-medium ml-1">
                  What best describes you?
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {STATUS_OPTIONS.map((status) => {
                    const Icon = status.icon;
                    const isSelected = formData.currentStatus === status.value;
                    
                    return (
                      <button
                        key={status.value}
                        onClick={() => setFormData({...formData, currentStatus: status.value})}
                        className={`group relative flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 ${
                          isSelected
                          ? 'border-white/20 bg-gradient-to-r ' + status.color + ' shadow-lg scale-[1.02]' 
                          : 'border-white/10 bg-[#0f0a0b]/50 hover:border-white/20 hover:bg-[#0f0a0b]/70'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                          isSelected 
                          ? 'bg-white/20 backdrop-blur-sm' 
                          : 'bg-white/5'
                        }`}>
                          <Icon size={24} className={isSelected ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'} />
                        </div>
                        <div className="flex-1 text-left">
                          <p className={`font-semibold text-base ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                            {status.label}
                          </p>
                          <p className={`text-sm mt-0.5 ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                            {status.description}
                          </p>
                        </div>
                        {isSelected && (
                          <CheckCircle size={24} className="text-white animate-in zoom-in duration-300" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Institution Input */}
              {formData.currentStatus && (
                <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <label className="block text-gray-300 text-sm font-medium ml-1">
                    {formData.currentStatus === 'student' ? 'University/Institution Name' : 
                     formData.currentStatus === 'professional' ? 'Company Name' :
                     formData.currentStatus === 'entrepreneur' ? 'Venture/Company Name' :
                     'Organization (Optional)'}
                  </label>
                  <div className="relative">
                    <Building size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text"
                      placeholder={
                        formData.currentStatus === 'student' ? "e.g., University of Lagos" : 
                        formData.currentStatus === 'professional' ? "e.g., Andela" :
                        formData.currentStatus === 'entrepreneur' ? "e.g., MyStartup Inc" :
                        "Organization name"
                      }
                      className="w-full bg-[#0f0a0b]/50 border border-white/10 text-white pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ea2a33] focus:border-transparent transition-all placeholder:text-gray-500 backdrop-blur-sm"
                      value={formData.institution}
                      onChange={(e) => setFormData({...formData, institution: e.target.value})}
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => setStep(1)}
                  disabled={loading}
                  className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 font-semibold py-4 rounded-xl hover:bg-white/10 transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  Back
                </button>
                <button 
                  disabled={!formData.currentStatus || !formData.institution || loading}
                  onClick={handleComplete}
                  className="flex-[2] bg-gradient-to-r from-[#ea2a33] to-[#c41e3a] text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-[#ea2a33]/20 transition-all active:scale-[0.98] group"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      <span>Complete Setup</span>
                      <Sparkles size={18} className="transition-transform group-hover:rotate-12" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Subtle bottom glow matching current step */}
        <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-24 blur-3xl rounded-full pointer-events-none transition-colors duration-500 ${
          step === 1 ? 'bg-[#ea2a33]/10' : 'bg-blue-500/10'
        }`}></div>
      </div>
    </div>
  );
}