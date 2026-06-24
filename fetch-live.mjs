import https from 'https';

https.get('https://myrentitapp.com/api/properties', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log(data.substring(0, 500));
  });
});
