'use client';

import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface EmailTemplatesProps {
  applicantName: string;
  applicantEmail: string;
  track: string;
  type: 'acceptance' | 'rejection';
}

export default function EmailTemplates({ applicantName, applicantEmail, track, type }: EmailTemplatesProps) {
  const [copied, setCopied] = useState<'subject' | 'body' | null>(null);

  const firstName = applicantName.split(' ')[0];

  const acceptanceTemplate = {
    subject: `Welcome to ASAP - You're In!`,
    body: `Dear ${firstName},

Congratulations! We're thrilled to inform you that you've been accepted into the African Student Accelerator Program (ASAP)!

Your application stood out among many strong candidates, and we're excited to have you join the ${track} track.

NEXT STEPS:
1. Log in to your account at https://asnafrica.org/learn
2. Access your modules and begin with Module 1: Career Mapping & Personal Branding
3. Join our community channels (links will be sent separately)
4. Complete all modules to earn your ASAP certificate

PROGRAM HIGHLIGHTS:
- 5 comprehensive modules covering essential career skills
- Access to job opportunities from top African companies
- Networking with fellow ASAP participants
- Toolkits, resources, and mentorship opportunities

We can't wait to see you thrive in the program!

If you have any questions, feel free to reply to this email or reach out to programs@asnafrica.org.

Best regards,
The ASN ASAP Team

---
African Student Network
Connecting Africa's Future Leaders`
  };

  const rejectionTemplate = {
    subject: `ASAP Application Update`,
    body: `Dear ${firstName},

Thank you for taking the time to apply to the African Student Accelerator Program (ASAP) ${track} track.

After careful consideration of all applications, we regret to inform you that we're unable to offer you a spot in this cohort. This was a highly competitive selection process, and we received many strong applications.

We encourage you to:
• Continue developing your skills and gaining experience
• Stay connected with ASN for future opportunities
• Explore our resource hub for career development materials
• Consider reapplying for the next ASAP cohort

Your interest in ASN means a lot to us, and we hope to support your career journey in other ways.

For resources and upcoming opportunities, visit: https://asnafrica.org/learn/resources

Thank you again for your application.

Best regards,
The ASN ASAP Team

---
African Student Network
Connecting Africa's Future Leaders`
  };

  const template = type === 'acceptance' ? acceptanceTemplate : rejectionTemplate;

  const copyToClipboard = async (text: string, field: 'subject' | 'body') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(field);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm">
        <p className="font-semibold mb-1">Email Template Ready</p>
        <p>Copy and send this email to {applicantEmail}</p>
      </div>

      {/* Subject Line */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#b89d9f]">Subject Line</label>
          <button
            onClick={() => copyToClipboard(template.subject, 'subject')}
            className="flex items-center gap-1 text-xs font-bold text-[#ea2a33] hover:underline"
          >
            {copied === 'subject' ? (
              <>
                <Check size={12} />
                Copied!
              </>
            ) : (
              <>
                <Copy size={12} />
                Copy
              </>
            )}
          </button>
        </div>
        <div className="p-4 rounded-xl bg-[#1a1314] border border-[#382929]">
          <p className="text-white text-sm font-mono">{template.subject}</p>
        </div>
      </div>

      {/* Email Body */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#b89d9f]">Email Body</label>
          <button
            onClick={() => copyToClipboard(template.body, 'body')}
            className="flex items-center gap-1 text-xs font-bold text-[#ea2a33] hover:underline"
          >
            {copied === 'body' ? (
              <>
                <Check size={12} />
                Copied!
              </>
            ) : (
              <>
                <Copy size={12} />
                Copy
              </>
            )}
          </button>
        </div>
        <div className="p-4 rounded-xl bg-[#1a1314] border border-[#382929] max-h-96 overflow-y-auto">
          <pre className="text-white text-sm whitespace-pre-wrap font-sans">{template.body}</pre>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs">
        <p className="font-semibold mb-1">Quick Tip</p>
        <p>Open your email client, paste the subject and body, then send to {applicantEmail}</p>
      </div>
    </div>
  );
}
