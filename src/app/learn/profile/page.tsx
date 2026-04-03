'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Mail,
  MapPin,
  Edit2,
  Save,
  X,
  GraduationCap,
  Briefcase,
  Camera,
  CheckCircle,
  AlertCircle,
  User,
  Globe as GlobeIcon,
  Loader2,
  Phone,
  Linkedin,
  Award,
} from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuthContext } from '@/context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { learnDb, storage } from '@/firebase/learnConfig';
import { updateProfile } from 'firebase/auth';
import { getUserProgress, UserProgress } from '@/services/progressService';

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}

function ProfileContent() {
  const { user, userProfile } = useAuthContext(); 
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [progress, setProgress] = useState<UserProgress | null>(null);

  const [formData, setFormData] = useState({
    fullName: userProfile?.fullName || user?.displayName || '',
    bio: userProfile?.bio || '',
    country: userProfile?.country || '',
    institution: userProfile?.institution || '',
    currentStatus: userProfile?.currentStatus || '',
    phone: userProfile?.phone || '',
    linkedinUrl: userProfile?.linkedinUrl || '',
    location: userProfile?.location || '',
    profilePicture: userProfile?.profilePicture || '',
  });

  useEffect(() => {
    if (user?.uid && userProfile?.role === 'enrolled') {
      fetchProgress();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, userProfile]);

  async function fetchProgress() {
    try {
      const progressData = await getUserProgress(user!.uid);
      setProgress(progressData);
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  }

  const fullName = formData.fullName || userProfile?.fullName || user?.displayName || 'User';
  const nameParts = fullName.split(' ');
  const firstName = nameParts[0] || '';
  const initials = firstName.charAt(0).toUpperCase() + (nameParts[1]?.charAt(0).toUpperCase() || '');
  const email = userProfile?.email || user?.email || '';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.uid) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be less than 5MB');
      return;
    }

    setUploading(true);
    try {
      const storageRef = ref(storage, `profile-pictures/${user.uid}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      const userDocRef = doc(learnDb, 'users', user.uid);
      await setDoc(userDocRef, { profilePicture: downloadURL }, { merge: true });

      setFormData({ ...formData, profilePicture: downloadURL });
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Error uploading image:', error);
      setErrorMessage('Failed to upload image');
      setSaveStatus('error');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setIsSaving(true);
    setSaveStatus('idle');
    setErrorMessage('');

    try {
      const userDocRef = doc(learnDb, 'users', user.uid);

      await setDoc(userDocRef, {
        fullName: formData.fullName,
        bio: formData.bio,
        country: formData.country,
        institution: formData.institution || null,
        currentStatus: formData.currentStatus,
        phone: formData.phone,
        linkedinUrl: formData.linkedinUrl,
        location: formData.location,
        updatedAt: new Date(),
      }, { merge: true });

      if (formData.fullName !== user.displayName) {
        await updateProfile(user, { displayName: formData.fullName });
      }

      setSaveStatus('success');
      setTimeout(() => {
        setIsEditing(false);
        setSaveStatus('idle');
      }, 1500);

    } catch (error: any) {
      console.error('Profile save error:', error.code, error.message);

      let userMessage = 'Failed to save. Please try again.';
      if (error.code === 'permission-denied') {
        userMessage = 'Permission denied. Try logging out and back in.';
      } else if (error.code === 'unauthenticated') {
        userMessage = 'Session expired. Please log in again.';
      } else if (error.message) {
        userMessage = error.message;
      }

      setErrorMessage(userMessage);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: userProfile?.fullName || user?.displayName || '',
      bio: userProfile?.bio || '',
      country: userProfile?.country || '',
      institution: userProfile?.institution || '',
      currentStatus: userProfile?.currentStatus || '',
      phone: userProfile?.phone || '',
      linkedinUrl: userProfile?.linkedinUrl || '',
      location: userProfile?.location || '',
      profilePicture: userProfile?.profilePicture || '',
    });
    setIsEditing(false);
    setSaveStatus('idle');
    setErrorMessage('');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'student': return GraduationCap;
      case 'professional': return Briefcase;
      case 'entrepreneur': return GlobeIcon;
      case 'job_seeker': return User;
      default: return Briefcase;
    }
  };

  const StatusIcon = getStatusIcon(formData.currentStatus);

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0506] via-[#181111] to-[#0f0909] overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#ea2a33] rounded-full mix-blend-multiply filter blur-[140px] opacity-10 animate-blob"></div>
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-[#c41e3a] rounded-full mix-blend-multiply filter blur-[140px] opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Profile Settings</h1>
          <p className="text-gray-400">Manage your account information and preferences</p>
        </div>

        <div className="bg-[#1a1314]/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          <div className="relative h-32 sm:h-40 bg-gradient-to-r from-[#ea2a33]/20 via-[#c41e3a]/10 to-transparent" />

          <div className="relative px-6 sm:px-8 pb-8">
            {/* Avatar & Edit Button */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16 sm:-mt-20 mb-6 gap-4">
              <div className="relative inline-block">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-[#ea2a33] to-[#b91c1c] flex items-center justify-center text-white text-4xl font-bold shadow-2xl border-4 border-[#1a1314]">
                  {formData.profilePicture ? (
                    <Image src={formData.profilePicture} alt="Profile" className="w-full h-full rounded-3xl object-cover" width={128} height={128} />
                  ) : user?.photoURL ? (
                    <Image src={user.photoURL} alt="Profile" className="w-full h-full rounded-3xl object-cover" width={128} height={128} />
                  ) : (
                    initials
                  )}
                </div>
                <label
                  className="absolute bottom-1 right-1 w-10 h-10 bg-[#ea2a33] hover:bg-[#b91c1c] rounded-xl flex items-center justify-center text-white shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  title="Change photo"
                >
                  {uploading ? <Loader2 size={18} className="animate-spin" /> : <Camera size={18} />}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              </div>

              <div className="flex items-center gap-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleCancel}
                      disabled={isSaving}
                      className="flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl transition-all disabled:opacity-50 active:scale-95"
                    >
                      <X size={18} />
                      <span className="hidden sm:inline">Cancel</span>
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ea2a33] to-[#c41e3a] hover:shadow-lg hover:shadow-[#ea2a33]/20 text-white rounded-xl transition-all disabled:opacity-50 font-semibold active:scale-95"
                    >
                      {isSaving ? (
                        <><Loader2 size={18} className="animate-spin" /> Saving...</>
                      ) : (
                        <><Save size={18} /> Save Changes</>
                      )}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl transition-all font-semibold active:scale-95"
                  >
                    <Edit2 size={18} />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Save Status Banner */}
            {saveStatus !== 'idle' && (
              <div className="mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
                {saveStatus === 'success' && (
                  <div className="flex items-center gap-3 text-green-400 bg-green-500/10 border border-green-500/20 rounded-2xl px-5 py-3.5">
                    <CheckCircle size={20} />
                    <span className="font-medium">Profile updated successfully!</span>
                  </div>
                )}
                {saveStatus === 'error' && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-2xl px-5 py-3.5">
                    <div className="flex items-center gap-3 text-red-400 mb-1">
                      <AlertCircle size={20} />
                      <span className="font-medium">Failed to update profile</span>
                    </div>
                    {errorMessage && <p className="text-sm text-red-300 ml-8">{errorMessage}</p>}
                  </div>
                )}
              </div>
            )}

            {/* Name & Bio */}
            <div className="mb-8">
              {isEditing ? (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 ml-1">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full text-2xl font-bold text-white bg-[#0f0a0b]/50 border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#ea2a33] focus:border-transparent transition-all placeholder:text-gray-500"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 ml-1">Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full text-gray-300 bg-[#0f0a0b]/50 border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#ea2a33] focus:border-transparent transition-all resize-none placeholder:text-gray-500"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">{fullName}</h2>
                  {formData.bio
                    ? <p className="text-gray-400 text-lg leading-relaxed">{formData.bio}</p>
                    : <p className="text-gray-500 italic">No bio added yet</p>
                  }
                </>
              )}
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Email */}
              <div className="bg-[#0f0a0b]/50 border border-white/10 rounded-2xl p-6 hover:bg-[#0f0a0b]/70 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#ea2a33]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Mail size={22} className="text-[#ea2a33]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Email</div>
                    <div className="text-base text-white font-medium truncate">{email}</div>
                  </div>
                </div>
              </div>

              {/* Country */}
              <div className="bg-[#0f0a0b]/50 border border-white/10 rounded-2xl p-6 hover:bg-[#0f0a0b]/70 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#ea2a33]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <MapPin size={22} className="text-[#ea2a33]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Country</div>
                    {isEditing ? (
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full text-base text-white font-medium bg-white/5 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ea2a33] placeholder:text-gray-500"
                        placeholder="e.g., Nigeria"
                      />
                    ) : (
                      <div className="text-base text-white font-medium">
                        {formData.country || <span className="text-gray-500 italic">Not specified</span>}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="bg-[#0f0a0b]/50 border border-white/10 rounded-2xl p-6 hover:bg-[#0f0a0b]/70 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#ea2a33]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <StatusIcon size={22} className="text-[#ea2a33]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Status</div>
                    {isEditing ? (
                      <select
                        name="currentStatus"
                        value={formData.currentStatus}
                        onChange={handleInputChange}
                        className="w-full text-base text-white font-medium bg-[#0f0a0b] border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ea2a33] appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                          backgroundPosition: 'right 0.5rem center',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: '1.5em 1.5em',
                          paddingRight: '2.5rem'
                        }}
                      >
                        <option value="" className="bg-[#1a1314]">Select status</option>
                        <option value="student" className="bg-[#1a1314]">Student</option>
                        <option value="professional" className="bg-[#1a1314]">Professional</option>
                        <option value="entrepreneur" className="bg-[#1a1314]">Entrepreneur</option>
                        <option value="job_seeker" className="bg-[#1a1314]">Job Seeker</option>
                      </select>
                    ) : (
                      <div className="text-base text-white font-medium capitalize">
                        {formData.currentStatus
                          ? formData.currentStatus.replace('_', ' ')
                          : <span className="text-gray-500 italic">Not specified</span>
                        }
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Institution */}
              <div className="bg-[#0f0a0b]/50 border border-white/10 rounded-2xl p-6 hover:bg-[#0f0a0b]/70 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#ea2a33]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <GraduationCap size={22} className="text-[#ea2a33]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      {formData.currentStatus === 'student' ? 'Institution' : 'Organization'}
                    </div>
                    {isEditing ? (
                      <input
                        type="text"
                        name="institution"
                        value={formData.institution}
                        onChange={handleInputChange}
                        className="w-full text-base text-white font-medium bg-white/5 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ea2a33] placeholder:text-gray-500"
                        placeholder="e.g., University of Lagos"
                      />
                    ) : (
                      <div className="text-base text-white font-medium">
                        {formData.institution || <span className="text-gray-500 italic">Not specified</span>}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Phone - NEW */}
              <div className="bg-[#0f0a0b]/50 border border-white/10 rounded-2xl p-6 hover:bg-[#0f0a0b]/70 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#ea2a33]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Phone size={22} className="text-[#ea2a33]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Phone</div>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full text-base text-white font-medium bg-white/5 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ea2a33] placeholder:text-gray-500"
                        placeholder="+234 XXX XXX XXXX"
                      />
                    ) : (
                      <div className="text-base text-white font-medium">
                        {formData.phone || <span className="text-gray-500 italic">Not specified</span>}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* LinkedIn - NEW */}
              <div className="bg-[#0f0a0b]/50 border border-white/10 rounded-2xl p-6 hover:bg-[#0f0a0b]/70 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#ea2a33]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Linkedin size={22} className="text-[#ea2a33]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">LinkedIn</div>
                    {isEditing ? (
                      <input
                        type="url"
                        name="linkedinUrl"
                        value={formData.linkedinUrl}
                        onChange={handleInputChange}
                        className="w-full text-base text-white font-medium bg-white/5 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ea2a33] placeholder:text-gray-500"
                        placeholder="https://linkedin.com/in/username"
                      />
                    ) : (
                      <div className="text-base text-white font-medium truncate">
                        {formData.linkedinUrl ? (
                          <a href={formData.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                            {formData.linkedinUrl.replace('https://linkedin.com/in/', '').replace('https://www.linkedin.com/in/', '')}
                          </a>
                        ) : (
                          <span className="text-gray-500 italic">Not specified</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress & Achievements - NEW (for enrolled students) */}
            {userProfile?.role === 'enrolled' && progress && (
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <Award size={24} className="text-[#ea2a33]" />
                  <h3 className="text-xl font-bold text-white">Progress & Achievements</h3>
                </div>

                {/* Progress Bar */}
                <div className="mb-6 bg-[#0f0a0b]/50 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-gray-300">Overall Progress</span>
                    <span className="text-lg font-black text-white">{progress.overallProgress || 0}%</span>
                  </div>
                  <div className="w-full h-3 bg-[#1a1314] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#ea2a33] to-[#c41e3a] rounded-full transition-all duration-500"
                      style={{ width: `${progress.overallProgress || 0}%` }}
                    />
                  </div>
                </div>

                {/* Achievement Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-[#0f0a0b]/50 border border-white/10 rounded-2xl p-5 text-center hover:bg-[#0f0a0b]/70 transition-all">
                    <p className="text-3xl font-black text-emerald-400 mb-1">
                      {progress.completedLessons?.length || 0}
                    </p>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Lessons Completed</p>
                  </div>
                  <div className="bg-[#0f0a0b]/50 border border-white/10 rounded-2xl p-5 text-center hover:bg-[#0f0a0b]/70 transition-all">
                    <p className="text-3xl font-black text-blue-400 mb-1">
                      {Object.values(progress.modules || {}).filter((m) => m.status === 'completed').length}
                    </p>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Modules Finished</p>
                  </div>
                  <div className="bg-[#0f0a0b]/50 border border-white/10 rounded-2xl p-5 text-center hover:bg-[#0f0a0b]/70 transition-all">
                    <p className="text-3xl font-black text-amber-400 mb-1">
                      {progress.overallProgress || 0}%
                    </p>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Overall Progress</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}