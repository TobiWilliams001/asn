// src/app/learn/enroll/success/page.tsx

import Link from 'next/link';

export default function EnrollmentSuccessPage() {
  return (
    <div className="min-h-screen bg-[#181111] text-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 py-10 text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-900/30 rounded-full mb-4">
            <span className="text-5xl text-green-400">&check;</span>
          </div>
          <h1 className="text-4xl font-black mb-3">Enrollment Successful!</h1>
          <p className="text-xl text-[#b89d9f]">
            Welcome to the African Student Accelerator Program
          </p>
        </div>

        {/* Success Message */}
        <div className="bg-[#261c1c] border border-[#382929] rounded-xl p-8 mb-8">
          <h2 className="text-xl font-bold mb-4">What Happens Next?</h2>
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#ea2a33] rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h3 className="font-bold mb-1">Check Your Email</h3>
                <p className="text-sm text-[#b89d9f]">
                  We've sent a confirmation email with program details and next steps.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#ea2a33] rounded-full flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h3 className="font-bold mb-1">Access Your Dashboard</h3>
                <p className="text-sm text-[#b89d9f]">
                  Your personalized learning dashboard is ready with all 5 modules.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#ea2a33] rounded-full flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <h3 className="font-bold mb-1">Start Learning</h3>
                <p className="text-sm text-[#b89d9f]">
                  Begin with Module 1: Career Mapping and work your way through the curriculum.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/learn/dashboard"
            className="px-8 py-4 bg-[#ea2a33] hover:bg-[#c41f27] text-white text-lg font-bold rounded-lg transition-colors"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/learn/asap/modules"
            className="px-8 py-4 bg-[#382929] hover:bg-[#4a3636] text-white text-lg font-bold rounded-lg transition-colors"
          >
            View Curriculum
          </Link>
        </div>

        {/* Support Info */}
        <div className="mt-10 pt-10 border-t border-[#382929]">
          <p className="text-sm text-[#b89d9f] mb-2">
            Need help getting started?
          </p>
          <a 
            href="mailto:info@asnafrica.org" 
            className="text-[#ea2a33] hover:underline font-bold"
          >
            Contact ASN Support
          </a>
        </div>
      </div>
    </div>
  );
}