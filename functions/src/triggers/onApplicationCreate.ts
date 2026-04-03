import * as functions from 'firebase-functions';
import { sendEmail } from '../emails/sendEmail';
import { getApplicationReceivedEmail } from '../emails/templates';

export const onApplicationCreate = functions.firestore
  .document('applications/{applicationId}')
  .onCreate(async (snapshot, context) => {
    const appData = snapshot.data();
    const applicationId = context.params.applicationId;

    console.log('[onApplicationCreate] New application submitted:', applicationId);

    try {
      const submittedDate = appData.submittedAt?.toDate?.()?.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }) || 'Recently';

      const emailData = getApplicationReceivedEmail({
        name: appData.personalInfo.fullName,
        track: appData.track,
        submittedDate,
        applicationId,
        statusUrl: `${process.env.APP_URL || 'https://asnafrica.org'}/learn/asap/application-status`,
      });

      await sendEmail({
        to: appData.personalInfo.email,
        subject: emailData.subject,
        html: emailData.html,
      });

      console.log('[onApplicationCreate] Confirmation email sent to:', appData.personalInfo.email);
    } catch (error) {
      console.error('[onApplicationCreate] Error sending confirmation email:', error);
    }
  });
