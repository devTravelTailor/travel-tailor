const fs = require('fs');
let content = fs.readFileSync('src/app/(pages)/experiences/[slug]/page.js', 'utf8');

// Replace className={... with className={...}
content = content.replace(/className=\{([$]\{headingFont(?:.*?)\})\}/g, "className={\\\}");
fs.writeFileSync('src/app/(pages)/experiences/[slug]/page.js', content, 'utf8');
