import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail({ name, email, referralCode }) {
  try {
    const currentDomain = process.env.NEXT_PUBLIC_DOMAIN || 'https://neurona.ai';
    const referralLink = `${currentDomain}?ref=${referralCode}`;

    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'nova@neurona.ai',
      to: [email],
      subject: '🎉 Congratulations — you\'ve unlocked early access to Neurona!',
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
            .benefits-list {
              background-color: #ecfdf5;
              border-radius: 8px;
              padding: 20px;
              margin: 24px 0;
            }
            .benefit-item {
              display: flex;
              align-items: flex-start;
              margin: 12px 0;
              font-size: 16px;
              color: #065f46;
            }
            .benefit-emoji {
              margin-right: 12px;
              font-size: 18px;
              line-height: 1;
            }
            .referral-box {
              background-color: #fef3c7;
              border: 2px solid #fbbf24;
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
              <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 8px;">
                <img src="${currentDomain}/logo4.png" alt="Neurona Logo" width="40" height="40" style="display: block;" />
                <div class="logo">Neurona</div>
              </div>
            </div>
            
            <div class="content">
              <p>Hi <strong>${name}</strong>,</p>
              
              <p>I'm <strong>Nova</strong>, your personal AI companion from Neurona.</p>
              <p>🎉 <strong>Congratulations — you've unlocked early access to Neurona.</strong></p>
              
              <p><strong>Here's what you get as an early member:</strong></p>
              
              <div class="benefits-list">
                <div class="benefit-item">
                  <span class="benefit-emoji">🆓</span>
                  <span><strong>15 days free</strong> — including mental health screening + 1 therapy session.</span>
                </div>
                <div class="benefit-item">
                  <span class="benefit-emoji">🧪</span>
                  <span><strong>Clinically validated tools</strong> & therapy plans designed by experts.</span>
                </div>
                <div class="benefit-item">
                  <span class="benefit-emoji">🤖</span>
                  <span><strong>An AI-powered companion</strong> to keep you consistent & motivated.</span>
                </div>
                <div class="benefit-item">
                  <span class="benefit-emoji">👨‍⚕️</span>
                  <span><strong>Direct access</strong> to qualified psychiatrists & therapists across India.</span>
                </div>
                <div class="benefit-item">
                  <span class="benefit-emoji">📅</span>
                  <span><strong>Structured, personalised therapy roadmap</strong> that no one else provides.</span>
                </div>
                <div class="benefit-item">
                  <span class="benefit-emoji">📆</span>
                  <span><strong>Clear progress insights</strong> so you can track your growth.</span>
                </div>
              </div>
              
              <div class="referral-box">
                <h3 style="margin-top: 0; color: #b45309;">✨ Special Bonus:</h3>
                <p>Invite your friends with your unique link and get <strong>+5 days free</strong> for each friend (up to 3 friends = +15 extra days).</p>
                <p>Every friend you invite also gets <strong>15 days free</strong> when they join.</p>
                <p style="margin: 16px 0 8px 0; font-weight: bold;">👉 Your Invite Link:</p>
                <div class="referral-link">${referralLink}</div>
              </div>
              
              <p>✅ <strong>Your spot on the waitlist is confirmed.</strong></p>
              <p>Stay ready — you'll be among the first to experience Neurona before the world.</p>
            </div>
            
            <div class="footer">
              <p>
                Warmly,<br>
                <strong>Nova</strong><br>
                Your AI Companion from Neurona
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

export async function sendReferralInviteEmail({ friendName, friendEmail, referrerName, referralCode }) {
  try {
    const currentDomain = process.env.NEXT_PUBLIC_DOMAIN || 'https://neurona.ai';
    const signupLink = `${currentDomain}?ref=${referralCode}`;

    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'nova@neurona.ai',
      to: [friendEmail],
      subject: `${referrerName} invited you to Neurona — claim your free 15 days`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>You're Invited to Neurona</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9fafb;
            }
            .container {
              background-color: white;
              border-radius: 10px;
              padding: 28px;
              border: 1px solid #e5e7eb;
            }
            .header {
              text-align: center;
              margin-bottom: 24px;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              color: #059669;
            }
            .cta-link {
              display: inline-block;
              margin: 20px 0;
              padding: 12px 20px;
              background: #059669;
              color: white;
              border-radius: 6px;
              text-decoration: none;
              font-weight: 600;
            }
            .footer {
              margin-top: 28px;
              font-size: 14px;
              color: #6b7280;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="${currentDomain}/logo4.png" alt="Neurona Logo" width="40" height="40" />
              <div class="logo">Neurona</div>
            </div>
            
            <p>Hi <strong>${friendName}</strong>,</p>
            
            <p>Your friend <strong>${referrerName}</strong> just invited you to try <strong>Neurona</strong> — and gave you <strong>15 days of free early access</strong> to get started.</p>
            
            <p>With Neurona, you’ll be able to:</p>
            <ul>
              <li>Get a free mental health screening + 1 therapy session</li>
              <li>Access qualified psychiatrists & therapists across India</li>
              <li>Use an AI companion to keep you consistent & motivated</li>
              <li>Follow a structured, personalised therapy roadmap</li>
            </ul>
            
            <div style="text-align:center;">
              <a href="${signupLink}" class="cta-link">Claim Your Free 15 Days</a>
            </div>
            
            <p>P.S. Inviting your own friends gives you +5 days extra each (up to +15 days).</p>
            
            <div class="footer">
              <p>If you have questions, just hit reply — we read every message.</p>
              <p>— Team Neurona</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Hi ${friendName},

        Your friend ${referrerName} just invited you to Neurona and gave you 15 days of free early access.

        With Neurona, you get:
        - Free mental health screening + 1 therapy session
        - Access to psychiatrists & therapists across India
        - An AI companion to stay consistent & motivated
        - A structured therapy roadmap

        Claim your free access here: ${signupLink}

        P.S. Invite friends yourself and earn +5 days extra per friend (up to +15 days).

        If you have questions, just reply to this email — we read every message.
        
        — Team Neurona
      `
    });

    if (error) {
      console.error('Referral invite email error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Referral invite service error:', error);
    return { success: false, error: error.message };
  }
}