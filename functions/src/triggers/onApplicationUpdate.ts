import * as functions from 'firebase-functions';
import { sendEmail } from '../emails/sendEmail';
import { getApplicationAcceptedEmail, getApplicationRejectedEmail } from '../emails/templates';

export const onApplicationUpdate = functions.firestore
  .document('applications/{applicationId}')
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();
    const applicationId = context.params.applicationId;

    // Only send email if status changed from pending
    if (before.status === 'pending' && after.status !== 'pending') {
      console.log('[onApplicationUpdate] Status changed:', before.status, '->', after.status);

      try {
        if (after.status === 'accepted') {
          const emailData = getApplicationAcceptedEmail({
            name: after.personalInfo.fullName,
            track: after.track,
            modulesUrl: `${process.env.APP_URL || 'https://asnafrica.org'}/learn/asap/modules`,
          });

          await sendEmail({
            to: after.personalInfo.email,
            subject: emailData.subject,
            html: emailData.html,
          });

          console.log('[onApplicationUpdate] Acceptance email sent to:', after.personalInfo.email);
        } 
        
        else if (after.status === 'rejected') {
          const emailData = getApplicationRejectedEmail({
            name: after.personalInfo.fullName,
            resourcesUrl: `${process.env.APP_URL || 'https://asnafrica.org'}/learn/resources`,
          });

          await sendEmail({
            to: after.personalInfo.email,
            subject: emailData.subject,
            html: emailData.html,
          });

          console.log('[onApplicationUpdate] Rejection email sent to:', after.personalInfo.email);
        }
      } catch (error) {
        console.error('[onApplicationUpdate] Error sending status email:', error);
      }
    }
  });
