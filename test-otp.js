const fetch = require('node-fetch');

async function test() {
  const res = await fetch('http://localhost:3000/api/auth/send-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mobile: '9025835854' })
  });
  const text = await res.text();
  console.log('Status:', res.status);
  console.log('Response:', text);
}

test();
