const data = { type: 'Commercial', userId: 1 };
fetch('http://localhost:3000/api/properties/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
.then(res => res.json())
.then(console.log)
.catch(console.error);

const data2 = { type: 'Flatmate', userId: 1 };
fetch('http://localhost:3000/api/properties/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data2)
})
.then(res => res.json())
.then(console.log)
.catch(console.error);
