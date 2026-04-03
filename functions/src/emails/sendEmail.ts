import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({ to, subject, html, from }: SendEmailParams) {
  try {
    const result = await resend.emails.send({
      from: from || 'ASN ASAP <programs@asnafrica.org>',
      to,
      subject,
      html,
    });

    console.log('[sendEmail] Email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('[sendEmail] Error sending email:', error);
    throw error;
  }
}
