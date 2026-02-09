const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, '..', 'dist', 'index.d.ts');
let s = fs.readFileSync(p, 'utf8');
s = s.replace(/^import ["']\.\/styles\/base\.css["'];?\s*\n/, '');
fs.writeFileSync(p, s);
