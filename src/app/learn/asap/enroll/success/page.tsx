import Link from 'next/link';

export default function EnrollmentSuccessPage() {
  return (
    <div className="min-h-screen bg-[#181111] text-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-green-900/30 rounded-full mb-4">
            <svg
              className="w-10 h-10 sm:w-12 sm:h-12 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-3" data-testid="text-enrollment-success">
            Enrollment Successful!
          </h1>
          <p className="text-lg sm:text-xl text-[#b89d9f]">
            Welcome to the African Student Accelerator Program
          </p>
        </div>

        {/* What Happens Next */}
        <div className="bg-[#261c1c] border border-[#382929] rounded-xl p-6 sm:p-8 mb-8 text-left">
          <h2 className="text-xl font-bold mb-6 text-center">What Happens Next?</h2>
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#ea2a33] rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h3 className="font-bold mb-1">Check Your Email</h3>
                <p className="text-sm text-[#b89d9f]">
                  We&apos;ve sent a confirmation email with program details and next steps.
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

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#ea2a33] rounded-full flex items-center justify-center font-bold text-sm">
                4
              </div>
              <div>
                <h3 className="font-bold mb-1">Join the Community</h3>
                <p className="text-sm text-[#b89d9f]">
                  Connect with fellow students on our WhatsApp community and start networking.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/learn/dashboard"
            className="px-8 py-3 sm:py-4 bg-[#ea2a33] hover:bg-[#c41f27] text-white text-base sm:text-lg font-bold rounded-lg transition-colors text-center"
            data-testid="link-goto-dashboard"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/learn/modules/1"
            className="px-8 py-3 sm:py-4 bg-[#382929] hover:bg-[#4a3636] text-white text-base sm:text-lg font-bold rounded-lg transition-colors text-center"
            data-testid="link-start-module-1"
          >
            Start Module 1
          </Link>
        </div>

        {/* Support Info */}
        <div className="mt-10 pt-8 border-t border-[#382929]">
          <p className="text-sm text-[#b89d9f] mb-2">Need help getting started?</p>
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