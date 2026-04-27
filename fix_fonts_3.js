const fs = require('fs');
let content = fs.readFileSync('src/app/(pages)/experiences/[slug]/page.js', 'utf8');

// The file currently has className={  ... } which is invalid JS
// We want to turn it into className={\${headingFont.className} ...\}

content = content.replace(/className=\{[$]\{headingFont\.className\}(.*?)\}/g, (match, classes) => {
    return 'className={\${headingFont.className}' + classes + '\}';
});

fs.writeFileSync('src/app/(pages)/experiences/[slug]/page.js', content, 'utf8');
console.log('Fixed');

