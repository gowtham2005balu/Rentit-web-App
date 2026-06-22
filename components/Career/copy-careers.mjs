import fs from 'fs';
import path from 'path';

const sourceDir = 'c:\\Users\\Admin\\Downloads\\rentit-landing-page 2\\rentit-landing-page\\src\\pages\\Career';
const destDir = 'd:\\huzzler web App\\components\\Career';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = [
  'careers_hero.jsx',
  'careers_mission.jsx',
  'careers_why.jsx',
  'careers_life.jsx',
  'careers_think.jsx',
  'careers_values.jsx',
  'careers_benefits.jsx',
  'careers_build.jsx',
  'careers_open_roles.jsx',
  'careers_testimonials.jsx',
  'joinus.jsx'
];

for (const file of files) {
  const srcFile = path.join(sourceDir, file);
  const destFile = path.join(destDir, file);
  fs.copyFileSync(srcFile, destFile);
  console.log(`Copied ${file}`);
}
