import { NextResponse } from 'next/server';

const DEFAULT_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycby6oY7S1vPsPRCeRYHLk0mRxJ9jUr3mYUFkVDiszFadIdKFE_XJACk7rwqGjTbA7vAeYA/exec';

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

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL || DEFAULT_WEBHOOK_URL;

    // Forward to Google Apps Script Web App
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
