const fs = require('fs');
const html = fs.readFileSync('C:\\Users\\ahmed\\.gemini\\antigravity\\brain\\2a4e8bb2-0b13-46c4-9ef8-e20694b6d6d0\\.system_generated\\steps\\264\\content.md', 'utf8');

// Extract all URLs
const urls = html.match(/https?:\/\/[^\s"'<]+/g) || [];
const apiUrls = urls.filter(u => u.includes('easykash'));
console.log("Unique EasyKash URLs:", [...new Set(apiUrls)]);

// Extract JSON structures (look for things that look like POST body)
const codeBlocks = html.match(/```json[\s\S]*?```/g) || html.match(/\{[\s\S]*?\}/g) || [];
const amountBlocks = codeBlocks.filter(c => c.includes('amount'));
console.log("JSON matches:", amountBlocks.slice(0, 5));
