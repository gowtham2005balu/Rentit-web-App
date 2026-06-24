const data = {
  type: 'Commercial',
  userId: 1,
  title: 'Antigravity Test Property Node',
  price: 25000,
  city: 'Chennai',
  locality: 'Anna Nagar',
  fullAddress: 'Test Address 123',
  description: 'This is a test property created by the system to verify database insertion.'
};

fetch('http://localhost:3000/api/properties/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
.then(res => res.json())
.then(res => console.log('RESPONSE:', res))
.catch(err => console.error('ERROR:', err));
