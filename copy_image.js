const fs = require('fs');
const path = require('path');

const src = "C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\7df7594c-a8c6-4aac-b25c-355ad874ebbc\\chennai_marina_beach_1781247480124.png";
const dest = "d:\\huzzler web App\\public\\images\\chennai_marina.png";

try {
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  fs.copyFileSync(src, dest);
  console.log("Copy operation completed successfully!");
} catch (err) {
  console.error("Failed to copy image:", err);
}
