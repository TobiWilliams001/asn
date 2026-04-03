'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, MapPin, GraduationCap, FileText, Briefcase, Rocket, Building2, ChevronRight, ChevronLeft, CheckCircle, Loader2, Edit2, Lock, Award, Target, Lightbulb, AlertCircle, Check } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuthContext } from '@/context/AuthContext';
import { learnDb } from '@/firebase/learnConfig';
import { collection, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';

export default function ASAPEnrollPage() {
  return (
    <ProtectedRoute>
      <EnrollContent />
    </ProtectedRoute>
  );
}

import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { getData } from 'country-list';

const COUNTRIES = getData().map(c => c.name).sort();

const TRACKS = [
  {
    id: 'technology',
    icon: Briefcase,
    title: 'Technology & Digital Innovation',
    description: 'Software engineering, data science, and AI-driven solutions for African markets',
    focus: 'Scale & Architecture'
  },
  {
    id: 'entrepreneurship',
    icon: Rocket,
    title: 'Entrepreneurship & Venture',
    description: 'Building sustainable businesses and social enterprises from the ground up',
    focus: 'Operations & Funding'
  },
  {
    id: 'policy',
    icon: Building2,
    title: 'Public Policy & Governance',
    description: 'Leading systemic reform in civil service, non-profits, and policy design',
    focus: 'Ethics & Impact'
  }
];

function EnrollContent() {
  const router = useRouter();
  const { user, userProfile } = useAuthContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedStatement, setExpandedStatement] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    // If user already applied, redirect to status page
    if (userProfile?.asapStatus === 'applicant') {
      router.push('/learn/asap/application-status');
    }

    // If user is already enrolled, redirect to modules
    if (userProfile?.asapStatus === 'enrolled') {
      router.push('/learn/asap/modules');
    }
  }, [userProfile, router]);

  const [formData, setFormData] = useState({
    firstName: userProfile?.firstName || user?.displayName?.split(' ')[0] || '',
    lastName: userProfile?.lastName || user?.displayName?.split(' ').slice(1).join(' ') || '',
    email: userProfile?.email || user?.email || '',
    phone: '',
    country: userProfile?.country || '',
    city: '',
    bio: userProfile?.bio || '',
    statementOfIntent: '',
    university: userProfile?.institution || '',
    degreeProgram: '',
    gpa: '',
    graduationYear: '',
    track: '',
    trackJustification: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!user) return;
    setIsSubmitting(true);

    try {
      const applicationRef = await addDoc(collection(learnDb, 'applications'), {
        userId: user.uid,
        status: 'pending',
        submittedAt: serverTimestamp(),
        
        personalInfo: {
          fullName: `${formData.firstName} ${formData.lastName}`,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          city: formData.city,
          bio: formData.bio,
          statementOfIntent: formData.statementOfIntent,
        },
        
        academicInfo: {
          university: formData.university,
          degreeProgram: formData.degreeProgram,
          gpa: formData.gpa,
          graduationYear: parseInt(formData.graduationYear),
        },
        
        track: formData.track,
        trackJustification: formData.trackJustification,
        
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      const userRef = doc(learnDb, 'users', user.uid);
      await updateDoc(userRef, {
        asapApplicationId: applicationRef.id,
        asapStatus: 'applicant',
        role: 'applicant',
        updatedAt: serverTimestamp(),
      });

      router.push('/learn/asap/enroll/success');
    } catch (error) {
      console.error('Enrollment error:', error);
      alert('Failed to submit application. Please try again.');
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    if (currentStep === 1) {
      return formData.firstName && formData.lastName && formData.email && formData.phone && 
             formData.country && formData.city && formData.bio && 
             formData.statementOfIntent.split(' ').filter(Boolean).length >= 250;
    }
    if (currentStep === 2) {
      return formData.university && formData.degreeProgram && 
             formData.gpa && formData.graduationYear;
    }
    if (currentStep === 3) {
      return formData.track && formData.trackJustification.split(' ').filter(Boolean).length >= 100;
    }
    return true;
  };

  const wordCount = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;
  const getSelectedTrack = () => TRACKS.find(t => t.id === formData.track);
  const progressPercentage = (currentStep / 4) * 100;

  const STEP_INFO = [
    { num: 1, label: 'Personal', icon: User },
    { num: 2, label: 'Academic', icon: GraduationCap },
    { num: 3, label: 'Track', icon: Target },
    { num: 4, label: 'Review', icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#261c1c] to-[#181111] pb-16 relative overflow-hidden">
      
      {/* Subtle background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#ea2a33]/6 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-[#CC2630]/4 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-[#8b1625]/3 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 relative z-10">
        
        <div className="mb-8 text-center animate-in fade-in slide-in-from-top duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ea2a33]/10 border border-[#ea2a33]/20 rounded-full mb-4">
            <Award size={14} className="text-[#ea2a33]" />
            <span className="text-xs font-bold text-[#ea2a33] uppercase tracking-wider">12-Week Intensive Program</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">
            ASAP Enrollment Application
          </h1>
          <p className="text-[#b89d9f] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Join Africa&apos;s next generation of leaders and changemakers
          </p>
        </div>

        {/* Step Indicator */}
        <div className="mb-8 animate-in fade-in slide-in-from-top duration-700 delay-150">
          <div className="flex items-center justify-between mb-6">
            {STEP_INFO.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.num;
              const isCompleted = currentStep > step.num;
              
              return (
                <div key={step.num} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCompleted ? 'bg-white/10 border-2 border-white/30' :
                      isActive ? 'bg-gradient-to-r from-[#CC2630] to-[#ea2a33] border-2 border-[#ea2a33] shadow-lg shadow-[#ea2a33]/30 scale-110' :
                      'bg-white/[0.04] border-2 border-white/[0.06]'
                    }`}>
                      {isCompleted ? (
                        <Check size={20} className="text-white" strokeWidth={3} />
                      ) : (
                        <StepIcon size={18} className={isActive ? 'text-white' : 'text-[#b89d9f]'} />
                      )}
                      {isActive && (
                        <div className="absolute inset-0 rounded-full bg-[#ea2a33] opacity-20 animate-ping" />
                      )}
                    </div>
                    <span className={`text-xs sm:text-sm font-bold mt-2 transition-colors ${
                      isActive ? 'text-white' : 'text-[#b89d9f]'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                  {index < STEP_INFO.length - 1 && (
                    <div className="flex-1 h-0.5 mx-2 mb-8">
                      <div className={`h-full transition-all duration-500 ${
                        currentStep > step.num ? 'bg-white/30' : 'bg-white/[0.06]'
                      }`} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="h-1 w-full bg-white/[0.04] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#CC2630] to-[#ea2a33] transition-all duration-700 ease-out" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className={`bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 ${
          isSubmitting ? 'pointer-events-none opacity-60' : ''
        }`}>
          
          {/* Step 1: Personal Info */}
          {currentStep === 1 && (
            <>
              <div className="p-6 sm:p-8 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#CC2630] to-[#ea2a33] flex items-center justify-center shadow-lg">
                    <User size={22} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-white">Personal Information</h3>
                    <p className="text-xs sm:text-sm text-[#b89d9f]">Tell us about yourself</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#EEB7BA] mb-2.5 block flex items-center gap-2">
                      First Name *
                      {formData.firstName && <Check size={14} className="text-white/40" />}
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('firstName')}
                      onBlur={() => setFocusedField(null)}
                      autoComplete="given-name"
                      className={`w-full rounded-xl px-4 py-4 text-sm bg-[#0f0a0b] border-2 transition-all text-white placeholder-[#b89d9f]/40 focus:outline-none ${
                        focusedField === 'firstName' ? 'border-[#ea2a33] shadow-lg shadow-[#ea2a33]/20' : 
                        formData.firstName ? 'border-white/20' : 'border-white/[0.06]'
                      }`}
                      placeholder="e.g. John"
                      required
                    />
                  </div>

                  <div className="group">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#EEB7BA] mb-2.5 block flex items-center gap-2">
                      Last Name *
                      {formData.lastName && <Check size={14} className="text-white/40" />}
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('lastName')}
                      onBlur={() => setFocusedField(null)}
                      autoComplete="family-name"
                      className={`w-full rounded-xl px-4 py-4 text-sm bg-[#0f0a0b] border-2 transition-all text-white placeholder-[#b89d9f]/40 focus:outline-none ${
                        focusedField === 'lastName' ? 'border-[#ea2a33] shadow-lg shadow-[#ea2a33]/20' : 
                        formData.lastName ? 'border-white/20' : 'border-white/[0.06]'
                      }`}
                      placeholder="e.g. Doe"
                      required
                    />
                  </div>

                  <div className="group">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#EEB7BA] mb-2.5 block flex items-center gap-2">
                      Email Address
                      {formData.email && <Check size={14} className="text-white/40" />}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      autoComplete="email"
                      className={`w-full rounded-xl px-4 py-4 text-sm bg-[#0f0a0b] border-2 transition-all text-white placeholder-[#b89d9f]/40 focus:outline-none ${
                        focusedField === 'email' ? 'border-[#ea2a33] shadow-lg shadow-[#ea2a33]/20' : 
                        formData.email ? 'border-white/20' : 'border-white/[0.06]'
                      }`}
                      placeholder="name@example.com"
                      required
                    />
                  </div>

                  <div className="group">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#EEB7BA] mb-2.5 block flex items-center gap-2">
                      Phone Number
                      {formData.phone && <Check size={14} className="text-white/40" />}
                    </label>
                    <div className={`phone-input-container w-full rounded-xl px-4 py-0.5 bg-[#0f0a0b] border-2 transition-all ${
                      focusedField === 'phone' ? 'border-[#ea2a33] shadow-lg shadow-[#ea2a33]/20' : 
                      formData.phone ? 'border-white/20' : 'border-white/[0.06]'
                    }`}>
                      <PhoneInput
                        international
                        defaultCountry="NG"
                        value={formData.phone}
                        onChange={(value) => setFormData(prev => ({ ...prev, phone: value || '' }))}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        className="bg-[#0f0a0b] text-white text-sm py-3.5 focus:outline-none enrollment-phone-input"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#EEB7BA] mb-2.5 block flex items-center gap-2">
                      Country
                      {formData.country && <Check size={14} className="text-white/40" />}
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('country')}
                      onBlur={() => setFocusedField(null)}
                      autoComplete="country-name"
                      className={`w-full rounded-xl px-4 py-4 text-sm bg-[#0f0a0b] border-2 transition-all text-white focus:outline-none appearance-none cursor-pointer ${
                        focusedField === 'country' ? 'border-[#ea2a33] shadow-lg shadow-[#ea2a33]/20' : 
                        formData.country ? 'border-white/20' : 'border-white/[0.06]'
                      }`}
                      required
                    >
                      <option value="" className="bg-[#0f0a0b]">Select Country</option>
                      {COUNTRIES.map(c => (
                        <option key={c} value={c} className="bg-[#0f0a0b] text-white">{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="group">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#EEB7BA] mb-2.5 block flex items-center gap-2">
                      City / Region
                      {formData.city && <Check size={14} className="text-white/40" />}
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('city')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full rounded-xl px-4 py-4 text-sm bg-[#0f0a0b] border-2 transition-all text-white placeholder-[#b89d9f]/40 focus:outline-none ${
                        focusedField === 'city' ? 'border-[#ea2a33] shadow-lg shadow-[#ea2a33]/20' : 
                        formData.city ? 'border-white/20' : 'border-white/[0.06]'
                      }`}
                      placeholder="e.g. Lagos, Nairobi, Accra"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-6 border-t border-white/[0.06]">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#EEB7BA] flex items-center gap-2">
                    Brief Bio (2-3 sentences)
                    {formData.bio && <Check size={14} className="text-white/40" />}
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('bio')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full rounded-xl px-4 py-4 text-sm bg-[#0f0a0b] border-2 transition-all text-white placeholder-[#b89d9f]/40 focus:outline-none resize-none ${
                      focusedField === 'bio' ? 'border-[#ea2a33] shadow-lg shadow-[#ea2a33]/20' : 
                      formData.bio ? 'border-white/20' : 'border-white/[0.06]'
                    }`}
                    placeholder="A concise summary of your background, achievements, and current focus..."
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-4 pt-6 border-t border-white/[0.06]">
                  <div className="flex items-center justify-between">
                    <label className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      Statement of Intent
                      {wordCount(formData.statementOfIntent) >= 250 && (
                        <CheckCircle size={18} className="text-white/40" />
                      )}
                    </label>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
                      wordCount(formData.statementOfIntent) >= 250 ? 'bg-white/10 border border-white/20' : 'bg-white/[0.04] border border-white/[0.06]'
                    }`}>
                      <FileText size={14} className="text-[#ea2a33]" />
                      <span className={`text-xs font-bold ${wordCount(formData.statementOfIntent) >= 250 ? 'text-white' : 'text-[#b89d9f]'}`}>
                        {wordCount(formData.statementOfIntent)} / 500
                      </span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-[#b89d9f] italic flex items-start gap-2">
                    <Lightbulb size={14} className="flex-shrink-0 mt-0.5 text-[#ea2a33]" />
                    How will the ASAP program help you drive social or economic impact in your community?
                  </p>
                  <textarea
                    name="statementOfIntent"
                    value={formData.statementOfIntent}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('statement')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full rounded-xl p-5 sm:p-6 text-sm sm:text-base leading-relaxed bg-[#0f0a0b] border-2 transition-all text-white placeholder-[#b89d9f]/40 focus:outline-none resize-y min-h-[250px] ${
                      focusedField === 'statement' ? 'border-[#ea2a33] shadow-lg shadow-[#ea2a33]/20' : 
                      wordCount(formData.statementOfIntent) >= 250 ? 'border-white/20' : 'border-white/[0.06]'
                    }`}
                    placeholder="Share your vision, the specific challenges you want to address, and how ASAP will help you create lasting impact..."
                    rows={8}
                    required
                  />
                  {wordCount(formData.statementOfIntent) < 250 && (
                    <p className="text-xs text-[#b89d9f]/60 flex items-center gap-2">
                      <AlertCircle size={12} />
                      Minimum 250 words required • {250 - wordCount(formData.statementOfIntent)} words remaining
                    </p>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Step 2: Academic Background */}
          {currentStep === 2 && (
            <>
              <div className="p-6 sm:p-8 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#CC2630] to-[#ea2a33] flex items-center justify-center shadow-lg">
                    <GraduationCap size={22} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-white">Academic Background</h3>
                    <p className="text-xs sm:text-sm text-[#b89d9f]">Your educational journey</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 sm:p-8 space-y-6">
                <div className="group">
                  <label className="block text-sm font-bold text-[#EEB7BA] mb-2.5 flex items-center gap-2">
                    University / Institution
                    {formData.university && <Check size={14} className="text-white/40" />}
                  </label>
                  <input
                    type="text"
                    name="university"
                    list="universities"
                    value={formData.university}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('university')}
                    onBlur={() => setFocusedField(null)}
                    autoComplete="organization"
                    className={`w-full rounded-xl px-4 py-4 text-sm bg-[#0f0a0b] border-2 transition-all text-white placeholder-[#b89d9f]/40 focus:outline-none ${
                      focusedField === 'university' ? 'border-[#ea2a33] shadow-lg shadow-[#ea2a33]/20' : 
                      formData.university ? 'border-white/20' : 'border-white/[0.06]'
                    }`}
                    placeholder="e.g. University of Lagos"
                    required
                  />
                  <datalist id="universities">
                    <option value="University of Lagos" />
                    <option value="University of Ibadan" />
                    <option value="Kwame Nkrumah University of Science and Technology" />
                    <option value="University of Ghana" />
                    <option value="University of Nairobi" />
                    <option value="University of Cape Town" />
                    <option value="Makerere University" />
                    <option value="Addis Ababa University" />
                    <option value="Cairo University" />
                    <option value="American University in Cairo" />
                    <option value="Ashesi University" />
                    <option value="University of Pretoria" />
                  </datalist>
                </div>

                <div className="group">
                  <label className="block text-sm font-bold text-[#EEB7BA] mb-2.5 flex items-center gap-2">
                    Degree Program & Major
                    {formData.degreeProgram && <Check size={14} className="text-white/40" />}
                  </label>
                  <input
                    type="text"
                    name="degreeProgram"
                    list="degrees"
                    value={formData.degreeProgram}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('degree')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full rounded-xl px-4 py-4 text-sm bg-[#0f0a0b] border-2 transition-all text-white placeholder-[#b89d9f]/40 focus:outline-none ${
                      focusedField === 'degree' ? 'border-[#ea2a33] shadow-lg shadow-[#ea2a33]/20' : 
                      formData.degreeProgram ? 'border-white/20' : 'border-white/[0.06]'
                    }`}
                    placeholder="e.g. Computer Science"
                    required
                  />
                  <datalist id="degrees">
                    <option value="Computer Science" />
                    <option value="Business Administration" />
                    <option value="Engineering" />
                    <option value="Economics" />
                    <option value="Law" />
                    <option value="Medicine" />
                    <option value="Accounting" />
                    <option value="Marketing" />
                    <option value="International Relations" />
                    <option value="Political Science" />
                    <option value="Information Technology" />
                    <option value="Mathematics" />
                  </datalist>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-bold text-[#EEB7BA] mb-2.5 flex items-center gap-2">
                      Expected Graduation
                      {formData.graduationYear && <Check size={14} className="text-white/40" />}
                    </label>
                    <input
                      type="number"
                      name="graduationYear"
                      value={formData.graduationYear}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('gradYear')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full rounded-xl px-4 py-4 text-sm bg-[#0f0a0b] border-2 transition-all text-white placeholder-[#b89d9f]/40 focus:outline-none ${
                        focusedField === 'gradYear' ? 'border-[#ea2a33] shadow-lg shadow-[#ea2a33]/20' : 
                        formData.graduationYear ? 'border-white/20' : 'border-white/[0.06]'
                      }`}
                      placeholder="YYYY"
                      min="2000"
                      max="2030"
                      required
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-bold text-[#EEB7BA] mb-2.5 flex items-center gap-2">
                      Current GPA / Grade
                      {formData.gpa && <Check size={14} className="text-white/40" />}
                    </label>
                    <input
                      type="text"
                      name="gpa"
                      value={formData.gpa}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('gpa')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full rounded-xl px-4 py-4 text-sm bg-[#0f0a0b] border-2 transition-all text-white placeholder-[#b89d9f]/40 focus:outline-none ${
                        focusedField === 'gpa' ? 'border-[#ea2a33] shadow-lg shadow-[#ea2a33]/20' : 
                        formData.gpa ? 'border-white/20' : 'border-white/[0.06]'
                      }`}
                      placeholder="e.g. 3.8/4.0 or First Class"
                      required
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Step 3: Track Selection */}
          {currentStep === 3 && (
            <>
              <div className="p-6 sm:p-8 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#CC2630] to-[#ea2a33] flex items-center justify-center shadow-lg">
                    <Target size={22} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-white">Choose Your Track</h3>
                    <p className="text-xs sm:text-sm text-[#b89d9f]">Select your impact focus area</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 sm:p-8 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {TRACKS.map((track) => {
                    const Icon = track.icon;
                    const isSelected = formData.track === track.id;
                    
                    return (
                      <label key={track.id} className="cursor-pointer group">
                        <input
                          type="radio"
                          name="track"
                          value={track.id}
                          checked={isSelected}
                          onChange={handleChange}
                          className="hidden"
                        />
                        <div className={`relative p-6 rounded-2xl flex flex-col min-h-[300px] border-2 transition-all duration-300 ${
                          isSelected
                            ? 'border-[#ea2a33] bg-[#ea2a33]/5 shadow-xl shadow-[#ea2a33]/20 scale-[1.02]'
                            : 'border-white/[0.06] bg-[#0f0a0b] hover:border-white/20 hover:bg-white/[0.04]'
                        }`}>
                          
                          <div className={`w-14 h-14 rounded-xl bg-[#ea2a33]/10 flex items-center justify-center mb-4 border border-[#ea2a33]/20 ${isSelected ? 'scale-110' : 'group-hover:scale-105'} transition-transform`}>
                            <Icon size={26} className={isSelected ? 'text-[#ea2a33]' : 'text-[#b89d9f]'} />
                          </div>

                          <h4 className="text-base sm:text-lg font-bold mb-2.5 text-white leading-tight">{track.title}</h4>
                          <p className="text-xs sm:text-sm text-[#b89d9f] leading-relaxed mb-auto">{track.description}</p>
                          
                          <div className="pt-4 mt-4 border-t border-white/[0.06]">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#b89d9f]/60">
                                Focus: {track.focus}
                              </span>
                              {isSelected && (
                                <CheckCircle size={22} className="text-[#ea2a33]" />
                              )}
                            </div>
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>

                {formData.track && (
                  <div className="space-y-4 pt-6 border-t border-white/[0.06] animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <label className="block">
                      <span className="text-base sm:text-lg font-bold text-white block mb-2 flex items-center gap-2">
                        Why this track?
                        {wordCount(formData.trackJustification) >= 100 && (
                          <CheckCircle size={18} className="text-white/40" />
                        )}
                      </span>
                      <p className="text-xs text-[#b89d9f] mb-4 italic flex items-start gap-2">
                        <Lightbulb size={14} className="flex-shrink-0 mt-0.5 text-[#ea2a33]" />
                        Detail your experience and how this track aligns with your vision
                      </p>
                      <textarea
                        name="trackJustification"
                        value={formData.trackJustification}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('trackJust')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full rounded-xl p-5 sm:p-6 text-sm sm:text-base leading-relaxed bg-[#0f0a0b] border-2 transition-all text-white placeholder-[#b89d9f]/40 focus:outline-none resize-y min-h-[200px] ${
                          focusedField === 'trackJust' ? 'border-[#ea2a33] shadow-lg shadow-[#ea2a33]/20' : 
                          wordCount(formData.trackJustification) >= 100 ? 'border-white/20' : 'border-white/[0.06]'
                        }`}
                        placeholder="Share your relevant experience and long-term vision..."
                        rows={6}
                        required
                      />
                    </label>
                    <div className="flex items-center justify-between px-2">
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
                        wordCount(formData.trackJustification) >= 100 ? 'bg-white/10 border border-white/20' : 'bg-white/[0.04] border border-white/[0.06]'
                      }`}>
                        <FileText size={14} className="text-[#ea2a33]" />
                        <span className={`text-xs font-bold ${wordCount(formData.trackJustification) >= 100 ? 'text-white' : 'text-[#b89d9f]'}`}>
                          {wordCount(formData.trackJustification)} / 300
                        </span>
                      </div>
                      {wordCount(formData.trackJustification) < 100 && (
                        <p className="text-xs text-[#b89d9f]/60 flex items-center gap-2">
                          <AlertCircle size={12} />
                          {100 - wordCount(formData.trackJustification)} words remaining
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 4 && (
            <>
              <div className="p-6 sm:p-8 border-b border-white/[0.06]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#CC2630] to-[#ea2a33] flex items-center justify-center shadow-lg">
                      <CheckCircle size={22} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-white">Review & Submit</h3>
                      <p className="text-xs sm:text-sm text-[#b89d9f]">Verify your information</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#b89d9f]">
                    <Lock size={14} />
                    <span>Encrypted & Private</span>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-white/[0.06]">
                
                <div className="p-6 sm:p-8">
                  <div className="flex justify-between items-start mb-6">
                    <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#ea2a33]">01. Personal Information</h4>
                    <button 
                      onClick={() => setCurrentStep(1)}
                      className="flex items-center gap-1 text-xs font-semibold text-[#b89d9f] hover:text-white transition-all group"
                    >
                      <Edit2 size={14} className="group-hover:scale-110 transition-transform" /> EDIT
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                    <div>
                      <p className="text-xs text-[#b89d9f] mb-1.5 uppercase font-semibold">Name</p>
                      <p className="text-sm font-semibold text-white">{formData.firstName} {formData.lastName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#b89d9f] mb-1.5 uppercase font-semibold">Email</p>
                      <p className="text-sm font-semibold text-white">{formData.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#b89d9f] mb-1.5 uppercase font-semibold">Country</p>
                      <p className="text-sm font-semibold text-white">{formData.country}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#b89d9f] mb-1.5 uppercase font-semibold">Phone</p>
                      <p className="text-sm font-semibold text-white">{formData.phone}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-xs text-[#b89d9f] mb-2.5 uppercase font-semibold flex items-center gap-2">
                        Statement of Intent 
                        <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-[10px] font-bold">
                          {wordCount(formData.statementOfIntent)} words
                        </span>
                      </p>
                      <div className="p-4 sm:p-5 rounded-xl bg-[#0f0a0b] border border-white/[0.06]">
                        <p className={`text-sm leading-relaxed text-white ${expandedStatement ? '' : 'line-clamp-4'}`}>
                          {formData.statementOfIntent}
                        </p>
                        {formData.statementOfIntent.length > 200 && (
                          <button 
                            onClick={() => setExpandedStatement(!expandedStatement)}
                            className="text-xs text-[#ea2a33] mt-3 hover:underline font-semibold flex items-center gap-1"
                          >
                            {expandedStatement ? (
                              <><ChevronLeft size={12} /> Show Less</>
                            ) : (
                              <>Read Full Statement <ChevronRight size={12} /></>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex justify-between items-start mb-6">
                    <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#ea2a33]">02. Academic Background</h4>
                    <button 
                      onClick={() => setCurrentStep(2)}
                      className="flex items-center gap-1 text-xs font-semibold text-[#b89d9f] hover:text-white transition-all group"
                    >
                      <Edit2 size={14} className="group-hover:scale-110 transition-transform" /> EDIT
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                    <div>
                      <p className="text-xs text-[#b89d9f] mb-1.5 uppercase font-semibold">Institution</p>
                      <p className="text-sm font-semibold text-white">{formData.university}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#b89d9f] mb-1.5 uppercase font-semibold">Degree Program</p>
                      <p className="text-sm font-semibold text-white">{formData.degreeProgram}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#b89d9f] mb-1.5 uppercase font-semibold">GPA / Grade</p>
                      <p className="text-sm font-semibold text-white">{formData.gpa}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#b89d9f] mb-1.5 uppercase font-semibold">Expected Graduation</p>
                      <p className="text-sm font-semibold text-white">{formData.graduationYear}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex justify-between items-start mb-6">
                    <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#ea2a33]">03. Program Track</h4>
                    <button 
                      onClick={() => setCurrentStep(3)}
                      className="flex items-center gap-1 text-xs font-semibold text-[#b89d9f] hover:text-white transition-all group"
                    >
                      <Edit2 size={14} className="group-hover:scale-110 transition-transform" /> EDIT
                    </button>
                  </div>
                  {getSelectedTrack() && (() => {
                    const SelectedIcon = getSelectedTrack()!.icon;
                    const selectedTrack = getSelectedTrack()!;
                    return (
                      <div className="p-5 rounded-2xl bg-[#ea2a33]/5 border-2 border-[#ea2a33] flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#CC2630] to-[#ea2a33] flex items-center justify-center shadow-lg flex-shrink-0">
                          <SelectedIcon size={22} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm sm:text-base font-bold text-white mb-1">{selectedTrack.title}</p>
                          <p className="text-xs text-[#b89d9f]">Focus: {selectedTrack.focus}</p>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              <div className="px-6 sm:px-8 py-8 bg-[#0f0a0b] border-t border-white/[0.06]">
                <label className="flex gap-3 sm:gap-4 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 rounded-lg border-2 border-white/10 bg-transparent text-[#ea2a33] focus:ring-[#ea2a33] focus:ring-offset-0 flex-shrink-0 cursor-pointer transition-all"
                    required
                  />
                  <span className="text-xs sm:text-sm leading-relaxed text-[#b89d9f] group-hover:text-white transition-colors">
                    I certify that all information provided is accurate and true. I understand that misrepresentation may lead to immediate disqualification from the African Student Accelerator Program.
                  </span>
                </label>
              </div>
            </>
          )}

          <div className="px-6 sm:px-8 py-5 sm:py-6 bg-[#0f0a0b] flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-white/[0.06]">
            <div className="flex items-center gap-2 text-[#b89d9f] text-xs">
              <Lock size={14} />
              <span className="uppercase font-bold tracking-widest">Secured Application</span>
            </div>
            <div className="flex gap-3 sm:gap-4 w-full sm:w-auto">
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="flex-1 sm:flex-initial px-6 sm:px-8 py-3.5 rounded-xl border-2 border-white/10 text-sm font-bold text-white hover:bg-white/5 hover:border-white/20 transition-all flex items-center justify-center gap-2 group"
                >
                  <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back
                </button>
              )}
              {currentStep < 4 ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!canProceed()}
                  className="flex-1 sm:flex-initial px-8 sm:px-12 py-4 rounded-xl bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white text-sm font-black tracking-wide hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 group uppercase"
                >
                  Continue <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-initial px-10 sm:px-14 py-4 rounded-xl bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white text-sm sm:text-base font-black tracking-wide hover:opacity-90 active:scale-[0.98] transition-all uppercase disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={20} />
                      Submit Application
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}