import pg from 'pg';
import fetch from 'node-fetch';

const { Pool } = pg;
const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_bBU7wE1yjQkS@ep-square-truth-apbcxbyk-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&uselibpqcompat=true'
});

async function runTest() {
  try {
    // 1. Find an existing conversation
    const convRes = await pool.query('SELECT * FROM "AppConversation" LIMIT 1');
    if (convRes.rows.length === 0) {
      console.log('No conversations found in the database to test with.');
      return;
    }
    const conv = convRes.rows[0];
    console.log('Found conversation:', conv.id);

    const testText = 'Automated test message at ' + new Date().toISOString();
    
    // 2. Test POST /api/messages
    console.log('\n--- Testing POST /api/messages ---');
    const postRes = await fetch('http://localhost:3000/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        conversationId: conv.id,
        senderId: conv.renterId,
        text: testText
      })
    });
    
    const postData = await postRes.json();
    console.log('POST Response:', postData);

    if (!postData.success) {
      console.error('Failed to send message!');
      return;
    }

    // 3. Test GET /api/messages
    console.log('\n--- Testing GET /api/messages ---');
    const getRes = await fetch(`http://localhost:3000/api/messages?userId=${conv.renterId}&conversationId=${conv.id}`);
    const getData = await getRes.json();
    
    if (getData.success) {
      console.log(`Successfully fetched ${getData.messages.length} messages.`);
      const lastMsg = getData.messages[getData.messages.length - 1];
      console.log('Last message received:', lastMsg.text);
      if (lastMsg.text === testText) {
        console.log('\n✅ TEST PASSED: Message was successfully sent and received!');
      } else {
        console.log('\n❌ TEST FAILED: The retrieved message does not match the sent one.');
      }
    } else {
      console.error('Failed to fetch messages:', getData);
    }
  } catch (error) {
    console.error('Error during test:', error);
  } finally {
    await pool.end();
  }
}

runTest();
