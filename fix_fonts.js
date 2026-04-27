const fs = require('fs');
let content = fs.readFileSync('src/app/(pages)/experiences/[slug]/page.js', 'utf8');

content = content.replace(/(<(?:h[1-4])[^>]*?className=(['\"]))([^'\"]*)(['\"])/g, 
  (match, p1, p2, classNames, p4) => {
    if (classNames.includes('headingFont.className')) return match;
    let newClassNames = classNames;
    if (!newClassNames.match(/font-(bold|extrabold|semibold)/)) {
      newClassNames += ' font-bold';
    }
    return p1.slice(0, -1) + '{${headingFont.className} ' + newClassNames + '}';
  }
);
fs.writeFileSync('src/app/(pages)/experiences/[slug]/page.js', content, 'utf8');
