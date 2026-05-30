import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, subject, message } = body;

    // 1. Server-side Validation
    if (!name || name.trim().length < 3) {
      return new NextResponse(JSON.stringify({ error: 'Name must be at least 3 characters long.' }), { status: 400 });
    }
    const nameRegex = /^[a-zA-Z\s.]+$/;
    if (!nameRegex.test(name)) {
      return new NextResponse(JSON.stringify({ error: 'Name contains invalid characters.' }), { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return new NextResponse(JSON.stringify({ error: 'Please provide a valid email address.' }), { status: 400 });
    }
    if (!phone || phone.trim() === '') {
      return new NextResponse(JSON.stringify({ error: 'Phone number cannot be empty.' }), { status: 400 });
    }

    const cleanedSubject = (subject || 'New Message').trim();
    const cleanedMessage = (message || '').trim();

    // 2. Email HTML Templates
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Contact Inquiry</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f7f7; color: #1a1a1a; margin: 0; padding: 20px; }
          .container { max-width: 600px; background: #ffffff; border-radius: 24px; padding: 40px; margin: 0 auto; border: 1px solid rgba(0, 0, 0, 0.05); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03); }
          .header { border-bottom: 1px solid #eaeaea; padding-bottom: 20px; margin-bottom: 30px; }
          .logo { font-size: 20px; font-weight: 900; color: #00A651; letter-spacing: 0.1em; text-transform: uppercase; }
          .title { font-size: 22px; font-weight: 800; color: #111111; margin-top: 10px; text-transform: uppercase; }
          .field { margin-bottom: 20px; }
          .label { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #00A651; margin-bottom: 5px; }
          .value { font-size: 15px; font-weight: 600; color: #222222; }
          .message-box { background: #f9f9f6; border-left: 4px solid #00A651; padding: 15px 20px; border-radius: 12px; margin-top: 10px; font-size: 14px; line-height: 1.6; color: #444444; }
          .footer { font-size: 11px; color: #999999; text-align: center; margin-top: 40px; border-top: 1px solid #eaeaea; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🌲 HI WOOD</div>
            <div class="title">New Website Inquiry</div>
          </div>
          <div class="field">
            <div class="label">Name</div>
            <div class="value">${name}</div>
          </div>
          <div class="field">
            <div class="label">Phone</div>
            <div class="value">${phone}</div>
          </div>
          <div class="field">
            <div class="label">Email</div>
            <div class="value">${email}</div>
          </div>
          <div class="field">
            <div class="label">Subject</div>
            <div class="value">${cleanedSubject}</div>
          </div>
          <div class="field">
            <div class="label">Message</div>
            <div class="message-box">${cleanedMessage.replace(/\n/g, '<br/>')}</div>
          </div>
          <div class="footer">
            Sent securely via hiwood.com CRM | Kozhikode, Kerala
          </div>
        </div>
      </body>
      </html>
    `;

    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Thank You for Contacting HI WOOD</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f7f7; color: #1a1a1a; margin: 0; padding: 20px; }
          .container { max-width: 600px; background: #ffffff; border-radius: 24px; padding: 40px; margin: 0 auto; border: 1px solid rgba(0, 0, 0, 0.05); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03); }
          .header { text-align: center; border-bottom: 1px solid #eaeaea; padding-bottom: 20px; margin-bottom: 30px; }
          .logo { font-size: 20px; font-weight: 900; color: #00A651; letter-spacing: 0.1em; text-transform: uppercase; }
          .title { font-size: 20px; font-weight: 800; color: #111111; margin-top: 10px; }
          .content { font-size: 15px; line-height: 1.6; color: #444444; }
          .highlight { font-weight: 700; color: #00A651; }
          .footer { font-size: 11px; color: #999999; text-align: center; margin-top: 40px; border-top: 1px solid #eaeaea; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🌲 HI WOOD</div>
            <div class="title">Thank You For Reaching Out</div>
          </div>
          <div class="content">
            <p>Dear <span class="highlight">${name}</span>,</p>
            <p>Thank you for contacting HI WOOD Timber Solutions. We have successfully received your inquiry regarding "<strong>${cleanedSubject}</strong>".</p>
            <p>Our logging, design, and customer care experts are reviewing your requirements. We will get back to you within 24 hours to discuss the details.</p>
            <p>If your request is urgent, please feel free to click the WhatsApp support button on our website for an immediate response.</p>
            <br/>
            <p>Warm regards,</p>
            <p><strong>The HI WOOD Team</strong><br/>Palazhi, Kozhikode, Kerala</p>
          </div>
          <div class="footer">
            © ${new Date().getFullYear()} HI WOOD Timber Solutions. All Rights Reserved.
          </div>
        </div>
      </body>
      </html>
    `;

    const apiKey = process.env.RESEND_API_KEY;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'hiwoodpalazhi@gmail.com';

    // 3. Fallback for Local Development (Simulation Mode)
    if (!apiKey || apiKey.trim() === '' || apiKey === 'PLACEHOLDER_KEY') {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📧 [RESEND MAIL SYSTEM] SIMULATED DISPATCH MODE');
      console.log(`To Admin (${receiverEmail}): Subject: New Website Inquiry from ${name}`);
      console.log(`To Customer (${email}): Subject: Thank you for contacting HI WOOD`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

      return new NextResponse(JSON.stringify({ 
        success: true, 
        simulated: true, 
        message: 'Email simulated in server logs. Set RESEND_API_KEY in .env.local to send live emails.' 
      }), { status: 200 });
    }

    // 4. Live API Dispatch to Resend
    // Send to Admin
    const adminRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'HI WOOD Inquiry <onboarding@resend.dev>',
        to: [receiverEmail],
        subject: `🌲 HI WOOD Inquiry: ${cleanedSubject} (${name})`,
        html: adminEmailHtml,
      }),
    });

    if (!adminRes.ok) {
      const errorText = await adminRes.text();
      console.error('Resend Admin Send Error:', errorText);
      throw new Error(`Resend API failed to notify admin: ${adminRes.statusText}`);
    }

    // Send to Customer (Auto-reply)
    const customerRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'HI WOOD Palazhi <onboarding@resend.dev>',
        to: [email],
        subject: `🌲 Thank you for reaching out to HI WOOD!`,
        html: customerEmailHtml,
      }),
    });

    if (!customerRes.ok) {
      const errorText = await customerRes.text();
      console.error('Resend Customer Send Error:', errorText);
      // We don't fail the entire request if just the auto-reply fails
    }

    return new NextResponse(JSON.stringify({ success: true, message: 'Emails sent successfully via Resend.' }), { status: 200 });

  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('Email API Error:', msg);
    return new NextResponse(JSON.stringify({ error: 'Failed to send secure contact emails.', details: msg }), { status: 500 });
  }
}
