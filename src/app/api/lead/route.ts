import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, name, email, subject, message, pageUrl } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    // If Google Sheets webhook URL is configured in Vercel environment variables, forward data
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            type: type || 'Inquiry',
            name: name || '',
            email: email.trim(),
            subject: subject || (type === 'newsletter' ? 'Newsletter Subscription' : 'Inquiry'),
            message: message || '',
            pageUrl: pageUrl || '',
          }),
        });
      } catch (webhookErr) {
        console.error('Failed to forward to Google Sheets webhook:', webhookErr);
      }
    } else {
      console.log('Lead received (Set GOOGLE_SHEETS_WEBHOOK_URL in Vercel to save directly to Google Sheet):', {
        type,
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      message: type === 'newsletter' ? 'Joined! Thank you' : 'Thank you! Your message has been sent.',
    });
  } catch (err: any) {
    console.error('API lead processing error:', err);
    return NextResponse.json(
      { error: 'An error occurred while submitting. Please try again.' },
      { status: 500 }
    );
  }
}
