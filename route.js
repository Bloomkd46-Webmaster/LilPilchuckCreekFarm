const { execSync } = require('child_process');
const { readFileSync, writeFileSync, mkdirSync } = require('fs');
/**
 * @type {{
  "menubarTitle": "Lil' Pilchuck<br>Creek Farm",
  "owner": "Kolton & Karen Bloom",
  "email": "LilPilchuckCreekFarm@gmail.com",
  "pets": false,
  "kiddingSchedule": true,
  "forSale": false,
  "blog": false,
  "repo": "https://github.com/bloomkd46-webmaster/LilPilchuckCreekFarm",
  "homeDescription": "Our hobby farm is home to ADGA Registered Nigerian Dwarfs. The farm has evolved from a farm girl's wish to continue her dairy roots into a 4-H project with the goal of raising show-quality goats. Thanks to wonderful breed mentors we have established aso lid herd we hope to learn from and build on.",
  "homeTitle": "Lil' Pilchuck Creek Farm",
  "tabTitle": "Lil' Pilchuck Creek",
  "_link": "The link to the websites homepage (must end with a /)",
  "link": "https://lilpilchuckcreek.org/",
  "_analytics": "The ID Associated With Google Analytics (Leave Blank To Disable)",
  "analytics": "G-XSEKHTV26P",
  "clarity": "jnf0n3xqtu"
}}
 */
const app = require('./app.json');

console.log('app');
if (execSync('git branch --show-current').toString() === 'main\n') {
  console.error('ERROR:', 'Please try again on gh-pages branch');
  process.exit(1);
}
const index = readFileSync('index.html', { encoding: 'utf-8' }).split('\n').splice(5, 0,
  `
<meta name="apple-mobile-web-app-title" content="${app.tabTitle}">
<meta name="application-name" content="${app.tabTitle}">
<meta name="og:image" content="${app.link}assets/icons/og-image.jpg">
`).join('\n');

const sitemap = [''];
function writeFile(prefix, prefixTitle, name, description) {
  const path = `${prefix ? prefix + '/' : ''}${name}.html`;
  console.log('Generating', path);
  const file = index;
  const title = [name, prefixTitle, app.tabTitle].filter(item => item).join(' · ');
  file.split('\n').splice(5, 0, `
  <title>${title}</title>
<meta property="og:title" content="${title}">
<meta name="og:url" content="${app.link + path.replace('.html', '')}">
${description ? `<meta name="description" content="${description}">
<meta property="og:description" content="${description}">
` : ''}
    `).join('\n');
  writeFileSync(path, index);
  sitemap.push(path.replace('.html', ''));
}

/*for (const path of paths) {
  const file = `${path}.html`;
  console.log('Generating', file);
  writeFileSync(file, index);
  sitemap.push(file.replace('.html', ''));
}*/
const does = require('./assets/goats/does.json');
mkdirSync('does');
for (const doe of does) {
  writeFile('does', 'Does', doe.nickname, doe.description);
}
const bucks = require('./assets/goats/bucks.json');
mkdirSync('bucks');
for (const buck of bucks) {
  writeFile('bucks', 'Bucks', buck.nickname, buck.description);
}
if (app.forSale) {
  writeBaseFile('for-sale', 'For Sale')
  const forSale = require('./assets/goats/for-sale.json');
  mkdirSync('for-sale');
  for (const goat of [...forSale.does, ...forSale.bucks, ...forSale.pets]) {
    writeFile('for-sale', 'For Sale', goat.nickname, goat.description);
  }
}
if (app.pets) {
  writeBaseFile('pets', 'Pets')
  const pets = require('./assets/goats/pets.json');
  mkdirSync('pets');
  for (const pet of pets) {
    writeFile('pets', 'Pets', pet.name, pet.description);
  }
}

function writeBaseFile(name, fancyName) {
  const path = `${name}.html`;
  console.log('Generating', path);
  const file = index;
  const title = [fancyName, app.tabTitle].filter(item => item).join(' · ');
  file.split('\n').splice(5, 0, `
  <title>${title}</title>
<meta property="og:title" content="${title}">
<meta name="og:url" content="${app.link + path.replace('.html', '')}">
    `).join('\n');
  writeFileSync(path, index);
  sitemap.push(path.replace('.html', ''));
}
writeBaseFile('does', 'Does');
writeBaseFile('bucks', 'Bucks');
if (app.blog) {
  writeBaseFile('blog', 'Blog');
}
if (app.kiddingSchedule) {
  writeBaseFile('kidding-schedule', 'Kidding Schedule');
}
if (app.forSale) {
  writeBaseFile('for-sale', 'For Sale');
}
console.log('Generating', 'sitemap.txt');
writeFileSync('sitemap.txt', sitemap.map(path => `${require('./app.json').link}${path}`).join('\n'));
