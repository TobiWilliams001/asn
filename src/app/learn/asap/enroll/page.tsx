'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, MapPin, GraduationCap, FileText, Briefcase, Rocket, Building2, ChevronRight, ChevronLeft, CheckCircle, Loader2, Edit2, Lock } from 'lucide-react';
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

const COUNTRIES = [
  'Nigeria', 'Kenya', 'Ghana', 'South Africa', 'Egypt',
  'Ethiopia', 'Uganda', 'Tanzania', 'Rwanda', 'Senegal',
  'Côte d\'Ivoire', 'Morocco', 'Tunisia', 'Zambia', 'Zimbabwe',
  'Botswana', 'Namibia', 'Cameroon', 'Other'
];

const TRACKS = [
  {
    id: 'technology',
    icon: Briefcase,
    title: 'Technology & Digital Innovation',
    description: 'Focus on software engineering, data science, and AI-driven solutions for African markets.',
    focus: 'Scale & Architecture'
  },
  {
    id: 'entrepreneurship',
    icon: Rocket,
    title: 'Entrepreneurship & Venture',
    description: 'Designed for founders building sustainable businesses and social enterprises from the ground up.',
    focus: 'Operations & Funding'
  },
  {
    id: 'policy',
    icon: Building2,
    title: 'Public Policy & Governance',
    description: 'For future leaders in civil service, non-profits, and systemic reform within the African context.',
    focus: 'Ethics & Policy Design'
  }
];

function EnrollContent() {
  const router = useRouter();
  const { user, userProfile } = useAuthContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    fullName: userProfile?.fullName || user?.displayName || '',
    email: userProfile?.email || user?.email || '',
    phone: '',
    country: userProfile?.country || '',
    city: '',
    bio: userProfile?.bio || '',
    statementOfIntent: '',

    // Step 2: Academic
    university: userProfile?.institution || '',
    degreeProgram: '',
    gpa: '',
    graduationYear: '',

    // Step 3: Track
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
      // Create application document
      const applicationRef = await addDoc(collection(learnDb, 'applications'), {
        userId: user.uid,
        status: 'pending',
        submittedAt: serverTimestamp(),
        
        personalInfo: {
          fullName: formData.fullName,
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

      // Update user profile
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
      return formData.fullName && formData.email && formData.phone && 
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
    return true; // Step 4 (review) always allows proceed
  };

  const wordCount = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

  const getSelectedTrack = () => TRACKS.find(t => t.id === formData.track);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0506] via-[#181111] to-[#0f0909] pb-16">
      <div className="max-w-4xl mx-auto px-6 pt-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3 uppercase italic tracking-tight">
            {currentStep === 1 && 'Step 1: Personal Details'}
            {currentStep === 2 && 'Step 2: Academic Background'}
            {currentStep === 3 && 'Step 3: Industry Track Selection'}
            {currentStep === 4 && 'Step 4: Review & Submit'}
          </h1>
          <p className="text-[#b89d9f] text-base max-w-2xl">
            {currentStep === 1 && 'Begin your journey with the African Student Accelerator Program. We require detailed information to verify eligibility.'}
            {currentStep === 2 && 'Provide detailed academic history. The ASAP program is highly selective; academic rigor is a core evaluation criterion.'}
            {currentStep === 3 && 'Your choice determines your mentors, curriculum modules, and final impact project parameters.'}
            {currentStep === 4 && 'Please review your information carefully. Your responses are final once submitted.'}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-[#261c1c] p-6 rounded-2xl border border-[#382929] mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#b89d9f]">Enrollment Progress</span>
            <span className="text-sm font-bold text-white">Step {currentStep} of 4</span>
          </div>
          <div className="h-2 w-full bg-[#1a0505] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#CC2630] to-[#ea2a33] transition-all duration-500" 
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-3 px-1">
            <span className={`text-[10px] ${currentStep === 1 ? 'text-white font-bold' : 'text-[#b89d9f] opacity-40'}`}>Personal</span>
            <span className={`text-[10px] ${currentStep === 2 ? 'text-white font-bold' : 'text-[#b89d9f] opacity-40'}`}>Academic</span>
            <span className={`text-[10px] ${currentStep === 3 ? 'text-white font-bold' : 'text-[#b89d9f] opacity-40'}`}>Track</span>
            <span className={`text-[10px] ${currentStep === 4 ? 'text-white font-bold' : 'text-[#b89d9f] opacity-40'}`}>Review</span>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-[#261c1c] rounded-2xl border border-[#382929] overflow-hidden">
          {/* Step 1: Personal Info */}
          {currentStep === 1 && (
            <>
              <div className="p-8 border-b border-[#382929] bg-gradient-to-r from-[#2d2222] to-[#261c1c]">
                <div className="flex items-center gap-3 mb-2">
                  <User size={24} className="text-[#ea2a33]" />
                  <h3 className="text-xl font-bold text-white">Identity & Identification</h3>
                </div>
                <p className="text-sm text-[#b89d9f]">Ensure your details match your official legal documentation.</p>
              </div>
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#EEB7BA] mb-2 block">Full Legal Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full rounded-xl px-4 py-3.5 text-sm bg-[#1a1314] border border-[#382929] text-white placeholder-[#b89d9f]/50 focus:border-[#ea2a33] focus:ring-2 focus:ring-[#ea2a33]/20 focus:outline-none transition-all"
                      placeholder="As it appears on ID"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#EEB7BA] mb-2 block">Primary Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-xl px-4 py-3.5 text-sm bg-[#1a1314] border border-[#382929] text-white placeholder-[#b89d9f]/50 focus:border-[#ea2a33] focus:ring-2 focus:ring-[#ea2a33]/20 focus:outline-none transition-all"
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#EEB7BA] mb-2 block">Contact Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-xl px-4 py-3.5 text-sm bg-[#1a1314] border border-[#382929] text-white placeholder-[#b89d9f]/50 focus:border-[#ea2a33] focus:ring-2 focus:ring-[#ea2a33]/20 focus:outline-none transition-all"
                      placeholder="+234 ..."
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#EEB7BA] mb-2 block">Country of Residence</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full rounded-xl px-4 py-3.5 text-sm bg-[#1a1314] border border-[#382929] text-white focus:border-[#ea2a33] focus:ring-2 focus:ring-[#ea2a33]/20 focus:outline-none transition-all appearance-none cursor-pointer"
                      required
                    >
                      <option value="">Select Country</option>
                      {COUNTRIES.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#EEB7BA] mb-2 block">City / Region</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full rounded-xl px-4 py-3.5 text-sm bg-[#1a1314] border border-[#382929] text-white placeholder-[#b89d9f]/50 focus:border-[#ea2a33] focus:ring-2 focus:ring-[#ea2a33]/20 focus:outline-none transition-all"
                      placeholder="e.g. Lagos, Nairobi, Johannesburg"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-[#382929]">
                  <div className="flex items-center justify-between">
                    <label className="text-lg font-bold text-white">Statement of Intent</label>
                    <div className="flex items-center gap-2 text-xs text-[#b89d9f]">
                      <FileText size={14} className="text-[#ea2a33]" />
                      Word count: <span className="font-bold text-white">{wordCount(formData.statementOfIntent)}</span> / 500
                    </div>
                  </div>
                  <p className="text-sm text-[#b89d9f] italic">How will the ASAP program help you drive social or economic impact in your community?</p>
                  <textarea
                    name="statementOfIntent"
                    value={formData.statementOfIntent}
                    onChange={handleChange}
                    className="w-full rounded-xl p-6 text-base leading-relaxed bg-[#1a1314] border border-[#382929] text-white placeholder-[#b89d9f]/50 focus:border-[#ea2a33] focus:ring-2 focus:ring-[#ea2a33]/20 focus:outline-none transition-all resize-y min-h-[250px]"
                    placeholder="Clearly articulate your vision and the specific social or economic levers you intend to move..."
                    rows={8}
                    required
                  />
                  <p className="text-[10px] uppercase tracking-wide text-[#b89d9f]/60 text-right">Minimum 250 words recommended</p>
                </div>

                <div className="space-y-2 pt-6 border-t border-[#382929]">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#EEB7BA] mb-2 block">Brief Professional Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full rounded-xl px-4 py-3.5 text-sm bg-[#1a1314] border border-[#382929] text-white placeholder-[#b89d9f]/50 focus:border-[#ea2a33] focus:ring-2 focus:ring-[#ea2a33]/20 focus:outline-none transition-all resize-none"
                    placeholder="A 2-3 sentence summary of your background and achievements."
                    rows={3}
                    required
                  />
                </div>
              </div>
            </>
          )}

          {/* Step 2: Academic Background */}
          {currentStep === 2 && (
            <>
              <div className="p-8 border-b border-[#382929] bg-gradient-to-r from-[#2d2222] to-[#261c1c]">
                <div className="flex items-center gap-3 mb-2">
                  <GraduationCap size={24} className="text-[#ea2a33]" />
                  <h3 className="text-xl font-bold text-white">Educational History</h3>
                </div>
                <p className="text-sm text-[#b89d9f]">Enter details of your most recent or ongoing higher education institution.</p>
              </div>
              <div className="p-8 space-y-6">
                <div>
                  <label className="block text-sm font-bold text-[#EEB7BA] mb-2">University / Higher Institution Name</label>
                  <input
                    type="text"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    className="w-full rounded-xl px-4 py-3.5 text-sm bg-[#1a1314] border border-[#382929] text-white placeholder-[#b89d9f]/50 focus:border-[#ea2a33] focus:ring-2 focus:ring-[#ea2a33]/20 focus:outline-none transition-all"
                    placeholder="e.g. University of Cape Town"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#EEB7BA] mb-2">Degree Program & Major</label>
                  <input
                    type="text"
                    name="degreeProgram"
                    value={formData.degreeProgram}
                    onChange={handleChange}
                    className="w-full rounded-xl px-4 py-3.5 text-sm bg-[#1a1314] border border-[#382929] text-white placeholder-[#b89d9f]/50 focus:border-[#ea2a33] focus:ring-2 focus:ring-[#ea2a33]/20 focus:outline-none transition-all"
                    placeholder="e.g. B.Sc. Computer Science"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-[#EEB7BA] mb-2">Year of Graduation (Expected)</label>
                    <input
                      type="number"
                      name="graduationYear"
                      value={formData.graduationYear}
                      onChange={handleChange}
                      className="w-full rounded-xl px-4 py-3.5 text-sm bg-[#1a1314] border border-[#382929] text-white placeholder-[#b89d9f]/50 focus:border-[#ea2a33] focus:ring-2 focus:ring-[#ea2a33]/20 focus:outline-none transition-all"
                      placeholder="YYYY"
                      min="2000"
                      max="2030"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#EEB7BA] mb-2">Current GPA / Final Grade</label>
                    <input
                      type="text"
                      name="gpa"
                      value={formData.gpa}
                      onChange={handleChange}
                      className="w-full rounded-xl px-4 py-3.5 text-sm bg-[#1a1314] border border-[#382929] text-white placeholder-[#b89d9f]/50 focus:border-[#ea2a33] focus:ring-2 focus:ring-[#ea2a33]/20 focus:outline-none transition-all"
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
              <div className="p-8 border-b border-[#382929] bg-gradient-to-r from-[#2d2222] to-[#261c1c]">
                <div className="flex items-center gap-3 mb-2">
                  <Rocket size={24} className="text-[#ea2a33]" />
                  <h3 className="text-xl font-bold text-white">Choose Your Core Track</h3>
                </div>
                <p className="text-sm text-[#b89d9f]">Select the industry track where you intend to drive your social or economic impact.</p>
              </div>
              <div className="p-8 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {TRACKS.map((track) => {
                    const Icon = track.icon;
                    const isSelected = formData.track === track.id;
                    
                    return (
                      <label key={track.id} className="cursor-pointer">
                        <input
                          type="radio"
                          name="track"
                          value={track.id}
                          checked={isSelected}
                          onChange={handleChange}
                          className="hidden"
                        />
                        <div className={`p-6 rounded-2xl flex flex-col h-full border-2 transition-all duration-300 ${
                          isSelected
                            ? 'border-[#ea2a33] bg-[#ea2a33]/10 shadow-lg shadow-[#ea2a33]/20 scale-[1.02]'
                            : 'border-[#382929] bg-[#1a1314] hover:border-[#533c3d] hover:bg-[#1f1818]'
                        }`}>
                          <Icon size={32} className={`mb-4 ${isSelected ? 'text-[#ea2a33]' : 'text-[#b89d9f]'}`} />
                          <h4 className="text-lg font-bold mb-2 text-white">{track.title}</h4>
                          <p className="text-xs text-[#b89d9f] leading-relaxed mb-6 flex-1">{track.description}</p>
                          <div className="pt-4 border-t border-[#382929]">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#b89d9f]/60">
                              Focus: {track.focus}
                            </span>
                          </div>
                          {isSelected && (
                            <div className="mt-4 flex justify-end">
                              <CheckCircle size={24} className="text-[#ea2a33]" />
                            </div>
                          )}
                        </div>
                      </label>
                    );
                  })}
                </div>

                <div className="space-y-4 pt-6 border-t border-[#382929]">
                  <label className="block">
                    <span className="text-lg font-bold text-white block mb-2">
                      Why are you choosing this specific track?
                    </span>
                    <p className="text-xs text-[#b89d9f] mb-4 italic">
                      Detail your previous experience and how this track aligns with your long-term vision.
                    </p>
                    <textarea
                      name="trackJustification"
                      value={formData.trackJustification}
                      onChange={handleChange}
                      className="w-full rounded-xl p-6 text-base leading-relaxed bg-[#1a1314] border border-[#382929] text-white placeholder-[#b89d9f]/50 focus:border-[#ea2a33] focus:ring-2 focus:ring-[#ea2a33]/20 focus:outline-none transition-all resize-y min-h-[200px]"
                      placeholder="Briefly justify your selection..."
                      rows={6}
                      required
                    />
                  </label>
                  <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2 text-sm text-[#b89d9f]">
                      <FileText size={16} className="text-[#ea2a33]" />
                      Word count: <span className="font-bold text-white">{wordCount(formData.trackJustification)}</span> / 300
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 4 && (
            <>
              <div className="p-8 border-b border-[#382929] bg-gradient-to-r from-[#2d2222] to-[#261c1c]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle size={24} className="text-[#ea2a33]" />
                    <h3 className="text-xl font-bold text-white">Application Summary</h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#b89d9f]">
                    <Lock size={14} />
                    <span>Encrypted & Private</span>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-[#382929]">
                {/* Personal Info Review */}
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-[#ea2a33]">01. Personal Information</h4>
                    <button 
                      onClick={() => setCurrentStep(1)}
                      className="flex items-center gap-1 text-xs font-semibold text-[#b89d9f] hover:text-white transition-all"
                    >
                      <Edit2 size={14} /> EDIT
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                    <div>
                      <p className="text-xs text-[#b89d9f] mb-1 uppercase font-semibold">Full Name</p>
                      <p className="text-sm font-medium text-white">{formData.fullName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#b89d9f] mb-1 uppercase font-semibold">Email</p>
                      <p className="text-sm font-medium text-white">{formData.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#b89d9f] mb-1 uppercase font-semibold">Country</p>
                      <p className="text-sm font-medium text-white">{formData.country}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#b89d9f] mb-1 uppercase font-semibold">Phone</p>
                      <p className="text-sm font-medium text-white">{formData.phone}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-xs text-[#b89d9f] mb-2 uppercase font-semibold">Statement of Intent ({wordCount(formData.statementOfIntent)} words)</p>
                      <div className="p-4 rounded-xl bg-[#1a1314] border border-[#382929]">
                        <p className="text-sm leading-relaxed text-white line-clamp-3">{formData.statementOfIntent}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Academic Review */}
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-[#ea2a33]">02. Academic Background</h4>
                    <button 
                      onClick={() => setCurrentStep(2)}
                      className="flex items-center gap-1 text-xs font-semibold text-[#b89d9f] hover:text-white transition-all"
                    >
                      <Edit2 size={14} /> EDIT
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                    <div>
                      <p className="text-xs text-[#b89d9f] mb-1 uppercase font-semibold">Institution</p>
                      <p className="text-sm font-medium text-white">{formData.university}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#b89d9f] mb-1 uppercase font-semibold">Degree Program</p>
                      <p className="text-sm font-medium text-white">{formData.degreeProgram}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#b89d9f] mb-1 uppercase font-semibold">GPA / Grade</p>
                      <p className="text-sm font-medium text-white">{formData.gpa}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#b89d9f] mb-1 uppercase font-semibold">Expected Graduation</p>
                      <p className="text-sm font-medium text-white">{formData.graduationYear}</p>
                    </div>
                  </div>
                </div>

                {/* Track Review */}
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-[#ea2a33]">03. Program Track</h4>
                    <button 
                      onClick={() => setCurrentStep(3)}
                      className="flex items-center gap-1 text-xs font-semibold text-[#b89d9f] hover:text-white transition-all"
                    >
                      <Edit2 size={14} /> EDIT
                    </button>
                  </div>
                  {getSelectedTrack() && (
                    <div className="p-5 rounded-2xl bg-[#ea2a33]/10 border-2 border-[#ea2a33] flex items-center gap-4">
                      {React.createElement(getSelectedTrack()!.icon, { size: 28, className: "text-[#ea2a33]" })}
                      <div className="flex-1">
                        <p className="text-base font-bold text-white">{getSelectedTrack()!.title}</p>
                        <p className="text-xs text-[#b89d9f] mt-1">Focus: {getSelectedTrack()!.focus}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Terms & Submit */}
              <div className="px-8 py-8 bg-[#0f0a0b] border-t border-[#382929]">
                <label className="flex gap-4 cursor-pointer group mb-8">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-4 h-4 rounded border-[#382929] bg-transparent text-[#ea2a33] focus:ring-[#ea2a33] focus:ring-offset-0"
                    required
                  />
                  <span className="text-xs leading-relaxed text-[#b89d9f] group-hover:text-white transition-colors">
                    I hereby certify that all information provided in this application is accurate and true to the best of my knowledge. I understand that any misrepresentation may lead to immediate disqualification from the African Student Accelerator Program.
                  </span>
                </label>
              </div>
            </>
          )}

          {/* Footer Navigation */}
          <div className="px-8 py-6 bg-[#0f0a0b] flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-[#382929]">
            <div className="flex items-center gap-2 text-[#b89d9f]">
              <Lock size={14} />
              <span className="text-[10px] uppercase font-bold tracking-widest">End-to-End Encrypted</span>
            </div>
            <div className="flex gap-4 w-full sm:w-auto">
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="flex-1 sm:flex-none px-8 py-3 rounded-xl border-2 border-[#382929] text-sm font-bold text-white hover:bg-[#1f1818] hover:border-[#533c3d] transition-all flex items-center justify-center gap-2"
                >
                  <ChevronLeft size={18} /> Back
                </button>
              )}
              {currentStep < 4 ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!canProceed()}
                  className="flex-1 sm:flex-none px-10 py-3.5 rounded-xl bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white text-sm font-bold tracking-wide hover:shadow-lg hover:shadow-[#ea2a33]/30 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Save & Continue <ChevronRight size={18} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-none px-12 py-4 rounded-xl bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white text-base font-black tracking-wide hover:shadow-2xl hover:shadow-[#ea2a33]/40 active:scale-[0.98] transition-all shadow-xl shadow-[#ea2a33]/20 uppercase disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-20 mt-8 grayscale">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-white" />
            <span className="text-xs font-bold uppercase tracking-wider text-white">Verified Identity</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-white" />
            <span className="text-xs font-bold uppercase tracking-wider text-white">Pan-African Network</span>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap size={16} className="text-white" />
            <span className="text-xs font-bold uppercase tracking-wider text-white">Elite Selection</span>
          </div>
        </div>
      </div>
    </div>
  );
}