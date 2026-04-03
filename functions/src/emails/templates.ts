interface WelcomeEmailData {
  name: string;
  dashboardUrl: string;
}

interface ApplicationReceivedData {
  name: string;
  track: string;
  submittedDate: string;
  applicationId: string;
  statusUrl: string;
}

interface ApplicationAcceptedData {
  name: string;
  track: string;
  modulesUrl: string;
}

interface ApplicationRejectedData {
  name: string;
  resourcesUrl: string;
}

export function getWelcomeEmail(data: WelcomeEmailData) {
  return {
    subject: 'Welcome to ASN Learning Platform!',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to ASN</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0506;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0506; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #181111; border-radius: 16px; overflow: hidden; border: 1px solid #382929;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #CC2630 0%, #ea2a33 100%); padding: 40px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 900;">Welcome to ASN!</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #ffffff; font-size: 16px; line-height: 1.6;">
                Hi <strong>${data.name}</strong>,
              </p>
              
              <p style="margin: 0 0 20px; color: #b89d9f; font-size: 16px; line-height: 1.6;">
                Welcome to the African Student Network Learning Platform! Your account has been created successfully.
              </p>
              
              <p style="margin: 0 0 20px; color: #b89d9f; font-size: 16px; line-height: 1.6;">
                Here&apos;s what you can do next:
              </p>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
                <tr>
                  <td style="padding: 12px 0;">
                    <span style="color: #4ade80; font-size: 18px; margin-right: 8px;">&#10003;</span>
                    <span style="color: #b89d9f; font-size: 16px;">Explore our Resource Hub (jobs, toolkits, videos)</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <span style="color: #4ade80; font-size: 18px; margin-right: 8px;">&#10003;</span>
                    <span style="color: #b89d9f; font-size: 16px;">Apply to the ASAP program when ready</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <span style="color: #4ade80; font-size: 18px; margin-right: 8px;">&#10003;</span>
                    <span style="color: #b89d9f; font-size: 16px;">Complete your profile</span>
                  </td>
                </tr>
              </table>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="${data.dashboardUrl}" style="display: inline-block; background: linear-gradient(135deg, #CC2630 0%, #ea2a33 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 700; font-size: 16px;">
                      Get Started &rarr;
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 30px 0 0; color: #b89d9f; font-size: 14px; line-height: 1.6;">
                Best regards,<br>
                <strong style="color: #ffffff;">The ASN Team</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #0f0909; padding: 30px; text-align: center; border-top: 1px solid #382929;">
              <p style="margin: 0; color: #b89d9f; font-size: 12px;">
                African Student Network<br>
                Connecting Africa&apos;s Future Leaders
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };
}

export function getApplicationReceivedEmail(data: ApplicationReceivedData) {
  return {
    subject: "We've Received Your ASAP Application",
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Application Received</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0506;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0506; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #181111; border-radius: 16px; overflow: hidden; border: 1px solid #382929;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%); padding: 40px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 900;">Application Received &#9203;</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #ffffff; font-size: 16px; line-height: 1.6;">
                Hi <strong>${data.name}</strong>,
              </p>
              
              <p style="margin: 0 0 20px; color: #b89d9f; font-size: 16px; line-height: 1.6;">
                Thank you for applying to the African Student Accelerator Program!
              </p>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #261c1c; border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid #382929;">
                <tr>
                  <td>
                    <p style="margin: 0 0 12px; color: #b89d9f; font-size: 12px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em;">Application Details</p>
                    <table width="100%" cellpadding="8" cellspacing="0">
                      <tr>
                        <td style="color: #b89d9f; font-size: 14px;">Track:</td>
                        <td style="color: #ffffff; font-size: 14px; font-weight: 600; text-align: right; text-transform: capitalize;">${data.track}</td>
                      </tr>
                      <tr>
                        <td style="color: #b89d9f; font-size: 14px;">Submitted:</td>
                        <td style="color: #ffffff; font-size: 14px; font-weight: 600; text-align: right;">${data.submittedDate}</td>
                      </tr>
                      <tr>
                        <td style="color: #b89d9f; font-size: 14px;">Application ID:</td>
                        <td style="color: #ffffff; font-size: 14px; font-weight: 600; font-family: monospace; text-align: right;">${data.applicationId.slice(0, 12)}...</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 20px 0 10px; color: #ffffff; font-size: 16px; font-weight: 700;">
                What happens next:
              </p>
              
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 8px 0;">
                    <span style="color: #4ade80; font-size: 16px; margin-right: 8px;">&#8226;</span>
                    <span style="color: #b89d9f; font-size: 14px;">Our team will review your application within 3-5 business days</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <span style="color: #4ade80; font-size: 16px; margin-right: 8px;">&#8226;</span>
                    <span style="color: #b89d9f; font-size: 14px;">You&apos;ll receive an email when a decision is made</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <span style="color: #4ade80; font-size: 16px; margin-right: 8px;">&#8226;</span>
                    <span style="color: #b89d9f; font-size: 14px;">Track your status anytime on your dashboard</span>
                  </td>
                </tr>
              </table>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="${data.statusUrl}" style="display: inline-block; background: linear-gradient(135deg, #CC2630 0%, #ea2a33 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 700; font-size: 16px;">
                      Check Status &rarr;
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 30px 0 0; color: #b89d9f; font-size: 14px; line-height: 1.6;">
                Best regards,<br>
                <strong style="color: #ffffff;">The ASAP Team</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #0f0909; padding: 30px; text-align: center; border-top: 1px solid #382929;">
              <p style="margin: 0; color: #b89d9f; font-size: 12px;">
                African Student Network<br>
                Connecting Africa&apos;s Future Leaders
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };
}

export function getApplicationAcceptedEmail(data: ApplicationAcceptedData) {
  const firstName = data.name.split(' ')[0];
  
  return {
    subject: "Welcome to ASAP - You're In!",
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Accepted to ASAP</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0506;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0506; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #181111; border-radius: 16px; overflow: hidden; border: 1px solid #382929;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 36px; font-weight: 900;">Congratulations!</h1>
              <p style="margin: 10px 0 0; color: #ffffff; font-size: 18px; opacity: 0.95;">You&apos;ve been accepted to ASAP</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #ffffff; font-size: 16px; line-height: 1.6;">
                Dear <strong>${firstName}</strong>,
              </p>
              
              <p style="margin: 0 0 20px; color: #b89d9f; font-size: 16px; line-height: 1.6;">
                We&apos;re thrilled to inform you that you&apos;ve been accepted into the African Student Accelerator Program (ASAP)!
              </p>
              
              <p style="margin: 0 0 20px; color: #b89d9f; font-size: 16px; line-height: 1.6;">
                Your application stood out among many strong candidates, and we&apos;re excited to have you join the <strong style="color: #ffffff; text-transform: capitalize;">${data.track}</strong> track.
              </p>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #2d2222 0%, #261c1c 100%); border-radius: 12px; padding: 20px; margin: 30px 0; border: 1px solid #382929;">
                <tr>
                  <td>
                    <p style="margin: 0 0 16px; color: #ffffff; font-size: 16px; font-weight: 700;">NEXT STEPS:</p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="color: #4ade80; font-size: 18px; margin-right: 8px; font-weight: 700;">1.</span>
                          <span style="color: #b89d9f; font-size: 14px;">Log in to your account</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="color: #4ade80; font-size: 18px; margin-right: 8px; font-weight: 700;">2.</span>
                          <span style="color: #b89d9f; font-size: 14px;">Access your modules and begin with Module 1</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="color: #4ade80; font-size: 18px; margin-right: 8px; font-weight: 700;">3.</span>
                          <span style="color: #b89d9f; font-size: 14px;">Complete all modules to earn your ASAP certificate</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 20px 0 10px; color: #ffffff; font-size: 16px; font-weight: 700;">
                PROGRAM HIGHLIGHTS:
              </p>
              
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 8px 0;">
                    <span style="color: #4ade80; font-size: 16px; margin-right: 8px;">&#10003;</span>
                    <span style="color: #b89d9f; font-size: 14px;">5 comprehensive modules covering essential career skills</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <span style="color: #4ade80; font-size: 16px; margin-right: 8px;">&#10003;</span>
                    <span style="color: #b89d9f; font-size: 14px;">Access to job opportunities from top African companies</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <span style="color: #4ade80; font-size: 16px; margin-right: 8px;">&#10003;</span>
                    <span style="color: #b89d9f; font-size: 14px;">Networking with fellow ASAP participants</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <span style="color: #4ade80; font-size: 16px; margin-right: 8px;">&#10003;</span>
                    <span style="color: #b89d9f; font-size: 14px;">Toolkits, resources, and mentorship opportunities</span>
                  </td>
                </tr>
              </table>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="${data.modulesUrl}" style="display: inline-block; background: linear-gradient(135deg, #CC2630 0%, #ea2a33 100%); color: #ffffff; text-decoration: none; padding: 18px 40px; border-radius: 12px; font-weight: 700; font-size: 18px;">
                      Begin Your Journey
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 30px 0 10px; color: #b89d9f; font-size: 14px; line-height: 1.6;">
                We can&apos;t wait to see you thrive in the program!
              </p>
              
              <p style="margin: 20px 0 0; color: #b89d9f; font-size: 14px; line-height: 1.6;">
                If you have any questions, feel free to reply to this email or reach out to <a href="mailto:programs@asnafrica.org" style="color: #ea2a33; text-decoration: none;">programs@asnafrica.org</a>.
              </p>
              
              <p style="margin: 30px 0 0; color: #b89d9f; font-size: 14px; line-height: 1.6;">
                Best regards,<br>
                <strong style="color: #ffffff;">The ASN ASAP Team</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #0f0909; padding: 30px; text-align: center; border-top: 1px solid #382929;">
              <p style="margin: 0; color: #b89d9f; font-size: 12px;">
                African Student Network<br>
                Connecting Africa&apos;s Future Leaders
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };
}

export function getApplicationRejectedEmail(data: ApplicationRejectedData) {
  const firstName = data.name.split(' ')[0];
  
  return {
    subject: 'ASAP Application Update',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Application Update</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0506;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0506; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #181111; border-radius: 16px; overflow: hidden; border: 1px solid #382929;">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #261c1c; padding: 40px 40px; text-align: center; border-bottom: 1px solid #382929;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">Application Update</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #ffffff; font-size: 16px; line-height: 1.6;">
                Dear <strong>${firstName}</strong>,
              </p>
              
              <p style="margin: 0 0 20px; color: #b89d9f; font-size: 16px; line-height: 1.6;">
                Thank you for taking the time to apply to the African Student Accelerator Program (ASAP).
              </p>
              
              <p style="margin: 0 0 20px; color: #b89d9f; font-size: 16px; line-height: 1.6;">
                After careful consideration of all applications, we regret to inform you that we&apos;re unable to offer you a spot in this cohort. This was a highly competitive selection process, and we received many strong applications.
              </p>
              
              <p style="margin: 20px 0 10px; color: #ffffff; font-size: 16px; font-weight: 700;">
                We encourage you to:
              </p>
              
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 8px 0;">
                    <span style="color: #ea2a33; font-size: 16px; margin-right: 8px;">&#8226;</span>
                    <span style="color: #b89d9f; font-size: 14px;">Continue developing your skills and gaining experience</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <span style="color: #ea2a33; font-size: 16px; margin-right: 8px;">&#8226;</span>
                    <span style="color: #b89d9f; font-size: 14px;">Stay connected with ASN for future opportunities</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <span style="color: #ea2a33; font-size: 16px; margin-right: 8px;">&#8226;</span>
                    <span style="color: #b89d9f; font-size: 14px;">Explore our resource hub for career development materials</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <span style="color: #ea2a33; font-size: 16px; margin-right: 8px;">&#8226;</span>
                    <span style="color: #b89d9f; font-size: 14px;">Consider reapplying for the next ASAP cohort</span>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 30px 0 20px; color: #b89d9f; font-size: 14px; line-height: 1.6;">
                Your interest in ASN means a lot to us, and we hope to support your career journey in other ways.
              </p>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="${data.resourcesUrl}" style="display: inline-block; background: linear-gradient(135deg, #CC2630 0%, #ea2a33 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 700; font-size: 16px;">
                      Explore Resources &rarr;
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 30px 0 0; color: #b89d9f; font-size: 14px; line-height: 1.6;">
                Thank you again for your application.
              </p>
              
              <p style="margin: 20px 0 0; color: #b89d9f; font-size: 14px; line-height: 1.6;">
                Best regards,<br>
                <strong style="color: #ffffff;">The ASN ASAP Team</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #0f0909; padding: 30px; text-align: center; border-top: 1px solid #382929;">
              <p style="margin: 0; color: #b89d9f; font-size: 12px;">
                African Student Network<br>
                Connecting Africa&apos;s Future Leaders
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };
}
