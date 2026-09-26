import fs from 'fs';
import path from 'path';

const [,, targetPath, jsonContentPath] = process.argv;

if (!targetPath || !jsonContentPath) {
  console.error('Usage: node write-helper.js <targetPath> <jsonContentPath>');
  process.exit(1);
}

const content = fs.readFileSync(jsonContentPath, 'utf8');

const targetDir = path.dirname(targetPath);
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

fs.writeFileSync(targetPath, content, 'utf8');
console.log(`Successfully wrote to ${targetPath}`);
