import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail({ name, email, referralCode }) {
  try {
    const currentDomain = process.env.NEXT_PUBLIC_DOMAIN || 'https://neurona.ai';
    const referralLink = `${currentDomain}?ref=${referralCode}`;

    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'welcome@neurona.ai',
      to: [email],
      subject: '🎉 Welcome to Neurona - Your Mental Health Journey Starts Here!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Neurona</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f8fafc;
            }
            .container {
              background-color: white;
              border-radius: 12px;
              padding: 40px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
            }
            .header {
              text-align: center;
              margin-bottom: 32px;
            }
            .logo {
              font-size: 32px;
              font-weight: bold;
              color: #059669;
              margin-bottom: 8px;
            }
            .welcome-text {
              font-size: 24px;
              margin-bottom: 16px;
              color: #1f2937;
            }
            .content {
              margin-bottom: 32px;
            }
            .referral-box {
              background-color: #ecfdf5;
              border: 2px solid #d1fae5;
              border-radius: 8px;
              padding: 20px;
              margin: 24px 0;
              text-align: center;
            }
            .referral-link {
              background-color: white;
              border: 1px solid #d1d5db;
              border-radius: 6px;
              padding: 12px;
              font-family: 'Courier New', monospace;
              font-size: 14px;
              margin: 12px 0;
              word-break: break-all;
              color: #374151;
            }
            .btn {
              display: inline-block;
              background-color: #059669;
              color: white;
              text-decoration: none;
              padding: 12px 24px;
              border-radius: 8px;
              font-weight: 600;
              margin: 16px 8px;
            }
            .btn-secondary {
              background-color: #6b7280;
            }
            .footer {
              text-align: center;
              color: #6b7280;
              font-size: 14px;
              margin-top: 32px;
              padding-top: 24px;
              border-top: 1px solid #e5e7eb;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🧠 Neurona</div>
              <h1 class="welcome-text">Welcome to the future of mental healthcare!</h1>
            </div>
            
            <div class="content">
              <p>Hi <strong>${name}</strong>,</p>
              
              <p>Thank you for joining our early access list! You're now part of an exclusive community that will be the first to experience Neurona's revolutionary approach to mental wellness.</p>
              
              <h3>🎯 What's Next?</h3>
              <ul>
                <li><strong>Stay tuned</strong> - We'll send you exclusive updates as we approach launch</li>
                <li><strong>Early access</strong> - You'll get priority access when we open our beta</li>
                <li><strong>Special perks</strong> - Exclusive discounts and features for early supporters</li>
              </ul>
              
              <div class="referral-box">
                <h3 style="margin-top: 0; color: #059669;">🚀 Earn Referral Rewards!</h3>
                <p>Share Neurona with friends and earn exclusive perks. Here's your personal referral link:</p>
                <div class="referral-link">${referralLink}</div>
                <p style="font-size: 14px; color: #6b7280; margin-bottom: 0;">
                  For every friend who joins, you'll move up the early access list and unlock special rewards!
                </p>
              </div>
              
              <h3>🧠 Why Neurona?</h3>
              <p>We're not just another mental health app. We're building a complete care system that combines the precision of AI with the empathy of human clinicians to deliver truly personalized mental healthcare.</p>
              
              <div style="text-align: center; margin: 32px 0;">
                <a href="${currentDomain}" class="btn">Visit Our Website</a>
                <a href="https://wa.me/YOUR_GROUP_LINK" class="btn btn-secondary">Join Our Community</a>
              </div>
            </div>
            
            <div class="footer">
              <p>
                Thanks for believing in better mental healthcare,<br>
                <strong>The Neurona Team</strong>
              </p>
              <p style="margin-top: 16px;">
                Questions? Just reply to this email - we read every message!
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      // Plain text fallback
      text: `
        Welcome to Neurona, ${name}!

        Thank you for joining our early access list! You're now part of an exclusive community that will be the first to experience Neurona's revolutionary approach to mental wellness.

        What's Next:
        - Stay tuned for exclusive updates as we approach launch
        - You'll get priority access when we open our beta
        - Enjoy exclusive discounts and features for early supporters

        Your Referral Link: ${referralLink}
        Share this with friends to earn exclusive rewards and move up the early access list!

        We're not just another mental health app. We're building a complete care system that combines the precision of AI with the empathy of human clinicians to deliver truly personalized mental healthcare.

        Visit: ${currentDomain}

        Thanks for believing in better mental healthcare,
        The Neurona Team

        Questions? Just reply to this email - we read every message!
      `
    });

    if (error) {
      console.error('Email send error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email service error:', error);
    return { success: false, error: error.message };
  }
}