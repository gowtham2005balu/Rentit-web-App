const fs = require('fs');
const content = fs.readFileSync('app/property/[id]/page.tsx', 'utf8');
let depth = 0;
let lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  for (let char of lines[i]) {
    if (char === '{') depth++;
    if (char === '}') depth--;
  }
  if (depth < 0) console.log('Negative depth at line ' + (i+1));
}
console.log('Final depth: ' + depth);
