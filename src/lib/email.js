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
              <div class="logo">🧠 Neurona</div>
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
      subject: `🎉 ${referrerName} just invited you to Neurona!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>You're Invited to Neurona</title>
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
            .cta-button {
              display: inline-block;
              background-color: #059669;
              color: white;
              text-decoration: none;
              padding: 16px 32px;
              border-radius: 8px;
              font-weight: 600;
              font-size: 18px;
              margin: 24px 0;
            }
            .bonus-section {
              background-color: #fef3c7;
              border-radius: 8px;
              padding: 20px;
              margin: 24px 0;
              text-align: center;
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
            </div>
            
            <div class="content">
              <p>Hi <strong>${friendName}</strong>,</p>
              
              <p>Your friend <strong>${referrerName}</strong> thought you'd love this — and gave you <strong>15 days of free early access</strong> to Neurona. 🌟</p>
              
              <p><strong>Here's what's waiting for you:</strong></p>
              
              <div class="benefits-list">
                <div class="benefit-item">
                  <span class="benefit-emoji">🆓</span>
                  <span><strong>15 days free</strong> — including mental health screening + 1 therapy session.</span>
                </div>
                <div class="benefit-item">
                  <span class="benefit-emoji">👨‍⚕️</span>
                  <span><strong>Access to qualified</strong> psychiatrists & therapists across India.</span>
                </div>
                <div class="benefit-item">
                  <span class="benefit-emoji">🤖</span>
                  <span><strong>An AI companion</strong> that keeps you engaged & motivated.</span>
                </div>
                <div class="benefit-item">
                  <span class="benefit-emoji">📅</span>
                  <span><strong>A structured, personalised therapy roadmap</strong> no one else offers.</span>
                </div>
              </div>
              
              <div class="bonus-section">
                <p><strong>💡 Bonus:</strong> Invite your own friends! Each successful invite gives you <strong>+5 extra days free</strong> (up to 3 invites = +15 days).</p>
              </div>
              
              <div style="text-align: center;">
                <p><strong>👉 Accept your invite now and start your journey toward mental strength:</strong></p>
                <a href="${signupLink}" class="cta-button">Claim Your Free 15 Days</a>
              </div>
            </div>
            
            <div class="footer">
              <p>
                Warmly,<br>
                <strong>Team Neurona</strong>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Hi ${friendName},

        Your friend ${referrerName} thought you'd love this — and gave you 15 days of free early access to Neurona. 🌟

        Here's what's waiting for you:
        🆓 15 days free — including mental health screening + 1 therapy session.
        👨‍⚕️ Access to qualified psychiatrists & therapists across India.
        🤖 An AI companion that keeps you engaged & motivated.
        📅 A structured, personalised therapy roadmap no one else offers.

        💡 Bonus: Invite your own friends! Each successful invite gives you +5 extra days free (up to 3 invites = +15 days).

        👉 Accept your invite now: ${signupLink}

        Warmly,
        Team Neurona
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
