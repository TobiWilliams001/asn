'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle, XCircle, Loader2, Mail, Phone, MapPin, GraduationCap, FileText, Target } from 'lucide-react';
import StatusBadge from '@/components/admin/StatusBadge';
import { getApplication, approveApplication, rejectApplication, Application } from '@/services/adminService';

export default function ApplicationReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');

  useEffect(() => {
    async function fetchApplication() {
      try {
        const app = await getApplication(id);
        setApplication(app);
        setAdminNotes(app?.adminNotes || '');
      } catch (error) {
        console.error('Error fetching application:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchApplication();
  }, [id]);

  const handleApprove = async () => {
    if (!application || !confirm('Are you sure you want to approve this application and enroll the student?')) return;

    setProcessing(true);
    try {
      await approveApplication(application.id, application.userId, adminNotes);
      alert('Application approved! Student has been enrolled.');
      router.push('/learn/admin/applications');
    } catch (error) {
      console.error('Error approving application:', error);
      alert('Failed to approve application. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!application || !confirm('Are you sure you want to reject this application?')) return;

    setProcessing(true);
    try {
      await rejectApplication(application.id, application.userId, adminNotes);
      alert('Application rejected.');
      router.push('/learn/admin/applications');
    } catch (error) {
      console.error('Error rejecting application:', error);
      alert('Failed to reject application. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 size={48} className="text-[#ea2a33] animate-spin mx-auto mb-4" />
          <p className="text-[#b89d9f]">Loading application...</p>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="p-8">
        <div className="text-center py-12">
          <FileText size={48} className="text-[#382929] mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Application not found</h2>
          <button
            onClick={() => router.push('/learn/admin/applications')}
            className="mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white font-bold hover:shadow-lg transition-all"
          >
            Back to Applications
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.push('/learn/admin/applications')}
          className="flex items-center gap-2 text-sm font-semibold text-[#b89d9f] hover:text-white transition-colors mb-4"
        >
          <ArrowLeft size={16} />
          Back to Applications
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-white mb-2">Application Review</h1>
            <p className="text-[#b89d9f]">ID: {application.id.slice(0, 12)}...</p>
          </div>
          <StatusBadge status={application.status} size="lg" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-[#261c1c] border border-[#382929] rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-[#382929] bg-gradient-to-r from-[#2d2222] to-[#261c1c]">
              <div className="flex items-center gap-3">
                <Mail size={24} className="text-[#ea2a33]" />
                <h2 className="text-xl font-bold text-white">Personal Information</h2>
              </div>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-1">Full Name</p>
                <p className="text-white font-semibold">{application.personalInfo.fullName}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-1">Email</p>
                <p className="text-white font-semibold">{application.personalInfo.email}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-1">Phone</p>
                <p className="text-white font-semibold">{application.personalInfo.phone}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-1">Location</p>
                <p className="text-white font-semibold">{application.personalInfo.city}, {application.personalInfo.country}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-2">Bio</p>
                <p className="text-white leading-relaxed text-sm">{application.personalInfo.bio}</p>
              </div>
            </div>
          </div>

          {/* Academic Background */}
          <div className="bg-[#261c1c] border border-[#382929] rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-[#382929] bg-gradient-to-r from-[#2d2222] to-[#261c1c]">
              <div className="flex items-center gap-3">
                <GraduationCap size={24} className="text-[#ea2a33]" />
                <h2 className="text-xl font-bold text-white">Academic Background</h2>
              </div>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-1">University</p>
                <p className="text-white font-semibold">{application.academicInfo.university}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-1">Degree Program</p>
                <p className="text-white font-semibold">{application.academicInfo.degreeProgram}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-1">GPA</p>
                <p className="text-white font-semibold">{application.academicInfo.gpa}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-1">Graduation Year</p>
                <p className="text-white font-semibold">{application.academicInfo.graduationYear}</p>
              </div>
            </div>
          </div>

          {/* Statement of Intent */}
          <div className="bg-[#261c1c] border border-[#382929] rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-[#382929] bg-gradient-to-r from-[#2d2222] to-[#261c1c]">
              <div className="flex items-center gap-3">
                <FileText size={24} className="text-[#ea2a33]" />
                <h2 className="text-xl font-bold text-white">Statement of Intent</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="p-6 rounded-xl bg-[#1a1314] border border-[#382929]">
                <p className="text-white leading-relaxed whitespace-pre-wrap">
                  {application.personalInfo.statementOfIntent}
                </p>
              </div>
            </div>
          </div>

          {/* Track Selection */}
          <div className="bg-[#261c1c] border border-[#382929] rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-[#382929] bg-gradient-to-r from-[#2d2222] to-[#261c1c]">
              <div className="flex items-center gap-3">
                <Target size={24} className="text-[#ea2a33]" />
                <h2 className="text-xl font-bold text-white">Track Selection</h2>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="p-4 rounded-xl bg-[#ea2a33]/10 border-2 border-[#ea2a33]">
                <p className="text-lg font-bold text-white capitalize">{application.track} Track</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-2">Justification</p>
                <div className="p-4 rounded-xl bg-[#1a1314] border border-[#382929]">
                  <p className="text-white leading-relaxed text-sm whitespace-pre-wrap">
                    {application.trackJustification}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Admin Notes */}
          <div className="bg-[#261c1c] border border-[#382929] rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Admin Notes</h3>
            <textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Add private notes about this application..."
              className="w-full h-32 p-4 rounded-xl bg-[#1a1314] border border-[#382929] text-white placeholder-[#b89d9f] focus:border-[#ea2a33] focus:ring-2 focus:ring-[#ea2a33]/20 focus:outline-none transition-all resize-none text-sm"
            />
          </div>

          {/* Decision Actions */}
          {application.status === 'pending' && (
            <div className="bg-gradient-to-br from-[#2d2222] to-[#261c1c] border border-[#382929] rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Decision</h3>
              <div className="space-y-3">
                <button
                  onClick={handleApprove}
                  disabled={processing}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={20} />
                      Approve & Enroll
                    </>
                  )}
                </button>
                <button
                  onClick={handleReject}
                  disabled={processing}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#1a1314] border-2 border-red-500/30 text-red-400 font-bold hover:bg-red-500/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <XCircle size={20} />
                      Reject Application
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Application Info */}
          <div className="bg-[#261c1c] border border-[#382929] rounded-2xl p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#b89d9f] mb-4">Application Info</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-[#b89d9f] mb-1">Submitted</p>
                <p className="text-white font-semibold">
                  {application.submittedAt?.toDate?.()?.toLocaleDateString?.('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  }) || 'Recently'}
                </p>
              </div>
              <div>
                <p className="text-[#b89d9f] mb-1">Application ID</p>
                <p className="text-white font-mono text-xs">{application.id}</p>
              </div>
              <div>
                <p className="text-[#b89d9f] mb-1">User ID</p>
                <p className="text-white font-mono text-xs">{application.userId}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
