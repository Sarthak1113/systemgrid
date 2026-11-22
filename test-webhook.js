// Optional local testing utility for Google Sheets Webhook
// Run: node test-webhook.js <YOUR_GOOGLE_APPS_SCRIPT_URL>

const url = process.argv[2] || process.env.GOOGLE_SHEETS_WEBHOOK_URL;

if (!url) {
  console.log('Usage: node test-webhook.js https://script.google.com/macros/s/YOUR_ID/exec');
  process.exit(1);
}

console.log('Sending test inquiry to Google Sheets webhook:', url);

fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    timestamp: new Date().toISOString(),
    type: 'Verification Test',
    name: 'SystemGrid Verification Bot',
    email: 'test@systemgrid.dev',
    subject: 'Verification Ping',
    message: 'Testing connection between SystemGrid and Google Sheets.',
    pageUrl: 'https://systemgrid.dev/contact',
  }),
})
  .then((res) => res.text())
  .then((data) => {
    console.log('✅ Response from Google Sheets:', data);
    console.log('Check your Google Sheet now! A new row should be present.');
  })
  .catch((err) => {
    console.error('❌ Error sending to Google Sheets:', err);
  });
