import * as functions from 'firebase-functions';
import { sendEmail } from '../emails/sendEmail';
import { getWelcomeEmail } from '../emails/templates';

export const onUserCreate = functions.firestore
  .document('users/{userId}')
  .onCreate(async (snapshot, context) => {
    const userData = snapshot.data();
    const userId = context.params.userId;

    console.log('[onUserCreate] New user created:', userId);

    try {
      const emailData = getWelcomeEmail({
        name: userData.fullName || 'there',
        dashboardUrl: `${process.env.APP_URL || 'https://asnafrica.org'}/learn`,
      });

      await sendEmail({
        to: userData.email,
        subject: emailData.subject,
        html: emailData.html,
      });

      console.log('[onUserCreate] Welcome email sent to:', userData.email);
    } catch (error) {
      console.error('[onUserCreate] Error sending welcome email:', error);
    }
  });
